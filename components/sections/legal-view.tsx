import { Container } from "@/components/ui/container";
import { formatDate } from "@/lib/format";
import type { LegalPage } from "@/lib/content/legal";
import { PageHeader } from "./page-header";
import { Prose } from "./prose";

/** /privacy and /terms: header with the last-updated date, then the text at reading width. */
export function LegalView({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={page.title}
        intro={`Last updated ${formatDate(page.lastUpdated)}`}
      />
      <Container className="py-16 md:py-24">
        <Prose value={page.body} />
      </Container>
    </>
  );
}
