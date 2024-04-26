import AuthService from "business-layer/services/AuthService"
import UserDataService from "data-layer/services/UserDataService"
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

    let uid: string
    console.log("UserSignup route DEBUG: ")
    console.log(requestBody) // debug
    try {
      // create user in auth service
      // const user = await authService.createUser(requestBody.email)
      const { uid } = await authService.createUser(requestBody.email)
      // create user in firestore
      await userService.createUserData(uid, requestBody.user)
    } catch (e) {
      console.log(e)
      this.setStatus(400)
    }

    // create jwt token
    let jwtToken: string
    try {
      jwtToken = await authService.createCustomToken(uid, undefined)
    } catch (e) {
      console.error(e)
      this.setStatus(500)
      return null
    }
    this.setStatus(200)
    return jwtToken
  }
}
