import { Film } from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { SectionHeading } from "./SectionHeading";

type DemoVideoConfig = typeof siteContent.demoVideo;

function getVideoType(url: string) {
  if (url.endsWith(".webm")) {
    return "video/webm";
  }

  if (url.endsWith(".mp4")) {
    return "video/mp4";
  }

  return undefined;
}

export function DemoVideo({ config = siteContent.demoVideo }: { config?: DemoVideoConfig }) {
  const video = config;
  const hasEmbed = Boolean(video.embedUrl);
  const hasNativeVideo = Boolean(video.url);
  const hasMedia = hasEmbed || hasNativeVideo;

  return (
    <section id="demo" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Demonstration"
          title="See CargoFish in action"
          description="Watch the main CargoFish demonstration from the company's public LinkedIn update."
        />

        <div className="mx-auto max-w-5xl">
          <div className="aspect-[504/399] overflow-hidden border-4 border-black bg-black">
            {hasEmbed ? (
              <iframe
                src={video.embedUrl}
                title={video.title}
                className="h-full w-full"
                loading="lazy"
                allow="fullscreen"
                allowFullScreen
              />
            ) : hasNativeVideo ? (
              <video
                className="h-full w-full bg-black object-contain"
                controls
                playsInline
                preload="metadata"
                poster={video.posterUrl || undefined}
                title={video.title}
              >
                <source src={video.url} type={getVideoType(video.url)} />
                {video.captionsUrl ? (
                  <track kind="captions" src={video.captionsUrl} srcLang="en" label="English captions" default />
                ) : null}
                Your browser does not support HTML5 video. You can open the demonstration video at {video.url}.
              </video>
            ) : hasMedia ? null : (
              <div className="flex h-full items-center justify-center bg-zinc-950 px-6 text-center">
                <div className="max-w-xl">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center border-2 border-white bg-[#C93A3A] text-white">
                    <Film aria-hidden="true" size={34} />
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white">{video.fallbackHeading}</h3>
                  <p className="mt-4 text-base leading-7 text-zinc-300">{video.fallbackBody}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="border-l-4 border-[#C93A3A] bg-zinc-100 p-6">
              <p className="text-3xl font-black text-black">{siteContent.problem.stats[0].value}</p>
              <p className="mt-1 text-sm font-black uppercase tracking-wide text-zinc-700">
                {siteContent.problem.stats[0].label}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{siteContent.problem.stats[0].note}</p>
              <a
                href={siteContent.problem.stats[0].sourceUrl}
                className="mt-3 inline-flex text-xs font-black uppercase tracking-wide text-[#C93A3A] underline underline-offset-4 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A]"
                target="_blank"
                rel="noreferrer"
              >
                {siteContent.problem.stats[0].sourceLabel}
              </a>
            </div>
            <div className="border-l-4 border-[#C93A3A] bg-zinc-100 p-6">
              <p className="text-3xl font-black text-black">{siteContent.energyClaim.value}</p>
              <p className="mt-1 text-sm font-black uppercase tracking-wide text-zinc-700">
                {siteContent.energyClaim.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">Concept attribute requiring full validation.</p>
            </div>
            <div className="border-l-4 border-[#C93A3A] bg-zinc-100 p-6">
              <p className="text-3xl font-black text-black">{siteContent.grant.amount}</p>
              <p className="mt-1 text-sm font-black uppercase tracking-wide text-zinc-700">
                {siteContent.grant.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{siteContent.grant.organization}</p>
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
        </div>
      </div>
    </section>
  );
}
