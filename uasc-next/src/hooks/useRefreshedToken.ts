import { useAppData } from "@/store/Store"
import { useUserLoggedInCallback } from "./useUserLoggedInCallback"

/**
 * Used to force refresh a user token, on first render of the hook
 *
 * The use case is for when custom claims change and need to be reflected
 *
 * @example useForceRefreshToken()
 */
export const useForceRefreshToken = () => {
  const [, { refreshUserToken }] = useAppData()
  /*
   * Refresh the token on **First** page load only
   * in case they try to navigate to this page right
   * after signing up
   */
  useUserLoggedInCallback(() => refreshUserToken())
}
