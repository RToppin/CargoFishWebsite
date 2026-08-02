import { siteContent } from "../../content/siteContent";

const companyLinks = [
  { label: "About", href: "/#problem" },
  { label: "Investors", href: "/#investors" },
  // Milestones stays in code but hidden until CargoFish asks for it back.
  // { label: "Milestones", href: "/#news" },
  { label: "Contact", href: "/#contact" },
];

const technologyLinks = [
  { label: "How It Works", href: "/#technology" },
  { label: "Benefits", href: "/#benefits" },
  ...(siteContent.demoVideo.embedUrl || siteContent.demoVideo.url ? [{ label: "Demo Video", href: "/#demo" }] : []),
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t-4 border-[#C93A3A] bg-black py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">{siteContent.brandName}</h2>
            <div className="mt-4 h-1 w-16 bg-[#C93A3A]" />
            <p className="mt-5 leading-7 text-zinc-400">
              {siteContent.tagline}: underground infrastructure for moving consumer packaged goods.
            </p>
          </div>

          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Technology" links={technologyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t-2 border-zinc-800 pt-8 text-sm font-semibold text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2024-2026 {siteContent.companyName}. All rights reserved.</p>
          <p>Grant support: {siteContent.grant.organization}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-wide text-white">{title}</h3>
      <ul className="mt-4 grid gap-2 text-zinc-400">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-semibold transition-colors hover:text-[#C93A3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
