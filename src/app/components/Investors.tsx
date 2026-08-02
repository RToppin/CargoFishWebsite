import { Handshake, Landmark, Mail } from "lucide-react";
import { siteContent } from "../../content/siteContent";
import { selectInquiryAndScroll } from "../../lib/inquiryEvents";
import { SectionHeading } from "./SectionHeading";

export function Investors() {
  return (
    <section id="investors" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Investors and partners"
          title="Conversations for the next stage"
          description={siteContent.investors.description}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="border-l-4 border-[#C93A3A] bg-zinc-100 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Landmark className="mt-1 shrink-0 text-[#C93A3A]" aria-hidden="true" size={30} />
              <div>
                <h3 className="text-2xl font-black uppercase">Grant funding</h3>
                <p className="mt-5 text-5xl font-black text-[#C93A3A]">{siteContent.grant.amount}</p>
                <p className="mt-3 text-lg font-black text-black">{siteContent.grant.title}</p>
                <p className="mt-2 leading-7 text-zinc-700">{siteContent.grant.organization}</p>
                <p className="mt-5 inline-flex border-l-4 border-black bg-white px-4 py-3 text-sm font-black uppercase tracking-wide text-zinc-700">
                  {siteContent.grant.period} | {siteContent.grant.status}
                </p>
                <a
                  href={siteContent.grant.sourceUrl}
                  className="mt-4 inline-flex text-xs font-black uppercase tracking-wide text-[#C93A3A] underline underline-offset-4 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A]"
                  target="_blank"
                  rel="noreferrer"
                >
                  {siteContent.grant.sourceLabel}
                </a>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-[#C93A3A] bg-zinc-100 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Handshake className="mt-1 shrink-0 text-[#C93A3A]" aria-hidden="true" size={30} />
              <div>
                <h3 className="text-2xl font-black uppercase">Inquiry paths</h3>
                <p className="mt-5 leading-8 text-zinc-800">
                  Use the form for investor conversations, strategic partnerships, municipal pilots, media questions,
                  or general company inquiries.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => selectInquiryAndScroll("investor")}
                    className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-[#C93A3A] bg-[#C93A3A] px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-[#AB2D2D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C93A3A]"
                  >
                    <Mail aria-hidden="true" size={19} />
                    Investor Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => selectInquiryAndScroll("partnership")}
                    className="inline-flex min-h-12 items-center justify-center gap-2 border-2 border-black px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                  >
                    <Handshake aria-hidden="true" size={19} />
                    Partnership Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-4 border-black bg-[#C93A3A] p-6 text-white sm:p-8">
          <h3 className="text-2xl font-black uppercase">Investor notice</h3>
          <p className="mt-4 leading-8">{siteContent.investors.disclaimer}</p>
        </div>

        <figure className="mt-10 border-l-4 border-[#C93A3A] bg-black p-6 text-white sm:p-8">
          <blockquote className="text-lg italic leading-8">"{siteContent.testimonial.quote}"</blockquote>
          <figcaption className="mt-5 text-sm font-black uppercase tracking-wide text-zinc-300">
            {siteContent.testimonial.attribution}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
