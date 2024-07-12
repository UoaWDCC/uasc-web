import { oneLevelUp, useCurrentStep } from "./Utils"
import { renderHook } from "@testing-library/react"
import { PAGES } from "./RouteNames"

describe("level up function", () => {
  it("should return the correct path", () => {
    expect(oneLevelUp("my_route")).toEqual("/register/my_route")
  })
})

describe("route validator", () => {
  it("should return unknown value for bad routes", () => {
    const { result } = renderHook(useCurrentStep)

    expect(result.current).toEqual(PAGES.Unknown)
  })

  it("should return a known value for a good route", () => {
    const { result } = renderHook(() => useCurrentStep)
    expect(result.current).not.toEqual(PAGES.Unknown)
  })
})
