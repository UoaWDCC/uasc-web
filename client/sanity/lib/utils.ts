import { apiVersion, dataset, projectId } from "../env"

/**
 * Must be in format [\<projectId\>.api.sanity.io/\<version\>/\<path\>](https://www.sanity.io/docs/http-urls)
 * */
type SanityHttpQueryEndpoint =
  `https://${string}.api.sanity.io/v${string}/data/query/${string}?query=${string}`

/**
 * Workaround function to allow fetching data compatiable with SSG, as the dependencise
 * for client in `client\sanity\lib\client.ts` do not work.
 *
 * @param query the [GROQ query](https://www.sanity.io/docs/query-cheat-sheet) to use
 * @returns the data specified as type T
 * @example const movies = await sanityQuery<Movie[]>(`*[_type == "movie"]`)
 */
export const sanityQuery = async <T>(query: string) => {
  const url: SanityHttpQueryEndpoint =
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}` as const
  const res = await fetch(url, { method: "GET" })

  return ((await res.json()) as { result: any }).result as T
}

/**
 * @param url the original sanity image URL **without** any query params attached
 *
 * @returns a image `src` with the `format=auto` query appended
 */
export const autoFormatSanityImageSrc = (url: string) =>
  `${url}?format=auto` as const
