import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { Logo } from "./Logo";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const hasDemoVideo = Boolean(siteContent.demoVideo.embedUrl || siteContent.demoVideo.url);
  const hasConferenceMedia =
    Boolean(siteContent.conferenceShowcase.diagram.url) ||
    siteContent.conferenceShowcase.videos.some((video) => Boolean(video.embedUrl || video.url));

  const navItems = [
    { label: "Home", href: "/#home" },
    ...(hasDemoVideo ? [{ label: "Demo", href: "/#demo" }] : []),
    ...(hasConferenceMedia ? [{ label: "Conference", href: "/#conference" }] : []),
    { label: "Problem", href: "/#problem" },
    { label: "Technology", href: "/#technology" },
    { label: "Benefits", href: "/#benefits" },
    { label: "Investors", href: "/#investors" },
    { label: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b-2 border-black bg-white/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <div className="flex h-20 items-center justify-between gap-5">
          <a
            href="/#home"
            className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A]"
            aria-label="CargoFish home"
            onClick={() => setIsOpen(false)}
          >
            <Logo />
          </a>

          <div className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-sm text-xs font-black uppercase tracking-wide text-black transition-colors hover:text-[#C93A3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A] xl:text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center border-2 border-black text-black transition-colors hover:border-[#C93A3A] hover:text-[#C93A3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A] lg:hidden"
          >
            {isOpen ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`border-t border-black bg-white lg:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block border-l-4 border-transparent px-3 py-3 text-sm font-black uppercase tracking-wide text-black transition-colors hover:border-[#C93A3A] hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C93A3A]"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
