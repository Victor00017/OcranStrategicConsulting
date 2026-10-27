import { notFound } from "next/navigation";
import { LegalView } from "@/components/sections/legal-view";
import { getLegalPage } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of use",
  description:
    "The terms that apply when you use the Ocran Strategic Consulting website: the information we publish, intellectual property, links, liability and Ghanaian law.",
  path: "/terms",
});

export default async function Page() {
  const page = await getLegalPage("terms");
  if (!page) notFound();
  return <LegalView page={page} />;
}
