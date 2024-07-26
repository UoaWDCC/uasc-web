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
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"

@Route("users")
export class UsersController extends Controller {
  /**
   * Fetches users additional info based on their uid.
   * @param request - Takes a UserRecord and uses the UID to fetch the user's additional info.
   * @returns The additionalInfo of the user.
   */
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

  /**
   * Edits the user's additional info based on their uid.
   * @param request - Takes a UserRecord and uses the UID to edit the user's additional info.
   * @param requestBody - The updated user additional info, note that the stripe_id is omitted.
   * @returns void.
   */
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

  /**
   * Deletes a user based on their uid. This requires an admin JWT token.
   * @param requestBody - The uid of the user to be deleted.
   * @returns void.
   */
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

        let userClaims
        try {
          userClaims = await authService.getCustomerUserClaim(userUid)
        } catch (e) {
          console.info(`Couldn't fetch user claims for ${userUid}. ${e}`)
        }
        if (userClaims && userClaims[AuthServiceClaims.ADMIN]) {
          this.setStatus(403) // forbidden request
          return { error: "Cannot delete another admin." }
        }

        this.setStatus(200)
        try {
          await authService.deleteUser(userUid)
        } catch (e) {
          console.info(`Couldn't delete ${userUid} in auth. ${e}`)
        }

        try {
          await userDataService.deleteUserData(userUid)
        } catch (e) {
          console.info(`Couldn't delete ${userUid} in firestore. ${e}`)
        }
      }
    } catch (err) {
      this.setStatus(500)
      console.error(err)
      return { error: "Failed to delete user." }
    }
  }
}
