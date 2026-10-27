---
name: contact-and-email
description: Use for the contact form, enquiry handling, and any transactional email on the Ocran site.
---

# Contact form + email playbook

> **Current build (D-028):** name, email, message required; phone and service optional. Server action
> `app/(site)/contact/actions.ts` → honeypot → rate limit → `lib/validation/contact.ts` → Resend REST
> (`lib/email.ts`) to `CONTACT_TO_EMAIL`, reply-to the enquirer. Not yet: Turnstile, auto-reply, saving to Sanity —
> add them only when asked (spam appears / mail domain exists / client wants enquiries in the Studio).

## Contact form (`/contact` and the reusable `<ContactForm/>`)

Fields (from client brief): **Name, Email, Message** (all required). Optional: Organisation, Service of interest
(select from Sanity services). Hidden: honeypot `website` field, Turnstile token, source page.

Below the form, render emails, phone and WhatsApp from `siteSettings` (never hardcoded), plus "Based in Tema,
Greater Accra, Ghana".

## `/api/contact` (POST)

1. Parse with the shared zod schema (`lib/validation/contact.ts`) — same schema used client-side.
2. Honeypot filled → return 200 silently (don't tell bots).
3. Verify Turnstile token server-side (`https://challenges.cloudflare.com/turnstile/v0/siteverify`).
4. Rate limit: max 5 submissions / IP / hour.
5. Send notification to `CONTACT_TO_EMAIL` via Resend (`reply_to` = enquirer's email). Subject:
   `New enquiry — {service or "General"}`.
6. Send the enquirer a short auto-reply (warm, clear, sets expectation: "reply within 2 working days").
7. Save an `enquiry` document to Sanity with the write token so Jonathan can see it in Studio.
8. Return `{ ok: true }`. UI shows an inline success state (no page reload, focus moves to the message).

Errors: show a friendly inline message + fallback "or email us directly" link. Never expose stack traces.

## Email templates

- Use React Email components in `emails/` for consistent branded templates (ivory bg, monogram, Jost-like system font stack).
- Plain-text alternative always included.
- No tracking pixels.

## Newsletter / gated resources — on hold (D-016)

Do not build `/api/subscribe`, Brevo sign-up or signed download links. The previous plan is kept in
`docs/later/held-features.md`.

## Privacy

- Don't log names, emails, messages. Log only an event id + outcome.
- Privacy policy must list Resend, Sanity, Vercel, Cloudflare as processors.

## Done when

- [ ] Works with JS disabled? (Progressive enhancement via server action is a bonus, not required)
- [ ] Turnstile + honeypot + rate limit all active
- [ ] Notification and auto-reply arrive and pass SPF/DKIM
- [ ] Enquiry appears in Studio
- [ ] Accessible: labels, error messages tied with `aria-describedby`, success announced via `aria-live`
