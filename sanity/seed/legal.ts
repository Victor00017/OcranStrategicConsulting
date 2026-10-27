import { toBlocks } from "./blocks";

/**
 * DRAFT legal text (D-029) — plain language, written to match what the site actually does (D-028 contact
 * form via Resend, cookie-free Vercel analytics, Sanity for content only). Not legal advice: the client
 * should have it reviewed, ideally by a Ghanaian lawyer, before launch (PROGRESS "Content TODOs").
 */

const LAST_UPDATED = "2026-10-27";

export const LEGAL_PAGES = [
  {
    slug: "privacy",
    title: "Privacy notice",
    lastUpdated: LAST_UPDATED,
    body: toBlocks([
      {
        text: 'This notice explains what personal information Ocran Strategic Consulting ("we"), based in Tema, Greater Accra, Ghana, collects through this website, why, and the choices you have.',
      },
      { style: "h2", text: "What we collect" },
      {
        bullet: true,
        text: "When you use our contact form: your name, email address, phone number (if you give it), the service you are interested in and your message.",
      },
      {
        bullet: true,
        text: "When you visit the website: anonymous visitor statistics and page-speed measurements. These do not use cookies and do not identify you.",
      },
      {
        text: "We do not use advertising or tracking cookies, and we do not ask for more information than we need to reply to you.",
      },
      { style: "h2", text: "How we use it" },
      {
        text: "We use the details you send through the contact form to reply to your enquiry and, if you become a client, to provide our services. We do not sell your information or use it for marketing without your agreement.",
      },
      { style: "h2", text: "Who helps us process it" },
      {
        bullet: true,
        text: "Vercel hosts this website and provides the anonymous visitor statistics.",
      },
      {
        bullet: true,
        text: "Resend delivers the messages you send through the contact form to our inbox.",
      },
      {
        bullet: true,
        text: "Sanity stores the website's content. It does not receive the messages you send us.",
      },
      {
        text: "These providers may process information on servers outside Ghana. We use them only for the purposes described here.",
      },
      { style: "h2", text: "How long we keep it" },
      {
        text: "We keep enquiry emails for as long as we need them to deal with your enquiry and any work that follows, and then delete them.",
      },
      { style: "h2", text: "Your rights" },
      {
        text: "Under Ghana's Data Protection Act, 2012 (Act 843), you can ask to see the personal information we hold about you, ask us to correct or delete it, and object to how we use it. To make a request, contact us through our contact page.",
      },
      { style: "h2", text: "Security" },
      {
        text: "This website uses encrypted (HTTPS) connections, and access to the messages you send us is limited to the people who need it to reply.",
      },
      { style: "h2", text: "Changes to this notice" },
      {
        text: "If we change how we handle personal information, we will update this notice and the date at the top of the page.",
      },
    ]),
  },
  {
    slug: "terms",
    title: "Terms of use",
    lastUpdated: LAST_UPDATED,
    body: toBlocks([
      {
        text: "These terms apply to your use of this website, operated by Ocran Strategic Consulting, Tema, Greater Accra, Ghana. By using the website you accept them.",
      },
      { style: "h2", text: "Information on this website" },
      {
        text: "The content of this website is general information about our services. It is not professional advice for your particular situation. The scope, fees and terms of any engagement are agreed in writing before work starts.",
      },
      {
        text: "We take care to keep the information accurate and up to date, but we cannot guarantee that it is complete or current at all times.",
      },
      { style: "h2", text: "Intellectual property" },
      {
        text: "Unless stated otherwise, the text, images, logo and other material on this website belong to Ocran Strategic Consulting. You may link to the website and quote short passages with a clear acknowledgement. Please ask us before reproducing material for any other purpose.",
      },
      { style: "h2", text: "Links to other websites" },
      {
        text: "Links to other websites are provided for convenience. We are not responsible for their content or how they handle your information.",
      },
      { style: "h2", text: "Liability" },
      {
        text: "To the extent permitted by law, we are not liable for any loss that results from relying on the general information on this website.",
      },
      { style: "h2", text: "Governing law" },
      { text: "These terms are governed by the laws of the Republic of Ghana." },
      { style: "h2", text: "Changes and contact" },
      {
        text: "We may update these terms from time to time; the date at the top of the page shows the latest version. If you have a question about them, contact us through our contact page.",
      },
    ]),
  },
];
