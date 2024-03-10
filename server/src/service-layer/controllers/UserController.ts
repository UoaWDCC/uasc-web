import UserDataService from "data-layer/services/UserDataService"
import {
  EditUsersRequestBody,
  SelfRequestModel
} from "service-layer/request-models/UserRequests"
import { UserResponse } from "service-layer/response-models/UserResponse"
import {
  Body,
  Controller,
  Get,
  Post,
  Route,
  Security,
  SuccessResponse,
  Request
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
    this.setStatus(200)
    return await new UserDataService().getUserData(request.user.uid)
  }

  @SuccessResponse("200", "Created")
  @Security("jwt")
  @Post()
  public async createUser(@Body() requestBody: { id: string }): Promise<void> {
    this.setStatus(200) // set return status 200
  }

  @SuccessResponse("200", "Edited")
  @Security("jwt", ["admin"])
  @Post("bulk-edit")
  public async editUsers(
    @Body() requestBody: EditUsersRequestBody
  ): Promise<void> {
    const userService = new UserDataService()
    const users = requestBody.users
    const editPromises = users.map((user) => {
      const { uid, updatedInformation } = user
      return userService.editUserData(uid, updatedInformation)
    })
    await Promise.all(editPromises)
    this.setStatus(200)
  }
}
