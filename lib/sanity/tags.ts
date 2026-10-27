/**
 * Cache tags shared by content fetches and the /api/revalidate webhook.
 * Fetch a list with `typeTag(type)`; fetch one page with both `typeTag` and `docTag`.
 */
export const typeTag = (type: string) => type;
export const docTag = (type: string, slug: string) => `${type}:${slug}`;

/** Tags to expire when a document changes. The type tag covers lists, cards and singletons. */
export function tagsForDocument({ _type, slug }: { _type: string; slug?: string | null }) {
  return slug ? [typeTag(_type), docTag(_type, slug)] : [typeTag(_type)];
}
