import { FileImage, Film, MapPin } from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { SectionHeading } from "./SectionHeading";

type ConferenceShowcaseConfig = typeof siteContent.conferenceShowcase;

function getVideoType(url: string) {
  if (url.endsWith(".webm")) {
    return "video/webm";
  }

  if (url.endsWith(".mp4")) {
    return "video/mp4";
  }

  return undefined;
}

export function ConferenceShowcase({
  config = siteContent.conferenceShowcase,
}: {
  config?: ConferenceShowcaseConfig;
}) {
  return (
    <section id="conference" className="bg-zinc-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={config.eyebrow}
          title={config.title}
          description={config.description}
          inverse
        />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="border-2 border-zinc-700 bg-black p-5 sm:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-2xl font-black uppercase">{config.diagram.title}</h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-wide text-[#C93A3A]">Diagram</p>
              </div>
              <EventBadge eventName={config.eventName} date={config.date} location={config.location} />
            </div>

            <div className="aspect-[4/3] overflow-hidden border-2 border-zinc-700 bg-zinc-900 sm:aspect-[16/10]">
              {config.diagram.url ? (
                <img
                  src={config.diagram.url}
                  alt={config.diagram.alt}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center">
                  <div className="max-w-md">
                    <FileImage className="mx-auto text-[#C93A3A]" aria-hidden="true" size={48} />
                    <h4 className="mt-5 text-xl font-black uppercase">Diagram ready</h4>
                    <p className="mt-3 leading-7 text-zinc-300">{config.diagram.fallbackBody}</p>
                  </div>
                </div>
              )}
            </div>
          </article>

          <div className="grid gap-6">
            {config.videos.map((video) => (
              <article key={video.title} className="border-2 border-zinc-700 bg-black p-5 sm:p-6">
                <div className="mb-4">
                  <p className="text-sm font-black uppercase tracking-wide text-[#C93A3A]">{video.label}</p>
                  <h3 className="mt-2 text-xl font-black uppercase">{video.title}</h3>
                </div>

                <div className="aspect-video overflow-hidden border-2 border-zinc-700 bg-zinc-900">
                  {video.url ? (
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
                      Your browser does not support HTML5 video. You can open this conference video at {video.url}.
                    </video>
                  ) : (
                    <div className="flex h-full items-center justify-center px-5 text-center">
                      <div>
                        <Film className="mx-auto text-[#C93A3A]" aria-hidden="true" size={40} />
                        <p className="mt-4 text-lg font-black uppercase">Conference video slot ready</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-400">
                          Add an MP4/WebM URL, poster, and optional captions when footage is supplied.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EventBadge({
  eventName,
  date,
  location,
}: {
  eventName: string;
  date: string;
  location: string;
}) {
  return (
    <div className="border-l-4 border-[#C93A3A] bg-zinc-950 px-4 py-3 text-sm">
      <p className="font-black uppercase text-white">{eventName}</p>
      <p className="mt-1 font-semibold text-zinc-300">{date}</p>
      <p className="mt-1 flex gap-2 text-zinc-400">
        <MapPin className="mt-0.5 shrink-0" aria-hidden="true" size={15} />
        <span>{location}</span>
      </p>
    </div>
  );
}
