# CargoFish LLC Website

Production-ready React, TypeScript, Vite, and Tailwind site for CargoFish LLC.

The site includes a responsive company information page, configured video area, functional Vercel contact endpoint, Resend email delivery integration, legal draft views, SEO files, and Vercel security headers.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Vercel static hosting and serverless functions
- Resend for transactional contact-form notification emails

## Local Setup

Install dependencies:

```bash
npm install
```

Copy the environment placeholders:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

For the full application, run Vercel's local development server so `/api/contact` is available:

```bash
npm run dev:vercel
```

Use the normal Vite server only when you are working on frontend layout and do not need the Vercel API function:

```bash
npm run dev
```

## Environment Variables

Set these in Vercel Project Settings and in `.env.local` for local testing:

```bash
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
SITE_URL=
VITE_DEMO_VIDEO_URL=
VITE_DEMO_VIDEO_POSTER_URL=
VITE_CONFERENCE_DIAGRAM_URL=
VITE_CONFERENCE_VIDEO_1_URL=
VITE_CONFERENCE_VIDEO_1_POSTER_URL=
VITE_CONFERENCE_VIDEO_1_CAPTIONS_URL=
VITE_CONFERENCE_VIDEO_2_URL=
VITE_CONFERENCE_VIDEO_2_POSTER_URL=
VITE_CONFERENCE_VIDEO_2_CAPTIONS_URL=
```

- `RESEND_API_KEY`: Resend API key used only by `api/contact.ts`.
- `CONTACT_TO_EMAIL`: real inbox that receives inquiry notifications.
- `CONTACT_FROM_EMAIL`: sending address on a verified Resend domain or subdomain.
- `SITE_URL`: production URL used for operational configuration and documentation.
- `VITE_DEMO_VIDEO_URL`: optional public MP4/WebM URL for the demo video.
- `VITE_DEMO_VIDEO_POSTER_URL`: optional poster image URL for the demo video.
- `VITE_CONFERENCE_DIAGRAM_URL`: optional image URL for the conference diagram.
- `VITE_CONFERENCE_VIDEO_1_URL` / `VITE_CONFERENCE_VIDEO_2_URL`: optional public MP4/WebM URLs for conference footage.
- `VITE_CONFERENCE_VIDEO_1_POSTER_URL` / `VITE_CONFERENCE_VIDEO_2_POSTER_URL`: optional poster images.
- `VITE_CONFERENCE_VIDEO_1_CAPTIONS_URL` / `VITE_CONFERENCE_VIDEO_2_CAPTIONS_URL`: optional WebVTT captions.

Never expose `RESEND_API_KEY` in browser code.

## Contact Email Setup With Resend

1. Create a Resend account.
2. Add and verify a sending domain or sending subdomain in Resend.
3. Add the DNS records Resend provides for that sending domain.
4. Create a Resend API key.
5. In Vercel, add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`.
6. Set `CONTACT_TO_EMAIL` to the real inbox that should receive inquiries.
7. Set `CONTACT_FROM_EMAIL` to an address on the verified Resend sending domain.
8. Deploy and test a real form submission.

Resend sends transactional website notifications. It does not create a normal inbox like `info@cargofish.com`. That inbox must exist through the company's mailbox provider or email-forwarding service.

If CargoFish already has mailbox DNS configured, consider using a sending subdomain such as `send.cargofish.com` for Resend. Do not overwrite existing MX records for the company mailbox.

If Resend is not configured, the API returns `503 Service Unavailable` and the form shows a direct `mailto:` fallback.

## Demo Video

The video component supports native MP4 or WebM playback with controls, `playsInline`, `preload="metadata"`, an optional poster, and an optional captions track.

Option A: hosted video URL

```bash
VITE_DEMO_VIDEO_URL=https://example.com/cargofish-demo.mp4
VITE_DEMO_VIDEO_POSTER_URL=https://example.com/cargofish-demo-poster.jpg
```

Option B: local public file

1. Place the video at `public/media/cargofish-demo.mp4`.
2. Place the poster at `public/media/cargofish-demo-poster.jpg`.
3. Set:

```bash
VITE_DEMO_VIDEO_URL=/media/cargofish-demo.mp4
VITE_DEMO_VIDEO_POSTER_URL=/media/cargofish-demo-poster.jpg
```

Add captions by wiring a WebVTT file in `src/content/siteContent.ts` once captions are available.

## Conference Diagram And Videos

The `Conference media` section is configured in `src/content/siteContent.ts`. It is currently tied to the supplied NYC Fleet Show milestone from May 15, 2025.

Hosted media example:

```bash
VITE_CONFERENCE_DIAGRAM_URL=https://example.com/cargofish-conference-diagram.png
VITE_CONFERENCE_VIDEO_1_URL=https://example.com/cargofish-nyc-fleet-show-clip-1.mp4
VITE_CONFERENCE_VIDEO_1_POSTER_URL=https://example.com/cargofish-nyc-fleet-show-clip-1.jpg
VITE_CONFERENCE_VIDEO_1_CAPTIONS_URL=https://example.com/cargofish-nyc-fleet-show-clip-1.vtt
```

Local public files example:

```bash
VITE_CONFERENCE_DIAGRAM_URL=/media/cargofish-conference-diagram.png
VITE_CONFERENCE_VIDEO_1_URL=/media/cargofish-nyc-fleet-show-clip-1.mp4
VITE_CONFERENCE_VIDEO_1_POSTER_URL=/media/cargofish-nyc-fleet-show-clip-1.jpg
VITE_CONFERENCE_VIDEO_1_CAPTIONS_URL=/media/cargofish-nyc-fleet-show-clip-1.vtt
```

Place local files under `public/media/`. The site shows professional fallback states until real URLs are supplied.

## Testing And Verification

Run:

```bash
npm run typecheck
npm run test
npm run build
```

Manual checks before launch:

- Test the form with invalid fields.
- Test the form with Resend configured.
- Test the form with Resend variables removed to confirm the controlled error state.
- Confirm `/api/contact` rejects non-POST requests.
- Confirm `/privacy` and `/terms` render.
- Check the layout at 375px, 768px, and 1440px.
- Confirm no Lorem Ipsum, fake phone number, `href="#"`, `figma:asset`, or `noindex` remains.
- Check the browser console for errors.

## Spam And Abuse Protection

The contact flow includes:

- Hidden honeypot field.
- Strict browser and server validation.
- Maximum field lengths.
- JSON content-type enforcement.
- No file uploads.

There is no in-memory serverless rate limiter because it would not work reliably across serverless instances. If abuse becomes a problem, add persistent rate limiting through Vercel Firewall, Upstash, or another durable service.

## Vercel Deployment

Install and log in to the Vercel CLI if needed:

```bash
npm install
npx vercel login
```

Run a production build locally:

```bash
npm run build
```

Deploy a preview:

```bash
npx vercel
```

Deploy production:

```bash
npx vercel --prod
```

Add environment variables in Vercel Project Settings before testing the contact form in production.

To view function logs safely, use the Vercel dashboard or:

```bash
npx vercel logs
```

Do not log complete contact messages or sensitive personal information.

## Custom Domain On Vercel

1. Open the Vercel project.
2. Go to Settings, then Domains.
3. Add the existing CargoFish production domain.
4. Follow Vercel's DNS instructions for the domain host.
5. Confirm the production domain in `CONTENT_NEEDED.md`.
6. Update `public/robots.txt`, `public/sitemap.xml`, and `src/content/siteContent.ts` if the final domain is not `https://www.cargofish.com`.

## Content Handoff

Remaining manual inputs are tracked in `CONTENT_NEEDED.md`.
