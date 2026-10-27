import { HomeView } from "@/components/sections/home-view";
import { getHomeContent } from "@/lib/content/home";
import { buildMetadata } from "@/lib/seo";

// Home keeps the plain site name as its title (root layout default). Description built only from
// brief facts (location + service lines); the client should approve it (PROGRESS "Content TODOs").
export const metadata = buildMetadata({
  description:
    "Strategy, agribusiness and livestock advisory, SME growth, fundraising, policy research and training from Tema, Ghana, for clients across Sub-Saharan Africa.",
  path: "/",
});

export default async function Home() {
  const content = await getHomeContent();
  return <HomeView content={content} />;
}
