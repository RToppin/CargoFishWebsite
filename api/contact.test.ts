import { describe, expect, it, beforeEach } from "vitest";
import handler from "./contact";
import { validateContactPayload } from "./contactValidation";

const validPayload = {
  fullName: "Alex Taylor",
  email: "alex@example.com",
  organization: "Example Co",
  role: "Partner",
  inquiryType: "investor",
  message: "I would like to discuss CargoFish investor materials.",
  privacyConsent: true,
  website: "",
};

function createResponse() {
  return {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: undefined as unknown,
    setHeader(name: string, value: string) {
      this.headers[name] = value;
    },
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return this;
    },
  };
}

describe("contact validation", () => {
  it("rejects invalid inquiry types", () => {
    const result = validateContactPayload({ ...validPayload, inquiryType: "sales" });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.inquiryType).toBe("Choose a valid inquiry type.");
    }
  });

  it("rejects oversized messages", () => {
    const result = validateContactPayload({ ...validPayload, message: "a".repeat(2001) });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.message).toContain("2000");
    }
  });
});

describe("contact api", () => {
  beforeEach(() => {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_TO_EMAIL;
    delete process.env.CONTACT_FROM_EMAIL;
  });

  it("rejects non-POST requests", async () => {
    const res = createResponse();

    await handler({ method: "GET", headers: {} }, res);

    expect(res.statusCode).toBe(405);
    expect(res.headers.Allow).toBe("POST");
  });

  it("rejects non-JSON requests", async () => {
    const res = createResponse();

    await handler({ method: "POST", headers: { "content-type": "text/plain" }, body: "{}" }, res);

    expect(res.statusCode).toBe(415);
  });

  it("returns a controlled service unavailable response when email is not configured", async () => {
    const res = createResponse();

    await handler(
      { method: "POST", headers: { "content-type": "application/json" }, body: validPayload },
      res,
    );

    expect(res.statusCode).toBe(503);
    expect(res.body).toMatchObject({ ok: false, fallbackEmail: "info@cargofish.com" });
  });
});
