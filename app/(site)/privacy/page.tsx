import { notFound } from "next/navigation";
import { LegalView } from "@/components/sections/legal-view";
import { getLegalPage } from "@/lib/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy notice",
  description:
    "How Ocran Strategic Consulting collects and uses personal information on this website, who processes it, and your rights under Ghana's Data Protection Act.",
  path: "/privacy",
});

export default async function Page() {
  const page = await getLegalPage("privacy");
  if (!page) notFound();
  return <LegalView page={page} />;
}
