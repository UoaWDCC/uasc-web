import { oneLevelUp, useCurrentStep } from "./Utils"
import { renderHook } from "@testing-library/react"
import { PAGES, PERSONAL_ROUTE_1 } from "./RouteNames"

describe("level up function", () => {
  it("should return the correct path", () => {
    expect(oneLevelUp("my_route")).toEqual("/register/my_route")
  })
})

describe("route validator", () => {
  it("should return unknown value for bad routes", () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
      useParams: () => ({
        step: "garbage"
      })
    }))
    const { result } = renderHook(useCurrentStep)

    expect(result.current).toEqual(PAGES.Unknown)
  })

  it("should return a known value for a good route", () => {
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
      useParams: () => ({
        step: PERSONAL_ROUTE_1
      })
    }))
    const { result } = renderHook(() => useCurrentStep)
    expect(result.current).not.toEqual(PAGES.Unknown)
  })
})
