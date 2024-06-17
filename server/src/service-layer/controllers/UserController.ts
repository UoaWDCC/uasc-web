import UserDataService from "data-layer/services/UserDataService"
import AuthService from "business-layer/services/AuthService"
import {
  EditSelfRequestBody,
  SelfRequestModel,
  EditSelfRequestModel,
  DeleteUserRequestBody
} from "service-layer/request-models/UserRequests"
import { CommonResponse } from "service-layer/response-models/CommonResponse"
import {
  Body,
  Controller,
  Get,
  Route,
  Security,
  SuccessResponse,
  Request,
  Patch,
  Delete
} from "tsoa"

@Route("users")
export class UsersController extends Controller {
  @SuccessResponse("200", "Fetched self data")
  @Security("jwt")
  @Get("self")
  public async getSelf(@Request() request: SelfRequestModel) {
    const data = await new UserDataService().getUserData(request.user.uid)

    // Don't want users editing this
    delete data.stripe_id

    if (data !== undefined) {
      this.setStatus(200)
    } else {
      this.setStatus(404)
    }

    return data
  }

  @SuccessResponse("200", "Successful edit")
  @Security("jwt")
  @Patch("edit-self")
  public async editSelf(
    @Request() request: EditSelfRequestModel,
    @Body() requestBody: EditSelfRequestBody
  ): Promise<void> {
    try {
      await new UserDataService().editUserData(
        request.user.uid,
        requestBody.updatedInformation
      )
      this.setStatus(200)
    } catch (error) {
      console.error(error)
      this.setStatus(401)
    }
  }

  @SuccessResponse("200", "Deleted user")
  @Security("jwt", ["admin"])
  @Delete("delete-user")
  public async deleteUser(
    @Body() requestBody: DeleteUserRequestBody
  ): Promise<CommonResponse | void> {
    try {
      const userUid = requestBody.uid
      if (userUid) {
        const authService = new AuthService()
        const userDataService = new UserDataService()

        const userClaims = await authService.getCustomerUserClaim(userUid)
        if (userClaims && userClaims.admin) {
          this.setStatus(403) // forbidden request
          return { error: "Cannot delete another admin." }
        }

        this.setStatus(200)
        await authService.deleteUser(userUid)
        await userDataService.deleteUserData(userUid)
      }
    } catch (err) {
      this.setStatus(500)
      console.error(err)
      return { error: "Failed to delete user." }
    }
  }
}
