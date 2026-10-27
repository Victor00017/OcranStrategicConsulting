---
name: paystack-books
description: Use for anything involving the book store — book pages, Buy buttons, Paystack checkout, webhooks, orders, and download delivery.
---

# Book store + Paystack playbook

## Flow

1. `/books/[slug]` shows the book (from Sanity) with a **Buy** button (client component).
2. Button POSTs `{ bookSlug, email, name, (shipping address if physical) }` to `/api/checkout`.
3. `/api/checkout` (server):
   - validate input with zod
   - load the book from Sanity **server-side**; price comes from Sanity, never from the request
   - create an `orders` row: `status='pending'`, `reference` = crypto-random id
   - call Paystack `POST https://api.paystack.co/transaction/initialize` with
     `amount` in pesewas (GHS × 100), `currency`, `email`, `reference`, `callback_url=/books/thank-you?ref=...`,
     `metadata: { orderId, bookSlug }`
   - return `authorization_url` → client redirects (or use Paystack Inline with `access_code`)
4. `/api/paystack/webhook`:
   - read the **raw body**; verify `x-paystack-signature` = HMAC-SHA512(rawBody, PAYSTACK_SECRET_KEY); reject otherwise
   - on `charge.success`: call `GET /transaction/verify/:reference` to double-check status, amount and currency match
     the order; then mark `paid` (idempotent — ignore if already paid)
   - digital: create a signed download token (expires in 72h, max 5 uses) and email the link via Resend
   - physical: email Jonathan a fulfilment notice (to `CONTACT_TO_EMAIL`) + email buyer a confirmation
   - always return 200 quickly after processing; log the reference only (no names/emails)
5. `/books/thank-you` calls verify by reference and shows status — but **fulfilment happens only in the webhook**.
6. `/api/download/[token]`: validate signature, expiry and use count → stream the private file.
   Files are not publicly addressable (store in private storage; never put the asset URL in page HTML).

## Data (Drizzle)

`orders`: id, reference (unique), book_slug, amount_minor, currency, email, status (pending|paid|failed|refunded),
fulfilment (digital|physical), shipping (jsonb, nullable), created_at, paid_at.
`downloads`: token_hash, order_id, expires_at, uses, max_uses.
Delete or anonymise shipping details 12 months after fulfilment (privacy policy states this).

## Rules

- Test mode keys until launch; use Paystack test cards / test mobile money.
- Never log card data (we never see it anyway — Paystack hosts payment entry).
- Show prices with currency (`GH₵ 150.00`) using `Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' })`.
- Book pages emit `Book` + `Product`/`Offer` JSON-LD (see seo-page skill).

## Done when

- [ ] Tampered amount in request has no effect
- [ ] Invalid webhook signature → 401
- [ ] Webhook replay doesn't double-send emails
- [ ] Download link expires and use-count limit works
- [ ] Unit tests for signature verification and amount conversion
