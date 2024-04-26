import AuthService from "business-layer/services/AuthService"
import { UserAdditionalInfo } from "data-layer/models/firebase"
import UserDataService from "data-layer/services/UserDataService"
import { UserSignupBody } from "service-layer/request-models/UserSignupRequests"
import { Body, Controller, Post, Route, SuccessResponse } from "tsoa"

@Route("signup")
export class UserSignup extends Controller {
  @Post()
  @SuccessResponse(200, "Signup successful")
  // return a JWT token at the end
  public async signup(@Body() requestBody: UserSignupBody): Promise<string> {
    const userService = new UserDataService()
    const authService = new AuthService()

    // Omit membership to avoid users from creating an account with admin
    const userInfo: Omit<UserAdditionalInfo, "membership"> = requestBody.user

    try {
      // Create user data in Auth Service
      const uid = (await authService.createUser(requestBody.email)).uid
      // Create document with user info
      await userService.createUserData(uid, {
        ...userInfo,
        membership: "guest" // set membership to guest
      })
      // Create a JWT token and return at the end
      const jwtToken = await authService.createCustomToken(uid, undefined)
      this.setStatus(200)
      return jwtToken
    } catch (error) {
      console.error(error)
      this.setStatus(500) // server error
      return ""
    }
  }
}
