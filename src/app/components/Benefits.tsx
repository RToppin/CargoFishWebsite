import { CheckSquare } from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { SectionHeading } from "./SectionHeading";

export function Benefits() {
  return (
    <section id="benefits" className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Benefits"
          title="Why underground delivery infrastructure matters"
          description="CargoFish is positioned as a long-lived utility concept for reducing recurring friction in small-package and household goods delivery."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {siteContent.benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="border-2 border-zinc-300 bg-white p-6 transition-colors hover:border-[#C93A3A]"
            >
              <CheckSquare className="text-[#C93A3A]" aria-hidden="true" size={34} />
              <h3 className="mt-5 text-xl font-black uppercase text-black">{benefit.title}</h3>
              <p className="mt-3 leading-7 text-zinc-700">{benefit.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-4 border-black bg-black p-6 text-white sm:p-8">
            <p className="text-sm font-black uppercase tracking-wide text-[#C93A3A]">{siteContent.energyClaim.value}</p>
            <h3 className="mt-2 text-2xl font-black uppercase">{siteContent.energyClaim.title}</h3>
            <p className="mt-5 leading-8 text-zinc-300">{siteContent.energyClaim.body}</p>
          </div>

          <div className="border-l-4 border-[#C93A3A] bg-white p-6 sm:p-8">
            <h3 className="text-2xl font-black uppercase">Market context</h3>
            <p className="mt-5 text-lg leading-8 text-zinc-800">{siteContent.marketContext.body}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {siteContent.marketContext.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  className="inline-flex min-h-10 items-center border-2 border-zinc-300 px-3 py-2 text-xs font-black uppercase tracking-wide text-zinc-700 transition-colors hover:border-[#C93A3A] hover:text-[#C93A3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A]"
                  target="_blank"
                  rel="noreferrer"
                >
                  {source.label}
                </a>
              ))}
            </div>
            <p className="mt-5 leading-8 text-zinc-700">
              CargoFish frames this as an infrastructure opportunity: once installed and heavily used, a delivery
              utility could spread installation cost across repeated daily movement of goods.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
