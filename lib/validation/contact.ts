/**
 * Contact form rules (D-028): name, email and message required; phone and service optional.
 * Pure and dependency-free so the server action and the tests share exactly one definition.
 */

export type ContactField = "name" | "email" | "phone" | "service" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const LIMITS = { name: 100, email: 200, phone: 25, message: 5000, messageMin: 10 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Digits with optional +, spaces, dashes, dots and brackets: "+233 20 000 0000", "(020) 000-0000".
const PHONE = /^\+?[\d\s().-]{7,25}$/;

const text = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
};

/** Reads the form. `honeypot` is true when the hidden "website" field was filled — a bot. */
export function readContactForm(form: FormData): { values: ContactValues; honeypot: boolean } {
  return {
    values: {
      name: text(form, "name"),
      email: text(form, "email"),
      phone: text(form, "phone"),
      service: text(form, "service"),
      message: text(form, "message"),
    },
    honeypot: text(form, "website") !== "",
  };
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name) errors.name = "Please enter your name.";
  else if (values.name.length > LIMITS.name) errors.name = "Please shorten your name.";

  if (!values.email) errors.email = "Please enter your email address.";
  else if (values.email.length > LIMITS.email || !EMAIL.test(values.email))
    errors.email = "Please enter a valid email address, like name@example.com.";

  if (values.phone && !PHONE.test(values.phone))
    errors.phone = "Please enter a valid phone number, like +233 20 000 0000.";

  if (!values.message) errors.message = "Please tell us a little about what you need.";
  else if (values.message.length < LIMITS.messageMin)
    errors.message = "Please add a little more detail (at least 10 characters).";
  else if (values.message.length > LIMITS.message)
    errors.message = "Please keep your message under 5,000 characters.";

  return errors;
}
