import AuthService from "business-layer/services/AuthService"
import UserDataService from "data-layer/services/UserDataService"
// import { UserSignupBody } from "service-layer/request-models/UserSignupRequests"
import { UserSignupResponse } from "service-layer/response-models/UserSignupResponse"
import { UserSignupBody } from "service-layer/request-models/UserSignupRequests"
import { Body, Controller, Post, Route, SuccessResponse } from "tsoa"
import { parseFirebaseError } from "business-layer/utils/FirebaseErrorParser"

@Route("signup")
export class UserSignup extends Controller {
  /**
   * Signs up a user and creates a user record in the database. Also creates a JWT token for the user in AuthService.
   * @param requestBody - The user's email and their user additional info.
   * @returns The JWT token and the user's UID.
   */
  @Post()
  @SuccessResponse(200, "Signup successful")
  public async signup(
    @Body() requestBody: UserSignupBody
  ): Promise<UserSignupResponse> {
    const userService = new UserDataService()
    const authService = new AuthService()

    // Received userInfo omits stripe_id
    const userInfo = requestBody.user
    let userRecord
    // Seperate try/catch to avoid conflicting emails while creating user.
    try {
      userRecord = await authService.createUser(requestBody.email)
    } catch (e) {
      this.setStatus(409)
      return {
        error: parseFirebaseError(e)
      }
    }

    try {
      await userService.createUserData(userRecord.uid, userInfo)
      // Create a JWT token and return at the end
      const jwtToken = await authService.createCustomToken(
        userRecord.uid,
        undefined
      )
      this.setStatus(200)
      return { jwtToken, uid: userRecord.uid }
    } catch (e) {
      console.error(e)
      this.setStatus(500) // server error
      return { error: parseFirebaseError(e) }
    }
  }
}
