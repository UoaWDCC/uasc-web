import { apiVersion, dataset, projectId } from "../env"

/**
 * Workaround function to allow fetching data compatiable with SSG, as the dependencise
 * for client in `client\sanity\lib\client.ts` do not work.
 *
 * @param query the [GROQ query](https://www.sanity.io/docs/query-cheat-sheet) to use
 * @returns
 */
export const sanityQuery = async <T>(query: string) => {
  /**
   * Must be in format [\<projectId\>.api.sanity.io/\<version\>/\<path\>](https://www.sanity.io/docs/http-urls)
   * */
  const url =
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}` as const
  const res = await fetch(url, { method: "GET" })

  return ((await res.json()) as { result: any }).result as T
}
