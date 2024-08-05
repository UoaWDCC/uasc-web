import { useUsersQuery } from "@/services/Admin/AdminQueries"
import { useEffect, useMemo } from "react"

/**
 * A wrapper hook for {@link useUsersQuery} to be used by consumers which
 * require all of the user data, and do not care about manually fetching
 *
 * @example
 * const {users, stillLoadingUsers} = useAllUsers()
 *
 * if(!stillLoadingUsers){
 *     performFunctionRequiringAllUsers(users)
 * }
 */
export default function useAllUsers() {
  const {
    data: userPages,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useUsersQuery()

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, isFetchingNextPage, hasNextPage])

  const users = useMemo(
    () => userPages?.pages.flatMap((page) => page.data || []),
    [userPages]
  )

  return { users, stillLoadingUsers: hasNextPage }
}
