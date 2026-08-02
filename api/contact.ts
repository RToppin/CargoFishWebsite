import { Resend } from "resend";
import { inquiryLabels, validateContactPayload, type ContactPayload } from "./contactValidation";

type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  json(body: unknown): void;
};

const fallbackEmail = "contact.cargofish@gmail.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  if (!hasJsonContentType(req.headers["content-type"])) {
    return res.status(415).json({ ok: false, message: "Requests must use application/json." });
  }

  const body = parseBody(req.body);

  if (!body.ok) {
    return res.status(400).json({ ok: false, message: "Invalid JSON body." });
  }

  const validation = validateContactPayload(body.value);

  if (!validation.ok) {
    return res.status(400).json({ ok: false, errors: validation.errors });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    return res.status(503).json({
      ok: false,
      message: `Contact delivery is not configured yet. Please email ${fallbackEmail} directly.`,
      fallbackEmail,
    });
  }

  try {
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: validation.data.email,
      subject: buildSubject(validation.data),
      text: buildPlainTextEmail(validation.data),
    });

    if (error || !data?.id) {
      console.error("CargoFish contact delivery failed", {
        provider: "resend",
        errorType: error ? "provider_error" : "missing_message_id",
      });

      return res.status(502).json({
        ok: false,
        message: `Contact delivery failed. Please email ${fallbackEmail} directly.`,
        fallbackEmail,
      });
    }

    return res.status(202).json({ ok: true });
  } catch (error) {
    console.error("CargoFish contact delivery exception", {
      errorType: error instanceof Error ? error.name : typeof error,
    });

    return res.status(502).json({
      ok: false,
      message: `Contact delivery failed. Please email ${fallbackEmail} directly.`,
      fallbackEmail,
    });
  }
}

function hasJsonContentType(contentType: string | string[] | undefined) {
  const value = Array.isArray(contentType) ? contentType[0] : contentType;
  return typeof value === "string" && value.toLowerCase().includes("application/json");
}

function parseBody(body: unknown): { ok: true; value: unknown } | { ok: false } {
  if (typeof body === "string") {
    try {
      return { ok: true, value: JSON.parse(body) };
    } catch {
      return { ok: false };
    }
  }

  return { ok: true, value: body };
}

function buildSubject(payload: ContactPayload) {
  const inquiry = inquiryLabels[payload.inquiryType];
  const organization = payload.organization ? ` - ${payload.organization}` : "";
  return `[CargoFish ${inquiry}] ${payload.fullName}${organization}`;
}

function buildPlainTextEmail(payload: ContactPayload) {
  return [
    `Inquiry type: ${inquiryLabels[payload.inquiryType]}`,
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Organization: ${payload.organization || "Not provided"}`,
    `Role/title: ${payload.role || "Not provided"}`,
    "",
    "Message:",
    payload.message,
    "",
    "Privacy consent: confirmed",
  ].join("\n");
}
