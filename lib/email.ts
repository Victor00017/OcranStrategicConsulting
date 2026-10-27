/**
 * Outgoing email via Resend's REST API — no SDK (D-028).
 * Until the client has a mail domain, the sender is Resend's shared `onboarding@resend.dev`, which may
 * only send to the Resend account owner's address: sign up with the consultant's address and set
 * CONTACT_TO_EMAIL to it. Set EMAIL_FROM once a domain is verified.
 */
const RESEND_URL = "https://api.resend.com/emails";
const DEFAULT_FROM = "Ocran Strategic Consulting website <onboarding@resend.dev>";

export type Email = { to: string; subject: string; text: string; html: string; replyTo?: string };

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

/** Sends one email. Returns false (never throws) so callers can show a friendly fallback. */
export async function sendEmail(email: Email): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || DEFAULT_FROM,
        to: [email.to],
        subject: email.subject,
        text: email.text,
        html: email.html,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escape user input before it goes into an HTML email. */
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c);
