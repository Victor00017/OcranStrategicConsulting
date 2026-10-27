"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact, type ContactState } from "@/app/(site)/contact/actions";
import { Button } from "@/components/ui/button";
import { LIMITS, type ContactField } from "@/lib/validation/contact";

type Option = { slug: string; title: string };

const field =
  "bg-paper border-line text-ink focus-visible:outline-gold-text mt-2 block w-full rounded-[2px] border px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-1 aria-[invalid=true]:border-error";
const label = "text-ink block font-medium";

/**
 * Contact form (D-028). Plain <form action> on a server action, so it also submits without JavaScript;
 * with JS it shows a pending state, inline errors and a success message without a reload.
 * Labels are always visible (DESIGN.md §7); errors are tied to fields with aria-describedby.
 */
export function ContactForm({
  services,
  defaultService,
}: {
  services: Option[];
  defaultService?: string;
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitContact, {
    status: "idle",
  });
  const statusRef = useRef<HTMLDivElement>(null);

  // Move focus to the outcome so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="bg-paper border-line rounded-[2px] border p-8 outline-none"
      >
        <span aria-hidden="true" className="bg-gold block h-0.5 w-16" />
        <h2 className="font-display text-ink mt-6 text-[2rem] leading-tight font-medium">
          Thank you — your message is on its way.
        </h2>
        <p className="text-ink-muted mt-4 max-w-[52ch]">
          We&rsquo;ll reply to the email address you gave us. If your enquiry is urgent, please
          mention it when we get in touch.
        </p>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : undefined;
  const errors = state.status === "error" ? (state.errors ?? {}) : {};
  const errorProps = (name: ContactField) =>
    errors[name]
      ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` }
      : { "aria-invalid": false as const };
  const errorText = (name: ContactField) =>
    errors[name] ? (
      <p id={`${name}-error`} className="text-error mt-2 text-sm">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form action={action} className="flex flex-col gap-6">
      {state.status === "error" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border-error text-error bg-paper rounded-[2px] border-l-2 px-4 py-3 outline-none"
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name <span className="text-ink-muted font-normal">(required)</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            defaultValue={values?.name}
            className={field}
            {...errorProps("name")}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email <span className="text-ink-muted font-normal">(required)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            defaultValue={values?.email}
            className={field}
            {...errorProps("email")}
          />
          {errorText("email")}
        </div>
        <div>
          <label htmlFor="phone" className={label}>
            Phone <span className="text-ink-muted font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+233 20 000 0000"
            maxLength={LIMITS.phone}
            defaultValue={values?.phone}
            className={field}
            {...errorProps("phone")}
          />
          {errorText("phone")}
        </div>
        <div>
          <label htmlFor="service" className={label}>
            Service of interest <span className="text-ink-muted font-normal">(optional)</span>
          </label>
          <select
            id="service"
            name="service"
            defaultValue={values?.service ?? defaultService ?? ""}
            className={field}
          >
            <option value="">General enquiry</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          How can we help? <span className="text-ink-muted font-normal">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          minLength={LIMITS.messageMin}
          maxLength={LIMITS.message}
          defaultValue={values?.message}
          className={`${field} resize-y`}
          {...errorProps("message")}
        />
        {errorText("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped (D-028). */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>
          {pending ? "Sending…" : "Send message"}
        </Button>
        <p className="text-ink-muted text-sm">We use your details only to reply to this enquiry.</p>
      </div>
    </form>
  );
}
