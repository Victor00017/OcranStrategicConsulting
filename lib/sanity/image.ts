import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

type ImageSource = Parameters<typeof builder.image>[0];

/** Sanity CDN URL for an image. Always set a width; format is negotiated (AVIF/WebP) via auto("format"). */
export function urlForImage(source: ImageSource, width: number) {
  return builder.image(source).width(width).auto("format").url();
}
