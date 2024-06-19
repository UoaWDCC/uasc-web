import { useAppData } from "store/Store"

/**
 * @returns `true` if a user is logged into the app or not `false` otherwise
 */
export const useIsUserLoggedIn = () => {
  const [{ currentUser }] = useAppData()
  return !!currentUser
}
