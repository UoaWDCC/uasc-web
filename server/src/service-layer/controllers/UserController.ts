import AuthService from "business-layer/services/AuthService"
import { UserAdditionalInfo } from "data-layer/models/firebase"
import UserDataService from "data-layer/services/UserDataService"
import {
  CreateUserRequestBody,
  EditUsersRequestBody,
  SelfRequestModel,
  demoteUserRequestBody,
  promoteUserRequestBody
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

  // ticket 202 - endpoint to demote/promote users
  @SuccessResponse("200", "Promoted user")
  @Security("jwt", ["admin"])
  @Put("promote")
  // set user membership to "member"
  public async promoteUser(
    @Body() requestBody: promoteUserRequestBody
  ): Promise<void> {
    const userService = new UserDataService() // create a new data service
    const authService = new AuthService()
    // attempt to fetch user
    const user: UserAdditionalInfo = await userService.getUserData(
      requestBody.uid
    )
    if (!user) return this.setStatus(400) // bad request
    const userClaimRole = await authService.getCustomerUserClaim(
      requestBody.uid
    )
    if (userClaimRole?.admin) return this.setStatus(403) // admin forbidden
    if (userClaimRole?.member) return this.setStatus(409) // conflict
    try {
      // update user in UserService
      await userService.editUserData(requestBody.uid, {
        membership: "member"
      })
      // update user claims in AuthService
      await authService.setCustomUserClaim(requestBody.uid, "member")
      this.setStatus(200)
    } catch (e) {
      console.error(e)
      this.setStatus(500) // unknown server error?
    }
  }

  @SuccessResponse("200", "Demoted user")
  @Security("jwt", ["admin"])
  @Put("demote")
  // set user membership type to `undefined`
  public async demoteUser(
    @Body() requestBody: demoteUserRequestBody
  ): Promise<void> {
    const userService = new UserDataService()
    const authService = new AuthService()
    const user: UserAdditionalInfo = await userService.getUserData(
      requestBody.uid
    )
    if (!user) return this.setStatus(400) // bad request
    const userClaimRole = await authService.getCustomerUserClaim(
      requestBody.uid
    )
    if (userClaimRole?.admin) return this.setStatus(403) // admin forbidden
    if (!userClaimRole?.member) return this.setStatus(409) // conflict
    try {
      // update user in UserService
      await userService.editUserData(requestBody.uid, {
        membership: "guest"
      })
      // update user claims in AuthService, set to null to delete the claim
      await authService.setCustomUserClaim(requestBody.uid, null)
      this.setStatus(200)
    } catch (e) {
      console.error(e)
      this.setStatus(500) // unknown server error?
    }
  }
}
