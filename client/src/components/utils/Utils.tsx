import { type RefObject, useEffect } from "react"

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
