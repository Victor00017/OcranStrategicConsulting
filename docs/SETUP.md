# SETUP.md — accounts, DNS, email, launch checklist

Rule: every account (domain, Vercel, Sanity, Paystack, Resend, Google) should end up **owned by the client**,
with the studio added as admin/collaborator. Keep a handover sheet (outside the repo) of where each account lives.

## 1. Hosting — Vercel

- ⚠️ Vercel **Hobby is non-commercial only** (fair-use guidelines). A business site selling books needs
  **Pro ($20/mo)** — either the client's own Pro team or your studio's Pro team. Free commercial-OK alternatives:
  Cloudflare Workers/Pages or Netlify, if budget is a hard zero.
- Import the GitHub repo → framework auto-detects Next.js. Add env vars from `.env.example` for Production + Preview.
- Domains: add `www.ocranstrategicconsulting.com` (primary) and `ocranstrategicconsulting.com` (redirect → www).

## 2. DNS — keep it at Namecheap (BasicDNS)

Keeping Namecheap DNS lets you use Namecheap's free email forwarding as a fallback (see §3).
Add exactly the records Vercel shows in the Domains screen; typically:

| Type | Host | Value |
|---|---|---|
| A | @ | `76.76.21.21` (confirm in Vercel) |
| CNAME | www | `cname.vercel-dns.com` (or the project-specific value Vercel gives) |

Delete Namecheap's default parking records (URL redirect / CNAME to parkingpage) first.

## 3. Free company email (info@, jnocran@)

**Option A — Zoho Mail Forever Free (try first).** Up to 5 users, 5 GB each, webmail + Zoho Mail mobile app,
no IMAP/POP (so no Outlook/Gmail app sync). Availability varies by region — at signup, choose the
"Forever Free" plan if it appears. If you only see a 15-day trial, go to Option B.
DNS: Zoho's MX records (mx/mx2/mx3.zoho.com — use what Zoho shows), TXT verification, SPF `include:zoho.com`, DKIM.

**Option B — Forwarding + Gmail "Send mail as" (always free).**
1. Namecheap → Domain → Redirect Email: forward `info@` and `jnocran@` → Jonathan's Gmail.
2. In Gmail: Settings → Accounts → "Send mail as" → add `jnocran@ocranstrategicconsulting.com`,
   SMTP server `smtp.resend.com`, port 465, user `resend`, password = a Resend API key (domain must be verified
   in Resend). Brevo SMTP also works (free, 300/day).
3. Result: mail arrives in Gmail; replies go out from the company address.

**Paid upgrade later** (more professional, ~US$1–7/user/mo): Zoho Mail Lite or Google Workspace.

Either way, add DMARC: `TXT _dmarc  v=DMARC1; p=none; rua=mailto:<a monitored address>` → tighten to `quarantine`
after 4 weeks of clean reports. Only ONE SPF record at the root — merge includes into it.

## 4. Transactional email — Resend

Verify the domain in Resend (it uses a `send.` subdomain for SPF/MX + DKIM TXT, so no conflict with Zoho/forwarding).
Free tier covers contact-form notifications, auto-replies and book download emails at this scale.
From address: `website@ocranstrategicconsulting.com`; reply-to: the enquirer.

## 5. Sanity

`pnpm create sanity@latest` inside the repo (embedded Studio). Free plan. Add CORS origins for localhost and the
production domain. Create a read token (server only) and a write token (for saving enquiries). Invite Jonathan as Editor.
Add a webhook → `https://www.ocranstrategicconsulting.com/api/revalidate` with a secret.

## 6. Payments — Paystack (Phase 2 — parked)

Not needed for launch. Starting the Paystack account paperwork early is still worth it, since activation is slow.

- Create the account in the business's name. Full activation needs business/ID documents and a settlement
  account (bank or mobile money) — start this **early**; it's often the slowest step.
- Use test keys until launch. Set the webhook URL to `/api/paystack/webhook`.
- Publish `/terms`, `/privacy`, `/refunds` and visible contact details — payment providers check for these.
- Decide currencies: GHS by default; enable USD if selling to international buyers.
- No-code fallback if activation stalls: Selar (creator storefront popular in West Africa) — link "Buy" buttons to it.

## 7. Forms & spam

Cloudflare Turnstile (free) site key + secret. Honeypot field. Rate limit by IP in the API route.

## 8. Analytics & search

- Enable Vercel Web Analytics + Speed Insights (cookie-free).
- Google Search Console: verify via DNS TXT, submit `/sitemap.xml`. Bing Webmaster Tools: import from GSC.
- Google Business Profile (see SEO.md §5).

## 9. Legal (Ghana)

- Privacy policy covering contact form, newsletter, orders and processors (Vercel, Sanity, Resend, Brevo, Paystack).
- Ghana's Data Protection Act, 2012 (Act 843) applies to processing personal data — check whether the business
  must register with the Data Protection Commission (I'm not a lawyer; confirm locally).
- Cookie banner not needed if you stick to cookie-free analytics and no ad pixels.

## 10. Launch checklist

- [ ] All `{{TODO}}` copy resolved; client signed off content
- [ ] Lighthouse mobile ≥ 90 on Home, a service page, an article, a book page
- [ ] Rich Results Test passes (Organization, Person, Article, Book/Product, FAQ, Breadcrumbs)
- [ ] Contact form → email received; auto-reply received; enquiry visible in Studio
- [ ] Book "Enquire to order" prefills the contact form correctly
- [ ] 404 and error pages styled; redirects apex → www work
- [ ] OG previews checked (WhatsApp, LinkedIn, X)
- [ ] Sitemap submitted to Google + Bing; GBP live
- [ ] SPF/DKIM/DMARC pass (mail-tester.com score ≥ 9)
- [ ] Accounts owned by client; handover doc delivered; Jonathan trained on Studio (30-min walkthrough + Loom)
