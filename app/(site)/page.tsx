import { HomeView } from "@/components/sections/home-view";
import { getHomeContent } from "@/lib/content/home";
import { buildMetadata } from "@/lib/seo";

// Keyword title for the home page (D-031); the tagline stays the H1. Description built only from brief
// facts (location + service lines); the client should approve both (PROGRESS "Content TODOs").
export const metadata = buildMetadata({
  fullTitle: "Ocran Strategic Consulting | Agribusiness Consultants, Ghana",
  description:
    "Strategy, agribusiness and livestock advisory, SME growth, fundraising, policy research and training from Tema, Ghana, for clients across Sub-Saharan Africa.",
  path: "/",
});

export default async function Home() {
  const content = await getHomeContent();
  return <HomeView content={content} />;
}
