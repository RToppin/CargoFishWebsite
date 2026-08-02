import { z } from "zod";

export const inquiryTypes = [
  "general",
  "investor",
  "partnership",
  "municipal",
  "media",
  "careers",
] as const;

export type InquiryType = (typeof inquiryTypes)[number];

export const inquiryLabels: Record<InquiryType, string> = {
  general: "General Inquiry",
  investor: "Investor Inquiry",
  partnership: "Strategic Partnership",
  municipal: "Municipal/Pilot Opportunity",
  media: "Media/Press",
  careers: "Careers",
};

export type ContactPayload = {
  fullName: string;
  email: string;
  organization?: string;
  role?: string;
  inquiryType: InquiryType;
  message: string;
  privacyConsent: true;
  website?: string;
};

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Record<string, string> };

const maxLengths = {
  fullName: 120,
  email: 254,
  organization: 160,
  role: 120,
  message: 2000,
};

function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function cleanOptional(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = normalizeWhitespace(value);
  return normalized.length > 0 ? normalized : undefined;
}

function cleanText(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}

const schema = z.object({
  fullName: z.preprocess(
    cleanText,
    z
      .string()
      .transform(normalizeWhitespace)
      .pipe(z.string().min(2, "Enter your full name.").max(maxLengths.fullName)),
  ),
  email: z.preprocess(
    cleanText,
    z
      .string()
      .transform((value) => normalizeWhitespace(value).toLowerCase())
      .pipe(z.string().email("Enter a valid email address.").max(maxLengths.email)),
  ),
  organization: z.preprocess(cleanOptional, z.string().max(maxLengths.organization).optional()),
  role: z.preprocess(cleanOptional, z.string().max(maxLengths.role).optional()),
  inquiryType: z.enum(inquiryTypes, { errorMap: () => ({ message: "Choose a valid inquiry type." }) }),
  message: z.preprocess(
    cleanText,
    z.string().min(10, "Enter a message with at least 10 characters.").max(maxLengths.message),
  ),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "Confirm that CargoFish may use this information to respond." }),
  }),
  website: z.preprocess((value) => (typeof value === "string" ? value.trim() : ""), z.literal("")),
});

export function validateContactPayload(payload: unknown): ValidationResult {
  const result = schema.safeParse(payload);

  if (result.success) {
    return { ok: true, data: result.data };
  }

  const errors: Record<string, string> = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0]?.toString() || "form";
    errors[field] ??= field === "website" ? "Your message could not be submitted." : issue.message;
  }

  return { ok: false, errors };
}
