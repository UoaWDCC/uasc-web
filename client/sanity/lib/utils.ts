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
 * Class representing a URL for a Sanity image with various utility methods
 * to manipulate the URL by appending query parameters.
 */
export class SanityImageUrl {
  private url: URL

  /**
   * Creates an instance of SanityImageUrl.
   *
   * @param url - The original Sanity image URL **without** any query parameters attached.
   * @throws {TypeError} If the provided URL is invalid.
   */
  constructor(url: string) {
    this.url = new URL(url)
  }

  /**
   * Appends the `auto=format` query parameter to the URL.
   *
   * This is used to [get the image in webp form](https://www.sanity.io/answers/optimizing-image-file-sizes-in-studio-and-using-url-parameters-for-width-and-format-)
   *
   * **Note:** This method **must** only be called once.
   */
  public autoFormat() {
    this.url.searchParams.append("auto", "format")
    return this
  }

  /**
   * Appends the height query parameter to the URL.
   *
   * @param h - The height in pixels to set the image to.
   */
  public height(h: number) {
    this.url.searchParams.append("h", h.toString())
    return this
  }

  /**
   * Appends the width query parameter to the URL.
   *
   * @param w - width height in pixels to set the image to.
   */
  public width(w: number) {
    this.url.searchParams.append("w", w.toString())
    return this
  }

  /**
   * Returns the string representation of the URL, including any modifications made.
   *
   * @returns {string} The modified URL as a string.
   */
  public toString(): string {
    return this.url.toString()
  }
}
