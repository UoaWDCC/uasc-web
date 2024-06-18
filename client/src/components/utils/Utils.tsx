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
export const isSingleFridayOrSaturday = (startDate: Date, endDate: Date) => {
  const FRIDAY = 5
  const SATURDAY = 6
  const dateArray = datesToDateRange(startDate, endDate)
  return (
    dateArray.length === 1 && [FRIDAY, SATURDAY].includes(dateArray[0].getDay())
  )
}

export const datesToDateRange = (startDate: Date, endDate: Date) => {
  const dateArray = []
  const currentDate = new Date(startDate)

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate))
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + 1)
  }
  return dateArray
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

export const formatInputDateIntoUTC = (d: Date) => {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
}

export const UTCStringToLocal = (utcString: string) => {
  if (!utcString.endsWith("Z")) {
    throw new Error("utcString is not a valid UTC string")
  }

  return new Date(utcString.slice(0, -1))
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
