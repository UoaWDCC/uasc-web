import * as express from "express"
import auth from "./FirebaseAuth"

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
) {
  if (securityName === "jwt") {
    const authHeader = String(request.headers.authorization || "")

    return new Promise((resolve, reject) => {
      if (!authHeader.startsWith("Bearer ")) {
        reject(new Error("No token provided"))
      }

      const token = authHeader.split(" ")[1] // Gets part after Bearer

      auth
        .verifyIdToken(token)
        .then((decodedToken) => {
          const { uid } = decodedToken
          auth.getUser(uid).then((user) => {
            for (const scope of scopes!) {
              if (!user.customClaims![scope]) {
                reject(new Error("No scope"))
              }
            }
            resolve(user)
          })
        })
        .catch((reason) => {
          console.error(reason)
          reject(new Error("Invalid token"))
        })
    })
  }
  return Promise.reject(new Error("Unknown Error"))
}
