import UserDataService from "data-layer/services/UserDataService"
import {
  CreateUserRequestBody,
  EditUsersRequestBody,
  SelfRequestModel,
  EditSelfRequestModel
} from "service-layer/request-models/UserRequests"
import {
  UserResponse,
  EditSelfResponse
} from "service-layer/response-models/UserResponse"
import {
  Body,
  Controller,
  Get,
  Route,
  Security,
  SuccessResponse,
  Request,
  Patch,
  Put
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

    if (data !== undefined) {
      this.setStatus(200)
    } else {
      this.setStatus(404)
    }

    return data
  }

  @SuccessResponse("200", "Created")
  @Security("jwt", ["admin"])
  @Put("create")
  public async createUser(
    @Body() requestBody: CreateUserRequestBody
  ): Promise<void> {
    const { uid, user } = requestBody
    if (await new UserDataService().userDataExists(uid)) {
      this.setStatus(409)
      return
    }
    await new UserDataService().createUserData(uid, user)
    this.setStatus(200)
  }

  @SuccessResponse("200", "Created")
  @Security("jwt")
  @Put("create")
  public async editSelf(
    @Request() request: EditSelfRequestModel
  ): Promise<EditSelfResponse> {
    // TODO: get information about user making request and edit them with the method from UserService
    await new UserDataService().editUserData(
      request.user.uid,
      request.updatedInformation
    )

    // TODO: Set to 200 on success (read up on https codes)
    this.setStatus(200)

    // 404 means not found, may not be appropriate in this case
    this.setStatus(404)

    return Promise.resolve(request.updatedInformation)
  }

  @SuccessResponse("200", "Edited")
  @Security("jwt", ["admin"])
  @Patch("bulk-edit")
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
