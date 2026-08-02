import { useEffect } from "react";
import logoSrc from "../../assets/cargofish-logo.png";
import { siteContent } from "../../content/siteContent";

type PageKind = "home" | "privacy" | "terms";

const pageMeta: Record<PageKind, { title: string; description: string; path: string }> = {
  home: {
    title: siteContent.seo.title,
    description: siteContent.seo.description,
    path: "/",
  },
  privacy: {
    title: `Privacy Policy | ${siteContent.companyName}`,
    description: `Privacy information for ${siteContent.companyName} contact-form inquiries.`,
    path: "/privacy",
  },
  terms: {
    title: `Terms | ${siteContent.companyName}`,
    description: `Website terms for ${siteContent.companyName}.`,
    path: "/terms",
  },
};

export function Meta({ page }: { page: PageKind }) {
  useEffect(() => {
    const meta = pageMeta[page];
    const canonical = `${siteContent.siteUrl}${meta.path === "/" ? "/" : meta.path}`;
    const imageUrl = `${siteContent.siteUrl}${logoSrc}`;

    document.title = meta.title;
    setMeta("description", meta.description);
    setMeta("robots", "index, follow");
    setCanonical(canonical);

    setProperty("og:type", "website");
    setProperty("og:title", meta.title);
    setProperty("og:description", meta.description);
    setProperty("og:url", canonical);
    setProperty("og:image", imageUrl);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", imageUrl);

    setJsonLd({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteContent.companyName,
      url: siteContent.siteUrl,
      logo: imageUrl,
      email: siteContent.contact.email,
      address: {
        "@type": "PostalAddress",
        addressRegion: "NJ",
        addressCountry: "US",
      },
    });
  }, [page]);

  return null;
}

function setMeta(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }

  element.content = content;
}

function setProperty(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
}

function setJsonLd(data: Record<string, unknown>) {
  const id = "organization-jsonld";
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.id = id;
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}
