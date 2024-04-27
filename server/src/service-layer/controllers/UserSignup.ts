import AuthService from "business-layer/services/AuthService"
import UserDataService from "data-layer/services/UserDataService"
import { UserSignupBody } from "service-layer/request-models/UserSignupRequests"
import { UserSignupResponse } from "service-layer/response-models/UserSignupResponse"
import { Body, Controller, Post, Route, SuccessResponse } from "tsoa"

@Route("signup")
export class UserSignup extends Controller {
  @Post()
  @SuccessResponse(200, "Signup successful")
  // return a JWT token at the end
  public async signup(
    @Body() requestBody: UserSignupBody
  ): Promise<UserSignupResponse> {
    const userService = new UserDataService()
    const authService = new AuthService()

    // Received userInfo omits membership and stripe_id
    const userInfo = requestBody.user

    try {
      // Create user data in Auth Service
      const userRecord = await authService.createUser(requestBody.email)
      // Create document with user info
      await userService.createUserData(userRecord.uid, {
        ...userInfo,
        membership: "guest" // set membership to guest
      })
      // Create a JWT token and return at the end
      const jwtToken = await authService.createCustomToken(
        userRecord.uid,
        undefined
      )
      this.setStatus(200)
      return { jwtToken, uid: userRecord.uid }
    } catch (error) {
      console.error(error)
      this.setStatus(500) // server error
      return {
        jwtToken: null,
        uid: null
      }
    }
  }
}
