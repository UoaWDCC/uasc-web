import UserDataService from "data-layer/services/UserDataService"
import {
  EditSelfRequestBody,
  SelfRequestModel,
  EditSelfRequestModel
} from "service-layer/request-models/UserRequests"
import { UserResponse } from "service-layer/response-models/UserResponse"
import {
  Body,
  Controller,
  Get,
  Route,
  Security,
  SuccessResponse,
  Request,
  Patch
} from "tsoa"

@Route("users")
export class UsersController extends Controller {
  @SuccessResponse("200", "Users found")
  @Security("jwt", ["admin"])
  @Get()
  public async getAllUsers(): Promise<UserResponse[]> {
    const data = await new UserDataService().getAllUserData()
    this.setStatus(200)
    return data
  }

  @SuccessResponse("200", "Fetched self data")
  @Security("jwt")
  @Get("self")
  public async getSelf(
    @Request() request: SelfRequestModel
  ): Promise<UserResponse> {
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
}
