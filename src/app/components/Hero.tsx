import { ArrowRight, Building2, PlayCircle } from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { selectInquiryAndScroll } from "../../lib/inquiryEvents";

export function Hero() {
  const hasDemoVideo = Boolean(siteContent.demoVideo.embedUrl || siteContent.demoVideo.url);

  return (
    <section id="home" className="bg-black pt-32 text-white sm:pt-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20">
        <div className="min-w-0 max-w-4xl">
          <p className="mb-5 inline-flex border-l-4 border-[#C93A3A] bg-white px-4 py-2 text-sm font-black uppercase tracking-wide text-black">
            {siteContent.hero.eyebrow}
          </p>
          <h1 className="max-w-[12ch] break-words text-4xl font-black uppercase leading-none sm:max-w-none sm:text-6xl lg:text-7xl">
            {siteContent.hero.headline}
          </h1>
          <div className="my-7 h-1 w-24 bg-[#C93A3A]" />
          <p className="max-w-3xl text-lg leading-8 text-zinc-200 sm:text-xl">
            {siteContent.hero.description}
          </p>
          <div className="mt-8 inline-block border-2 border-white bg-[#C93A3A] px-5 py-3">
            <p className="text-base font-black uppercase tracking-wide sm:text-lg">{siteContent.hero.kicker}</p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {hasDemoVideo ? (
              <a
                href="/#demo"
                className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#C93A3A] bg-[#C93A3A] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-[#AB2D2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <PlayCircle aria-hidden="true" size={20} />
                Watch Demo
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => selectInquiryAndScroll("investor")}
              className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-white px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <ArrowRight aria-hidden="true" size={20} />
              Investor Inquiry
            </button>
            <button
              type="button"
              onClick={() => selectInquiryAndScroll("partnership")}
              className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-zinc-500 px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Building2 aria-hidden="true" size={20} />
              Partnership Inquiry
            </button>
          </div>
        </div>

        <div className="min-w-0 self-end border-2 border-zinc-700 bg-zinc-950 p-5">
          <p className="text-sm font-black uppercase tracking-wide text-[#C93A3A]">Infrastructure concept</p>
          <p className="mt-4 break-words text-2xl font-black uppercase leading-tight text-white">
            Underground movement for consumer packaged goods.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {siteContent.problem.stats.map((stat) => (
              <div key={stat.label} className="border-l-4 border-[#C93A3A] bg-black p-4">
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-zinc-400">
            Figures draw from public Census and Federal Highway Administration data; additional market sources appear
            below.
          </p>
        </div>
      </div>
    </section>
  );
}
