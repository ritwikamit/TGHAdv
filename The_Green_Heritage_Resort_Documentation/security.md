# Security and Privacy Plan

This plan reduces common risks but cannot guarantee that a website will never be attacked.

## 1. Minimise the attack surface
Prefer a mostly static website. Do not add admin logins, uploads, payments, booking databases or custom authentication unless there is a clear business need.

## 2. Secrets and access
- Keep API keys, email credentials and database URLs server-side.
- Never expose secrets in browser code, `NEXT_PUBLIC_*`, HTML, GitHub or logs.
- Use hosting secret storage and separate preview/production values.
- Use MFA on domain, hosting, email, source control and CMS accounts.
- Give each person only the access they need.
- Rotate any credential that has been exposed.

## 3. Enquiry form security
- Validate every field on the server.
- Limit field lengths and total request body size.
- Allow-list enquiry categories.
- Normalise input and encode output appropriately.
- Never render user-submitted HTML.
- Do not expose stack traces or provider responses to visitors.
- Use CSRF protection where the framework/architecture requires it.
- Keep personal details out of analytics events and general application logs.

## 4. Rate limiting and bot mitigation
Suggested starting values for the enquiry endpoint:
- 5 requests per IP per 10 minutes.
- 20 requests per IP per 24 hours.
- Maximum request body around 16 KB.
- HTTP 429 when the rate limit is reached.
- Bot challenge for suspicious traffic or repeated submissions.
- Honeypot and minimum completion time as supplementary signals.
- Global email-provider quota and emergency disable switch.

Tune these limits against real traffic. Shared mobile networks can place many legitimate visitors behind one IP, so limits must not block normal customers unnecessarily.

In serverless environments, do not rely on in-memory counters. Use edge/WAF controls or a distributed rate limiter with atomic counters and expiry.

## 5. Traffic spikes and availability
- Put a CDN/WAF in front of the site.
- Cache public pages and static assets.
- Optimise images and video.
- Keep form execution bounded with timeouts.
- Use bounded retries and avoid retry storms.
- Protect email-provider quotas.
- Add uptime and error monitoring.
- Provide phone/WhatsApp fallback if the form service is unavailable.

## 6. Security headers
Configure and test CSP, HSTS after HTTPS is confirmed, `X-Content-Type-Options: nosniff`, an appropriate `Referrer-Policy`, `Permissions-Policy` and CSP `frame-ancestors`. Test Maps, social embeds, analytics and other integrations before enforcing a restrictive CSP.

## 7. Dependencies and deployment
- Keep dependencies minimal and updated.
- Run dependency and secret scans.
- Review build output and source maps for accidental data exposure.
- Protect deployment settings and branch permissions.
- Restrict production deployment access.
- Keep a rollback plan.

## 8. Privacy
Collect only the information needed to answer enquiries. Publish a privacy notice, define a retention period, restrict staff access and provide a deletion process. Obtain permission for customer photos, videos and testimonials. Use consent controls where required for non-essential tracking.

## 9. Monitoring and incident response
Monitor uptime, response times, 4xx/5xx rates, email quota, form failures and suspicious traffic. If abuse occurs, temporarily disable the endpoint or add stricter edge rules, rotate exposed credentials, patch the issue, test the fix and monitor recurrence.
