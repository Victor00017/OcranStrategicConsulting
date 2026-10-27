import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { tagsForDocument } from "@/lib/sanity/tags";

/**
 * Sanity webhook → expire cached content. Configure the webhook (docs/SETUP.md §5) with
 * projection `{_type, "slug": slug.current}` and the secret in SANITY_REVALIDATE_SECRET.
 */
type WebhookPayload = { _type?: string; slug?: string | null };

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Revalidation is not configured" }, { status: 500 });
  }

  try {
    // `true` waits for Content Lake consistency so the refetch sees the new version.
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);
    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type" }, { status: 400 });
    }

    const tags = tagsForDocument({ _type: body._type, slug: body.slug });
    // expire: 0 → the next visit gets fresh content instead of one stale render.
    for (const tag of tags) revalidateTag(tag, { expire: 0 });
    return NextResponse.json({ revalidated: tags });
  } catch {
    // Body is a webhook payload; never echo or log it.
    return NextResponse.json({ message: "Could not parse webhook" }, { status: 400 });
  }
}
