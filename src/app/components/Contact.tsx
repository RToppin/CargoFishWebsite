import { FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { inquiryTypes, siteContent, type InquiryType } from "../../content/siteContent";
import { onInquirySelected } from "../../lib/inquiryEvents";
import { SectionHeading } from "./SectionHeading";

type FormValues = {
  fullName: string;
  email: string;
  organization: string;
  role: string;
  inquiryType: InquiryType;
  message: string;
  privacyConsent: boolean;
  website: string;
};

type FieldName = keyof FormValues;
type FieldErrors = Partial<Record<FieldName | "form", string>>;

const maxLengths = {
  fullName: 120,
  email: 254,
  organization: 160,
  role: 120,
  message: 2000,
};

const initialValues: FormValues = {
  fullName: "",
  email: "",
  organization: "",
  role: "",
  inquiryType: "general",
  message: "",
  privacyConsent: false,
  website: "",
};

function normalize(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function validateForm(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (normalize(values.fullName).length < 2) {
    errors.fullName = "Enter your full name.";
  } else if (values.fullName.length > maxLengths.fullName) {
    errors.fullName = `Name must be ${maxLengths.fullName} characters or fewer.`;
  }

  if (!emailPattern.test(normalize(values.email))) {
    errors.email = "Enter a valid email address.";
  } else if (values.email.length > maxLengths.email) {
    errors.email = `Email must be ${maxLengths.email} characters or fewer.`;
  }

  if (values.organization.length > maxLengths.organization) {
    errors.organization = `Organization must be ${maxLengths.organization} characters or fewer.`;
  }

  if (values.role.length > maxLengths.role) {
    errors.role = `Role must be ${maxLengths.role} characters or fewer.`;
  }

  if (!inquiryTypes.some((type) => type.value === values.inquiryType)) {
    errors.inquiryType = "Choose a valid inquiry type.";
  }

  if (normalize(values.message).length < 10) {
    errors.message = "Enter a message with at least 10 characters.";
  } else if (values.message.length > maxLengths.message) {
    errors.message = `Message must be ${maxLengths.message} characters or fewer.`;
  }

  if (!values.privacyConsent) {
    errors.privacyConsent = "Confirm that CargoFish may use this information to respond.";
  }

  if (values.website) {
    errors.form = "Your message could not be submitted.";
  }

  return errors;
}

function fieldErrorId(field: FieldName) {
  return `${field}-error`;
}

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const pendingSignatureRef = useRef<string | null>(null);

  useEffect(() => {
    return onInquirySelected((inquiryType) => {
      setValues((current) => ({ ...current, inquiryType }));
      setErrors((current) => ({ ...current, inquiryType: undefined }));
    });
  }, []);

  const selectedInquiryLabel = useMemo(() => {
    return inquiryTypes.find((type) => type.value === values.inquiryType)?.label ?? "General inquiry";
  }, [values.inquiryType]);

  const mailtoHref = useMemo(() => {
    return buildMailtoHref(values, selectedInquiryLabel);
  }, [selectedInquiryLabel, values.email, values.fullName, values.message, values.organization, values.role]);

  function setField<T extends FieldName>(field: T, value: FormValues[T]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const clientErrors = validateForm(values);
    setErrors(clientErrors);
    setStatus(null);

    if (Object.keys(clientErrors).length > 0) {
      setStatus({ type: "error", message: "Please fix the highlighted fields and try again." });
      return;
    }

    const payload = {
      ...values,
      fullName: normalize(values.fullName),
      email: normalize(values.email).toLowerCase(),
      organization: normalize(values.organization),
      role: normalize(values.role),
      message: values.message.trim(),
    };
    const signature = JSON.stringify(payload);

    if (pendingSignatureRef.current === signature) {
      return;
    }

    pendingSignatureRef.current = signature;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);

      if (response.ok && data?.ok === true) {
        setValues(initialValues);
        setStatus({
          type: "success",
          message: `Thanks. CargoFish received your inquiry and will respond using the email you provided.`,
        });
        return;
      }

      if (data?.errors && typeof data.errors === "object") {
        setErrors(data.errors);
      }

      setStatus({
        type: "error",
        message:
          data?.message ||
          `The message could not be delivered right now. You can email ${siteContent.contact.email} directly.`,
      });
    } catch {
      setStatus({
        type: "error",
        message: `The message could not be delivered right now. You can email ${siteContent.contact.email} directly.`,
      });
    } finally {
      pendingSignatureRef.current = null;
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Start a CargoFish conversation"
          description="Use the inquiry form for investor, partnership, municipal, media, career, or general company questions."
        />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h3 className="text-2xl font-black uppercase">Get in touch</h3>
            <p className="mt-5 leading-8 text-zinc-800">
              CargoFish welcomes inquiries from investors, strategic partners, municipalities, media contacts, and
              people interested in the development of underground delivery infrastructure.
            </p>

            <div className="mt-8 grid gap-5">
              <div className="flex items-start border-l-4 border-[#C93A3A] bg-white p-5">
                <Mail className="mr-4 mt-1 shrink-0 text-[#C93A3A]" aria-hidden="true" size={24} />
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-zinc-600">Email</p>
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="mt-1 inline-block font-bold text-zinc-900 transition-colors hover:text-[#C93A3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A]"
                  >
                    {siteContent.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start border-l-4 border-[#C93A3A] bg-white p-5">
                <MapPin className="mr-4 mt-1 shrink-0 text-[#C93A3A]" aria-hidden="true" size={24} />
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-zinc-600">Location</p>
                  <p className="mt-1 font-bold text-zinc-900">{siteContent.contact.location}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-2 border-black bg-white p-6 sm:p-8" noValidate>
            <h3 className="text-2xl font-black uppercase">Send an inquiry</h3>

            {errors.form ? (
              <p className="mt-4 border-l-4 border-[#C93A3A] bg-red-50 p-4 text-sm font-semibold text-red-900">
                {errors.form}
              </p>
            ) : null}

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <FormField
                id="fullName"
                label="Full name"
                error={errors.fullName}
                required
                className="sm:col-span-1"
              >
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  maxLength={maxLengths.fullName}
                  value={values.fullName}
                  onChange={(event) => setField("fullName", event.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? fieldErrorId("fullName") : undefined}
                  className="form-control"
                  required
                />
              </FormField>

              <FormField id="email" label="Email" error={errors.email} required className="sm:col-span-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={maxLengths.email}
                  value={values.email}
                  onChange={(event) => setField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? fieldErrorId("email") : undefined}
                  className="form-control"
                  required
                />
              </FormField>

              <FormField id="organization" label="Organization" error={errors.organization}>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  autoComplete="organization"
                  maxLength={maxLengths.organization}
                  value={values.organization}
                  onChange={(event) => setField("organization", event.target.value)}
                  aria-invalid={Boolean(errors.organization)}
                  aria-describedby={errors.organization ? fieldErrorId("organization") : undefined}
                  className="form-control"
                />
              </FormField>

              <FormField id="role" label="Role/title" error={errors.role}>
                <input
                  id="role"
                  name="role"
                  type="text"
                  autoComplete="organization-title"
                  maxLength={maxLengths.role}
                  value={values.role}
                  onChange={(event) => setField("role", event.target.value)}
                  aria-invalid={Boolean(errors.role)}
                  aria-describedby={errors.role ? fieldErrorId("role") : undefined}
                  className="form-control"
                />
              </FormField>

              <FormField id="inquiryType" label="Inquiry type" error={errors.inquiryType} required>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={values.inquiryType}
                  onChange={(event) => setField("inquiryType", event.target.value as InquiryType)}
                  aria-invalid={Boolean(errors.inquiryType)}
                  aria-describedby={errors.inquiryType ? fieldErrorId("inquiryType") : undefined}
                  className="form-control"
                  required
                >
                  {inquiryTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField id="message" label="Message" error={errors.message} required className="sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={maxLengths.message}
                  value={values.message}
                  onChange={(event) => setField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? fieldErrorId("message") : "message-help"}
                  className="form-control resize-y"
                  required
                />
                <p id="message-help" className="mt-2 text-xs font-semibold text-zinc-500">
                  {values.message.length}/{maxLengths.message} characters
                </p>
              </FormField>
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) => setField("website", event.target.value)}
              />
            </div>

            <div className="mt-6">
              <label className="flex items-start gap-3 text-sm font-semibold leading-6 text-zinc-800">
                <input
                  id="privacyConsent"
                  name="privacyConsent"
                  type="checkbox"
                  checked={values.privacyConsent}
                  onChange={(event) => setField("privacyConsent", event.target.checked)}
                  aria-invalid={Boolean(errors.privacyConsent)}
                  aria-describedby={errors.privacyConsent ? fieldErrorId("privacyConsent") : undefined}
                  className="mt-1 h-5 w-5 shrink-0 accent-[#C93A3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A]"
                  required
                />
                <span>
                  I agree that CargoFish may use this information to respond to my inquiry. See the{" "}
                  <a
                    href="/privacy"
                    className="font-black text-[#C93A3A] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A]"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.privacyConsent ? <FieldError id={fieldErrorId("privacyConsent")} message={errors.privacyConsent} /> : null}
            </div>

            <div className="mt-6" aria-live="polite">
              {status ? (
                <div
                  className={`border-l-4 p-4 text-sm font-semibold ${
                    status.type === "success"
                      ? "border-green-700 bg-green-50 text-green-900"
                      : "border-[#C93A3A] bg-red-50 text-red-900"
                  }`}
                  role={status.type === "error" ? "alert" : "status"}
                >
                  <p>{status.message}</p>
                  {status.type === "error" ? (
                    <a className="mt-2 inline-block font-black underline" href={mailtoHref}>
                      Email {siteContent.contact.email}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 border-2 border-[#C93A3A] bg-[#C93A3A] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-[#AB2D2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send aria-hidden="true" size={19} />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function buildMailtoHref(values: Pick<FormValues, "fullName" | "email" | "organization" | "role" | "message">, inquiryLabel: string) {
  const subject = encodeURIComponent(`CargoFish ${inquiryLabel}`);
  const body = encodeURIComponent(
    `Hello CargoFish,\n\n${values.message || "I would like to connect about CargoFish."}\n\nName: ${
      values.fullName
    }\nEmail: ${values.email}\nOrganization: ${values.organization || "Not provided"}\nRole: ${
      values.role || "Not provided"
    }`,
  );

  return `mailto:${siteContent.contact.email}?subject=${subject}&body=${body}`;
}

function FormField({
  id,
  label,
  error,
  required = false,
  className = "",
  children,
}: {
  id: FieldName;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-black uppercase tracking-wide text-zinc-700">
        {label}
        {required ? <span className="text-[#C93A3A]"> *</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? <FieldError id={fieldErrorId(id)} message={error} /> : null}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-2 text-sm font-semibold text-red-700">
      {message}
    </p>
  );
}
