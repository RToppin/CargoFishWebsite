import { CalendarCheck } from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { SectionHeading } from "./SectionHeading";

export function News() {
  return (
    <section id="news" className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Milestones"
          title="Completed CargoFish updates"
          description="These milestones reflect completed CargoFish updates and public demonstrations."
        />

        <div className="grid gap-5">
          {siteContent.milestones.map((item) => (
            <article key={`${item.date}-${item.title}`} className="grid gap-5 border-l-4 border-[#C93A3A] bg-white p-6 sm:grid-cols-[13rem_1fr] sm:p-8">
              <div>
                <span className="inline-flex items-center gap-2 bg-black px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                  <CalendarCheck aria-hidden="true" size={16} />
                  {item.category}
                </span>
                <p className="mt-4 text-sm font-black uppercase tracking-wide text-zinc-500">{item.date}</p>
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase text-black">{item.title}</h3>
                <p className="mt-3 leading-8 text-zinc-700">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
