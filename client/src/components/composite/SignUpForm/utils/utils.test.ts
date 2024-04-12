import { oneLevelUp } from "./Utils"

describe("utils", () => {
  it("should return the correct path", () => {
    expect(oneLevelUp("my_route")).toEqual("../my_route")
  })
})
