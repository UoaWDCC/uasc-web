import UserService from "services/UserService"
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse
} from "tsoa"

@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<number> {
    return new UserService().testGetter()
  }

  @SuccessResponse("200", "Created") // Custom success response
  @Post()
  public async createUser(@Body() requestBody: { id: string }): Promise<void> {
    this.setStatus(200) // set return status 200
  }
}
