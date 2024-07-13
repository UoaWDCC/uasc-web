import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

/**
 * @deprecated do not use on server components, use `sanityQuery` instead (`client\sanity\lib\utils.ts`)
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published"
})
