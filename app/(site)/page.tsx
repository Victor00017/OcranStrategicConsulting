import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buildMetadata, TAGLINE } from "@/lib/seo";

// Home uses the plain site name as its title (root layout default). The description is the
// client's tagline until real home copy arrives in build step 4 (see PROGRESS "Content TODOs").
export const metadata = buildMetadata({ description: TAGLINE, path: "/" });

export default function Home() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col justify-center py-16 md:py-28">
        <Eyebrow>Ocran Strategic Consulting</Eyebrow>
        <h1 className="font-display text-ink mt-4 max-w-[18ch] text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] font-medium text-balance">
          Transforming Businesses. Advancing Agriculture.
        </h1>
        <p className="text-ink-muted mt-6 max-w-[68ch] text-[clamp(1.0625rem,2vw,1.125rem)]">
          Placeholder home page — base layout is in place. Real sections arrive in build step 4.
        </p>
      </div>
    </Container>
  );
}
