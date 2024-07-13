import { apiVersion, dataset, projectId } from "../env"

/**
 * Workaround function to allow fetching data compatiable with SSG, as the dependencise
 * for client in `client\sanity\lib\client.ts` do not work.
 *
 * @param query the [GROQ query](https://www.sanity.io/docs/query-cheat-sheet) to use
 * @returns
 */
export const sanityQuery = async <T>(query: string) => {
  const res = await fetch(
    `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${query}`
  )
  return JSON.parse(await res.json()) as T
}
