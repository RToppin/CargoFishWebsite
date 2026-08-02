# CargoFish LLC Website

Production-ready React, TypeScript, Vite, and Tailwind site for CargoFish LLC.

The site includes a responsive company information page, LinkedIn video embeds, a Resend-backed contact form, legal draft views, SEO files, and Vercel security headers.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Vercel static hosting and serverless functions
- Resend for contact-form email delivery

## Local Setup

Install dependencies:

```bash
npm install
```

Copy the environment placeholder file if you want to test the contact API locally:

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

Set these in Vercel Project Settings. Only `RESEND_API_KEY` is required for the current contact form; the email
receiver defaults to `contact.cargofish@gmail.com`.

```bash
RESEND_API_KEY=
# CONTACT_TO_EMAIL=contact.cargofish@gmail.com
# CONTACT_FROM_EMAIL=website@send.cargofish.com
VITE_SITE_URL=
```

- `RESEND_API_KEY`: required Resend API key used only by `api/contact.ts`.
- `CONTACT_TO_EMAIL`: optional override for the inbox that receives form notifications. Defaults to `contact.cargofish@gmail.com`.
- `CONTACT_FROM_EMAIL`: optional sender override. Defaults to `CargoFish Website <onboarding@resend.dev>`.
- `VITE_SITE_URL`: optional production URL override used for canonical and social metadata.

Never expose a real `RESEND_API_KEY` in browser code.

## Contact Email With Resend

The contact form validates the entered fields, posts to `/api/contact`, and sends the inquiry through Resend to
`contact.cargofish@gmail.com`. If delivery fails, the user gets a direct `mailto:` fallback.

Resend requires a sender address on every email. The code currently defaults to `CargoFish Website <onboarding@resend.dev>`,
which matches Resend's sample sender. For stronger production deliverability later, verify a domain or subdomain in
Resend and set `CONTACT_FROM_EMAIL`, for example `website@send.cargofish.com`.

## Demo Video

The main demo uses a LinkedIn embed URL configured in `src/content/siteContent.ts`. The component still supports a
native MP4/WebM fallback through the `url`, `posterUrl`, and `captionsUrl` fields in that same content file.

## Conference Diagram And Videos

The `Conference media` section is configured in `src/content/siteContent.ts`. It currently displays the two supplied
NYC Fleet Show LinkedIn embeds from May 2025. The diagram slot remains in code but is hidden until a real diagram URL
is added.

LinkedIn embeds do not provide a guaranteed site-controlled mute setting. To guarantee silent playback, replace the
embed with a muted source video file or a muted LinkedIn upload.

## Testing And Verification

Run:

```bash
npm run typecheck
npm run test
npm run build
```

Manual checks before launch:

- Test the form with invalid fields.
- Test the form with `RESEND_API_KEY` configured.
- Test the form with `RESEND_API_KEY` removed to confirm the fallback error state.
- Confirm `/api/contact` rejects non-POST requests.
- Confirm `/privacy` and `/terms` render.
- Check the layout at 375px, 768px, and 1440px.
- Confirm no Lorem Ipsum, fake phone number, `href="#"`, `figma:asset`, or `noindex` remains.
- Check the browser console for errors.

## Spam And Abuse Protection

The contact flow includes:

- Hidden honeypot field.
- Browser and server validation.
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

Add `RESEND_API_KEY` in Vercel Project Settings before testing the contact form in production.

To view function logs safely, use the Vercel dashboard or:

```bash
npx vercel logs
```

Do not log complete contact messages or sensitive personal information.

## Custom Domain On Vercel

This is optional. The site defaults to `https://www.cargofish.com` for canonical metadata and SEO files. If CargoFish
uses a different final domain later, update `VITE_SITE_URL`, `public/robots.txt`, and `public/sitemap.xml`.

## Content Handoff

Remaining manual inputs are tracked in `CONTENT_NEEDED.md`.
