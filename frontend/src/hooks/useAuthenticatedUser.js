import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

/**
 * Retrieves the currently authenticated user to the Firebase app, if it exists.
 * @returns User The currently authenticated user object.
 */
export function useAuthenticatedUser() {
  const [user] = useAuthState(auth)
  const [userMetadata, setUserData] = useState(undefined)

  useEffect(() => {
    const getUserData = async () => {
      const userMetadata = await getDoc(doc(db, "users", user.uid))
      if (userMetadata.exists()) {
        setUserData(userMetadata.data())
      }
    }

    user ? getUserData() : setUserData(undefined)
  }, [user])

  return [user, userMetadata]
}
