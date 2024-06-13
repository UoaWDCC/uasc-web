import { RefObject, useEffect } from "react"
import { MS_IN_SECOND } from "utils/Constants"

export const debounce = (fn: (...args: any[]) => void, timeout: number) => {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}

/**
 * @param timestamp any object that contains the `seconds` and `nanosecond` properties,
 * like the timestamp from `firebase`
 * @returns a date object representative of the timestamp
 */
export const timestampToDate = (timestamp: {
  seconds: number
  nanoseconds: number
}) => {
  return new Date(timestamp.seconds * MS_IN_SECOND)
}

/**
 * @param date a date object
 * @returns a date string in the nz format `dd-mm-yyyy`
 */
export const formattedNzDate = (date: Date) => date.toLocaleDateString("en-NZ")

/**
 * This Hook can be used for detecting clicks outside the Opened Menu
 * https://stackoverflow.com/a/63359693
 *
 * @example
 * ```tsx
 * myRef = useRef<HTMLDivElement>(null)
 * useClickOutside(myRef, () => {closeSomething()})
 * // ...
 * return <div ref={myRef}></div>
 * ```
 */
export const useClickOutside = (
  ref: RefObject<HTMLDivElement>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside()
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, onClickOutside])
}
