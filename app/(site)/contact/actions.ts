"use server";

import { headers } from "next/headers";
import { getServices } from "@/lib/content/services";
import { emailConfigured, escapeHtml, sendEmail } from "@/lib/email";
import { createRateLimiter } from "@/lib/rate-limit";
import {
  readContactForm,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/validation/contact";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; errors?: ContactErrors; values: ContactValues };

const allow = createRateLimiter({ limit: 5, windowMs: 60 * 60 * 1000 });

// Logs carry an event id and outcome only — never names, emails or messages (AGENTS.md §5).
const log = (outcome: string) => console.info(`contact ${crypto.randomUUID()} ${outcome}`);

/**
 * Contact form handler (D-028): honeypot → rate limit → validate → email the consultant with the
 * enquirer as reply-to. Works without JavaScript (plain form POST to a server action).
 */
export async function submitContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  const { values, honeypot } = readContactForm(form);

  // Bots get a normal-looking success so they don't learn to skip the trap.
  if (honeypot) {
    log("honeypot");
    return { status: "success" };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allow(ip)) {
    log("rate-limited");
    return {
      status: "error",
      message: "You've sent several messages in a short time. Please try again in an hour.",
      values,
    };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  if (!emailConfigured()) {
    log("not-configured");
    return {
      status: "error",
      message: "Our contact form isn't available right now. Please try again later.",
      values,
    };
  }

  // Only accept a service that exists; anything else is treated as a general enquiry.
  const services = await getServices();
  const service = services.find((s) => s.slug === values.service);

  const sent = await sendEmail({
    to: process.env.CONTACT_TO_EMAIL as string,
    replyTo: values.email,
    subject: `New enquiry — ${service?.title ?? "General"}`,
    text: enquiryText(values, service?.title),
    html: enquiryHtml(values, service?.title),
  });
  log(sent ? "sent" : "send-failed");

  return sent
    ? { status: "success" }
    : {
        status: "error",
        message:
          "Sorry — your message couldn't be sent just now. Please try again in a few minutes.",
        values,
      };
}

function rows(values: ContactValues, serviceTitle?: string) {
  return [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone || "—"],
    ["Service", serviceTitle ?? "General enquiry"],
  ] as const;
}

function enquiryText(values: ContactValues, serviceTitle?: string) {
  return [
    "New enquiry from the website.",
    "",
    ...rows(values, serviceTitle).map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    values.message,
    "",
    "Reply to this email to answer the enquirer directly.",
  ].join("\n");
}

function enquiryHtml(values: ContactValues, serviceTitle?: string) {
  const table = rows(values, serviceTitle)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#5c564c">${label}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:system-ui,sans-serif;color:#1c1a17;line-height:1.6">
<p style="color:#7d5719;letter-spacing:.15em;text-transform:uppercase;font-size:12px">New enquiry from the website</p>
<table>${table}</table>
<p style="margin-top:20px;color:#5c564c">Message</p>
<p style="white-space:pre-wrap">${escapeHtml(values.message)}</p>
<p style="margin-top:24px;color:#5c564c;font-size:13px">Reply to this email to answer the enquirer directly.</p>
</div>`;
}
