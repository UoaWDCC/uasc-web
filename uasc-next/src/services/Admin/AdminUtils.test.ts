import { replaceUserInPage } from "./AdminUtils"

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
