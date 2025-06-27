import type { CombinedUserData } from "@/models/User"

/**
 * @deprecated only for internal use in `AdminMutations`
 * @param userDataPages pages returned by `useInfiniteQuery`
 * @param uidToReplace the uid of the user whose data to replace
 * @param keyToReplace a valid key of the data type `CombinedUserData`
 * @param valueToReplaceWith new value of the uier to update
 * @returns a **copy** of the user data pages with the updated value
 */
export function replaceUserInPage<T extends keyof CombinedUserData>(
  userDataPages: {
    pages: Array<{ data: Pick<CombinedUserData, T | "uid">[] }>
  },
  uidToReplace: string,
  keyToReplace: T,
  valueToReplaceWith: CombinedUserData[T]
) {
  const updatedUserDataPages = structuredClone(userDataPages)
  updatedUserDataPages.pages.forEach((page, i) => {
    page.data.forEach((user, j) => {
      if (user.uid === uidToReplace)
        updatedUserDataPages.pages[i].data[j] = {
          ...user,
          [keyToReplace]: valueToReplaceWith
        }
    })
  })
  return updatedUserDataPages
}

/**
 * Determines the order for strings when using the `sort` methods on an array
 *
 * **This is a case sensitive operation**
 *
 * @param a the first string to compare against
 * @param b the second string to compare against
 *
 * @returns a **negative** number if `a` comes _before_ `b` alphabetically
 * @returns a **positive** number if `a` comes _after_ `b` alphabetically
 * @returns `0` if `a` and `b` are equal strings
 */
export function compareStrings(a: string, b: string) {
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  } else {
    return 0
  }
}
