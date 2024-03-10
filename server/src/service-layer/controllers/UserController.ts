import { UserAdditionalInfo } from "data-layer/models/firebase"
import UserService from "data-layer/services/UserService"
import {
  Body,
  Controller,
  Get,
  Post,
  Route,
  Security,
  SuccessResponse
} from "tsoa"

@Route("users")
export class UsersController extends Controller {
  @Security("jwt")
  @Get()
  public async getUser(): Promise<UserAdditionalInfo[]> {
    return new UserService().getUsers()
  }

  @SuccessResponse("200", "Created") // Custom success response
  @Post()
  public async createUser(@Body() requestBody: { id: string }): Promise<void> {
    this.setStatus(200) // set return status 200
  }
}
