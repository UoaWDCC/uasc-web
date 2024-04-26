import AuthService from "business-layer/services/AuthService"
import UserDataService from "data-layer/services/UserDataService"
import { UserRecord } from "firebase-admin/auth"
import { UserSignupBody } from "service-layer/request-models/UserSignupRequests"
import { Body, Controller, Post, Route, SuccessResponse } from "tsoa"

@Route("signup")
export class UserSignup extends Controller {
  @Post()
  @SuccessResponse(200)
  // return a JWT token at the end
  public async signup(@Body() requestBody: UserSignupBody): Promise<string> {
    // create services
    const userService = new UserDataService()
    const authService = new AuthService()

    let user: UserRecord
    console.log(requestBody) // debug
    try {
      // create user in auth service
      // const user = await authService.createUser(requestBody.email)
      user = await authService.createUser(requestBody.email)
      // create user in firestore
      await userService.createUserData(user.uid, requestBody.user)
    } catch (e) {
      console.error(e)
      this.setStatus(400)
      return null
    }

    const membership = requestBody.user.membership
    await authService.setCustomUserClaim(
      user.uid,
      membership === "guest" ? null : membership
    )

    // create jwt token
    let jwtToken: string
    try {
      jwtToken = await authService.createCustomToken(
        user.uid,
        membership === "guest" ? null : { [membership]: true }
      )
    } catch (e) {
      console.error(e)
      this.setStatus(500)
      return null
    }
    this.setStatus(200)
    return jwtToken
  }
}
