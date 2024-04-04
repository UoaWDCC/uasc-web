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
    const userService = new UserDataService()
    const authService = new AuthService()
    let user: UserRecord
    try {
      user = await authService.createUser(requestBody.email)
    } catch (e) {
      console.error(e)
      this.setStatus(400)
      return null
    }
    // check for a conflicting uid, status 409
    if (await userService.userDataExists(user.uid)) return this.setStatus(409)

    await userService.createUserData(user.uid, requestBody.user)
    this.setStatus(200)
    return null
  }
}
