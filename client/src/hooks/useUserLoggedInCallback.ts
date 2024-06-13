import { useEffect } from "react"
import { useIsUserLoggedIn } from "./useIsUserLoggedIn"

/**
 * @param callback to be called when the user is logged in
 * (i.e goes from a logged out state to a logged in one)
 *
 * @example useUserLoggedIn(() => PerformLoginSetup)
 */
export const useUserLoggedInCallback = (callback: () => void) => {
  const loggedIn = useIsUserLoggedIn()

  /**
   * Only performed the first time the user logs in when the hook is rendered
   */
  useEffect(() => {
    if (loggedIn) callback()
  }, [loggedIn])
}
