import createImageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"

import { dataset, projectId } from "../env"

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || ""
})

/**
 * @deprecated only for use on client components
 */
export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto("format").fit("max").url()
}
