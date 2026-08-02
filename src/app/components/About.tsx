import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="problem" className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About CargoFish"
          title="A utility approach to delivery"
          description="CargoFish applies the logic of utility networks to the movement of everyday physical goods."
        />

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="border-2 border-black bg-white p-6 sm:p-8">
            <h3 className="text-2xl font-black uppercase text-[#C93A3A]">Mission</h3>
            <div className="mt-5 space-y-5 text-base leading-8 text-zinc-800">
              {siteContent.mission.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 border-l-4 border-[#C93A3A] bg-zinc-100 p-5">
              <p className="text-sm font-black uppercase tracking-wide text-zinc-600">Grant funding</p>
              <p className="mt-2 text-lg font-black text-black">
                {siteContent.grant.amount} {siteContent.grant.title}
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-700">{siteContent.grant.organization}</p>
              <a
                href={siteContent.grant.sourceUrl}
                className="mt-3 inline-flex text-xs font-black uppercase tracking-wide text-[#C93A3A] underline underline-offset-4 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A]"
                target="_blank"
                rel="noreferrer"
              >
                {siteContent.grant.sourceLabel}
              </a>
            </div>
          </div>

          <div className="border-2 border-black bg-black p-6 text-white sm:p-8">
            <h3 className="text-2xl font-black uppercase">The Problem</h3>
            <p className="mt-5 leading-8 text-zinc-300">{siteContent.problem.intro}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {siteContent.problem.stats.map((stat) => (
                <div key={stat.label} className="border-l-4 border-[#C93A3A] bg-zinc-950 p-5">
                  <p className="text-4xl font-black">{stat.value}</p>
                  <p className="mt-1 text-sm font-black uppercase tracking-wide text-zinc-300">{stat.label}</p>
                  <p className="mt-3 text-xs leading-5 text-zinc-500">{stat.note}</p>
                  <a
                    href={stat.sourceUrl}
                    className="mt-3 inline-flex text-xs font-black uppercase tracking-wide text-zinc-400 underline decoration-[#C93A3A] underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {stat.sourceLabel}
                  </a>
                </div>
              ))}
            </div>

            <h4 className="mt-8 text-sm font-black uppercase tracking-wide text-[#C93A3A]">Surface impacts</h4>
            <ul className="mt-4 grid gap-3 text-zinc-200 sm:grid-cols-2">
              {siteContent.problem.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3">
                  <AlertTriangle className="mt-1 shrink-0 text-[#C93A3A]" aria-hidden="true" size={18} />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure className="mt-10 border-l-4 border-[#C93A3A] bg-white p-6 shadow-sm">
          <blockquote className="text-lg italic leading-8 text-zinc-800">"{siteContent.problem.quote}"</blockquote>
          <figcaption className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-500">
            <CheckCircle2 aria-hidden="true" size={18} />
            Supplied CargoFish material
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
