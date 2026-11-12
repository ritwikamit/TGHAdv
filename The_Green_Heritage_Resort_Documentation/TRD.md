# Technical Requirements Document (TRD)

## Recommended implementation
- Next.js with TypeScript.
- Tailwind CSS or a consistent component system.
- Managed hosting with CDN caching and HTTPS.
- Server-side form handler or server action.
- Schema validation library such as Zod.
- Transactional email provider for enquiries.
- Optional bot protection such as Cloudflare Turnstile.
- Optional managed database only if the owner needs stored enquiries, booking management or a CMS.

A database is not required for a simple enquiry-only site if email delivery is sufficient.

## Architecture
Public pages should be statically generated or cached where possible. The enquiry endpoint should be server-side and separate from public-page caching. Avoid adding unnecessary APIs or admin routes.

## Enquiry flow
1. Visitor completes the form.
2. Browser-side validation provides immediate feedback.
3. Server validates field types, allowed values and length limits.
4. Rate limiting and bot checks run before sending.
5. Valid enquiry is sent to the approved business recipient.
6. Logs store request ID and delivery status, not full message contents or secrets.
7. Visitor receives a generic success or failure message.

## Environment variables
Use server-side variables such as `EMAIL_PROVIDER_API_KEY`, `ENQUIRY_EMAIL_TO`, `ENQUIRY_EMAIL_FROM`, `TURNSTILE_SECRET_KEY` and `DATABASE_URL` only if needed. Commit placeholders in `.env.example`, never real credentials. Avoid `NEXT_PUBLIC_` for secrets.

## Media and performance
Use AVIF/WebP responsive images, explicit image dimensions, lazy loading below the fold and a compressed hero asset with a poster/static fallback if video is used. Avoid loading large third-party embeds before user interaction where practical.

## SEO implementation
Unique page titles/descriptions, canonical URLs, Open Graph, sitemap, robots.txt, accurate JSON-LD, useful alt text and correct 404 behaviour. Do not index preview deployments.

## Deployment and maintenance
Use separate development, preview and production environments. Keep production secrets separate. Run lint, type checking, build, dependency scan, secret scan and link checks before release. Document rollback and access ownership.
