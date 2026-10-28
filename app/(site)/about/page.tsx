import { AboutView } from "@/components/sections/about-view";
import { getAbout } from "@/lib/content/about";
import { buildMetadata } from "@/lib/seo";

// Description from the client's company story and Detailed Profile (facts only).
export const metadata = buildMetadata({
  title: "About Jonathan Nyarko Ocran",
  description:
    "Ocran Strategic Consulting, Tema, Ghana, is led by Jonathan Nyarko Ocran, Chartered Management Consultant with 35+ years in agriculture and livestock strategy.",
  path: "/about",
});

export default async function AboutPage() {
  const content = await getAbout();
  return <AboutView content={content} />;
}
