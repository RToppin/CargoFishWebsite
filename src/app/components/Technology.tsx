import { Cpu, Route, ShieldCheck, Zap } from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { SectionHeading } from "./SectionHeading";

const icons = [Route, ShieldCheck, Cpu, Zap];

export function Technology() {
  return (
    <section id="technology" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technology"
          title="How the system works"
          description="The CargoFish concept combines enclosed tunnels, energized rails, and self-propelled vehicles sized for everyday consumer goods."
        />

        <div className="border-l-4 border-[#C93A3A] bg-zinc-100 p-6 sm:p-8">
          <h3 className="text-2xl font-black uppercase">The CargoFish system</h3>
          <p className="mt-4 max-w-5xl text-lg leading-8 text-zinc-800">{siteContent.technology.summary}</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-black p-6 text-white sm:p-8">
            <h3 className="border-b-2 border-[#C93A3A] pb-3 text-xl font-black uppercase">Transport vehicles</h3>
            <ul className="mt-6 grid gap-5">
              {siteContent.technology.details.map((detail, index) => {
                const Icon = icons[index] ?? Route;
                return (
                  <li key={detail} className="flex gap-4">
                    <Icon className="mt-1 shrink-0 text-[#C93A3A]" aria-hidden="true" size={22} />
                    <span className="leading-7 text-zinc-200">{detail}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-2 border-zinc-300 bg-zinc-50 p-6 sm:p-8">
            <h3 className="border-b-2 border-[#C93A3A] pb-3 text-xl font-black uppercase">Delivery process</h3>
            <ol className="mt-6 grid gap-5">
              {siteContent.technology.process.map((step, index) => (
                <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="flex h-10 w-10 items-center justify-center bg-[#C93A3A] text-lg font-black text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1 leading-7 text-zinc-800">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-[#C93A3A] p-6 text-white sm:p-8">
            <h3 className="text-2xl font-black uppercase">Traffic management</h3>
            <p className="mt-4 leading-8">{siteContent.technology.traffic}</p>
          </div>
          <div className="border-2 border-black bg-white p-6 sm:p-8">
            <h3 className="text-2xl font-black uppercase">Throughput estimates</h3>
            <p className="mt-4 leading-8 text-zinc-800">{siteContent.technology.throughput}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
