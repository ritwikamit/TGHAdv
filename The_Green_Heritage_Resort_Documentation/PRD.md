# Product Requirements Document (PRD)

## Product overview
Create a fast, mobile-first website for The Green Heritage Resort and Banquet in the Bakarpur area of Muzaffarpur, Bihar. The site should help visitors understand the services that the owner confirms and contact the property for current details.

## Goals
- Establish a clear official online presence.
- Make location and contact options easy to find.
- Generate room and event enquiries, if those services are confirmed.
- Display authentic photographs of the property.
- Improve local search visibility and answer-friendly business information.
- Keep the site maintainable, secure and fast during traffic spikes.

## Audience
People looking for accommodation, families arranging functions, wedding/event planners and visitors seeking directions. The exact audience priorities should be refined with the owner.

## Core conversions
1. Phone call.
2. WhatsApp enquiry, if the official number supports it.
3. Enquiry form submission.
4. Google Maps directions.
5. Room or event enquiry, based on confirmed services.

## Proposed sitemap
Home; Stay (if applicable); Weddings & Events (if applicable); Gallery; Facilities; Location & Contact; Privacy Policy.

## Functional requirements
- Responsive navigation and layouts.
- Click-to-call, WhatsApp and map links using verified details.
- Short enquiry form with server-side validation.
- Generic success/error messages.
- Spam prevention and rate limiting.
- Social links to owner-confirmed accounts.
- Optimised images and accessible gallery.
- SEO metadata, sitemap, robots.txt, canonical URLs and accurate structured data.
- Clear privacy notice and minimal collection of personal information.

## Non-functional requirements
- Fast loading on mobile networks.
- HTTPS everywhere.
- Accessible forms and navigation.
- No credentials exposed in frontend bundles or source control.
- Monitoring for uptime and form-delivery issues.
- Simple maintenance process and documented ownership.

## Out of scope for first release
Online payments, guest accounts, custom reservation inventory, identity-document uploads, complex booking management or an admin CMS unless the owner explicitly requires them.

## Acceptance criteria
- All contact and directions links are verified.
- Form submissions reach the approved recipient.
- Server-side validation and rate limiting are active.
- All published business claims are owner-approved.
- No secrets are exposed in source code, Git or browser bundles.
- Key pages pass mobile, accessibility, SEO, broken-link and production-build checks.
