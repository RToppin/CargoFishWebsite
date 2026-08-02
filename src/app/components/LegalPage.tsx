import { siteContent } from "../../content/siteContent";

type LegalPageProps = {
  page: "privacy" | "terms";
};

export function LegalPage({ page }: LegalPageProps) {
  const isPrivacy = page === "privacy";

  return (
    <main className="bg-white pt-28">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-wide text-[#C93A3A]">Publication draft</p>
        <h1 className="mt-3 text-4xl font-black uppercase leading-tight text-black sm:text-5xl">
          {isPrivacy ? "Privacy Policy" : "Terms"}
        </h1>
        <div className="mt-5 h-1 w-24 bg-[#C93A3A]" />
        <p className="mt-6 border-l-4 border-[#C93A3A] bg-zinc-100 p-5 leading-8 text-zinc-800">
          This is a starting draft for {siteContent.companyName} and should be reviewed before publication.
        </p>

        {isPrivacy ? <PrivacyContent /> : <TermsContent />}
      </section>
    </main>
  );
}

function PrivacyContent() {
  return (
    <div className="legal-copy">
      <section>
        <h2>Information collected</h2>
        <p>
          When you submit the contact form, CargoFish collects the information you provide: full name, email address,
          optional organization, optional role/title, inquiry type, message, and consent confirmation.
        </p>
      </section>

      <section>
        <h2>How the information is used</h2>
        <p>
          CargoFish uses contact-form information to review and respond to inquiries. The site does not ask for
          investor financial details, upload files, or collect unnecessary sensitive information.
        </p>
      </section>

      <section>
        <h2>Email delivery</h2>
        <p>
          Contact-form submissions are sent by email through Resend when configured. Resend processes the message for
          transactional email delivery. Resend does not create a normal business inbox for CargoFish.
        </p>
      </section>

      <section>
        <h2>Cookies, analytics, and advertising</h2>
        <p>
          This site does not include analytics, advertising pixels, or nonessential cookies in the current
          implementation.
        </p>
      </section>

      <section>
        <h2>Deletion requests</h2>
        <p>
          To request deletion of contact-form information, email{" "}
          <a href={`mailto:${siteContent.contact.email}`}>{siteContent.contact.email}</a>.
        </p>
      </section>

      <section>
        <h2>No sale of contact information</h2>
        <p>CargoFish does not sell contact-form information.</p>
      </section>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="legal-copy">
      <section>
        <h2>Informational website</h2>
        <p>
          This website provides general information about CargoFish, its concept, milestones, and inquiry paths. The
          content may change as the company updates its materials.
        </p>
      </section>

      <section>
        <h2>No securities offering</h2>
        <p>
          The website is for informational purposes only and is not an offer to sell, or a solicitation of an offer to
          buy, securities or any other financial instrument.
        </p>
      </section>

      <section>
        <h2>No guarantees</h2>
        <p>
          Technical descriptions, estimates, and potential benefits should be confirmed before being relied on for
          investment, engineering, municipal, regulatory, or commercial decisions.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${siteContent.contact.email}`}>{siteContent.contact.email}</a>.
        </p>
      </section>
    </div>
  );
}
