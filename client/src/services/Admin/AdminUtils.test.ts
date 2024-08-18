import { compareStrings, replaceUserInPage } from "./AdminUtils"

global.structuredClone = (val) => JSON.parse(JSON.stringify(val))

describe("replaceUserInPage", () => {
  it("should replace the user data correctly", () => {
    const originalUserDataPages = {
      pages: [
        {
          data: [
            { uid: "user1", first_name: "Alice" },
            { uid: "user2", first_name: "Bob" }
          ]
        }
      ]
    }

    const uidToReplace = "user1"
    const keyToReplace = "first_name"
    const valueToReplaceWith = "Eve"

    const updatedUserDataPages = replaceUserInPage<"first_name">(
      originalUserDataPages,
      uidToReplace,
      keyToReplace,
      valueToReplaceWith
    )

    expect(updatedUserDataPages.pages[0].data[0].first_name).toBe(
      valueToReplaceWith
    )

    // Should not mutate original array
    expect(originalUserDataPages).not.toEqual(updatedUserDataPages)
  })
})

describe("compareStrings", () => {
  it("should return a negative value if a is alphabetically less than b", () => {
    expect(compareStrings("abc", "abd")).toBeLessThan(0)
  })

  it("should return a positive value if a is alphabetically more than b", () => {
    expect(compareStrings("abddd", "aaddd")).toBeGreaterThan(0)
  })

  it("should return 0 for equal strings", () => {
    expect(compareStrings("abbb", "abbb")).toEqual(0)
  })

  it("should handle empty strings correctly", () => {
    expect(compareStrings("", "a")).toBeLessThan(0)
    expect(compareStrings("a", "")).toBeGreaterThan(0)
    expect(compareStrings("", "")).toEqual(0)
  })

  it("should handle strings with different cases", () => {
    expect(compareStrings("abc", "ABC")).toBeGreaterThan(0) // Assuming case-sensitive comparison
    expect(compareStrings("ABC", "abc")).toBeLessThan(0) // Assuming case-sensitive comparison
  })

  it("should handle strings with special characters", () => {
    expect(compareStrings("abc!", "abc")).toBeGreaterThan(0)
    expect(compareStrings("abc", "abc!")).toBeLessThan(0)
    expect(compareStrings("abc!", "abc!")).toEqual(0)
  })

  it("should handle strings with numbers", () => {
    expect(compareStrings("abc1", "abc2")).toBeLessThan(0)
    expect(compareStrings("abc2", "abc1")).toBeGreaterThan(0)
    expect(compareStrings("abc1", "abc1")).toEqual(0)
  })

  it("should handle strings with spaces", () => {
    expect(compareStrings("abc ", "abc")).toBeGreaterThan(0)
    expect(compareStrings("abc", "abc ")).toBeLessThan(0)
    expect(compareStrings("abc ", "abc ")).toEqual(0)
  })

  it("should handle strings with different lengths", () => {
    expect(compareStrings("abc", "abcd")).toBeLessThan(0)
    expect(compareStrings("abcd", "abc")).toBeGreaterThan(0)
  })
})
