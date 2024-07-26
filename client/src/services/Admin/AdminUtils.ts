import { CombinedUserData } from "@/models/User"

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
