# CargoFish LLC Website

Production-ready React, TypeScript, Vite, and Tailwind site for CargoFish LLC.

The site includes a responsive company information page, LinkedIn video embeds, a direct-email contact flow, legal draft views, SEO files, and Vercel security headers.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Vercel static hosting
- Optional Resend/Vercel contact API retained for future server-side email delivery

## Local Setup

Install dependencies:

```bash
npm install
```

Optional: copy the environment placeholder file if you want local notes for future settings:

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

No environment variables are required for the current public launch. The contact form opens a prepared email to
`contact.cargofish@gmail.com`, and the demo/conference videos are embedded directly from LinkedIn in
`src/content/siteContent.ts`.

Optional future values are documented in `.env.example`:

```bash
VITE_SITE_URL=
# RESEND_API_KEY=
# CONTACT_TO_EMAIL=
# CONTACT_FROM_EMAIL=
```

- `VITE_SITE_URL`: optional production URL override used for canonical and social metadata.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`: optional future Resend values if the form is switched back to server-side email delivery.

Never expose a real `RESEND_API_KEY` in browser code.

## Contact Email

The current contact form validates the entered fields, then opens the visitor's email app with a prepared message to
`contact.cargofish@gmail.com`. No Resend account or Vercel email environment variables are needed for this launch.

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
- Test the form opens a prepared email to `contact.cargofish@gmail.com`.
- Confirm `/privacy` and `/terms` render.
- Check the layout at 375px, 768px, and 1440px.
- Confirm no Lorem Ipsum, fake phone number, `href="#"`, `figma:asset`, or `noindex` remains.
- Check the browser console for errors.

## Spam And Abuse Protection

The current direct-email contact flow includes:

- Hidden honeypot field.
- Browser validation before opening the prepared email.
- Maximum field lengths.
- No file uploads.

If the server-side contact API is re-enabled later, add persistent rate limiting through Vercel Firewall, Upstash, or another durable service.

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
