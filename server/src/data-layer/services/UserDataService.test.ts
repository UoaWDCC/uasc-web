import { additionalInfoMock } from "test-config/mocks/User.mock"
import UserDataService from "./UserDataService"
import { cleanFirestore } from "test-config/TestUtils"

describe("UserService integration tests", () => {
  let userService: UserDataService

  afterEach(async () => {
    await cleanFirestore()
  })

  beforeEach(() => {
    userService = new UserDataService()
  })

  it("should add a user", async () => {
    await userService.createUserData("testUser", additionalInfoMock)
    const user = await userService.getUserData("testUser")

    expect(user).toEqual(additionalInfoMock)
  })

  it("edit a user", async () => {
    await userService.createUserData("testUser", additionalInfoMock)
    await userService.editUserData("testUser", { does_racing: false })
    const user = await userService.getUserData("testUser")

    expect(user).toEqual({ ...additionalInfoMock, does_racing: false })
  })

  it("should delete a user", async () => {
    await userService.createUserData("testUser", additionalInfoMock)

    await userService.deleteUserData("testUser")
    const user = await userService.getUserData("testUser")

    expect(user).not.toEqual(additionalInfoMock)
    expect(user).toEqual(undefined)
  })

  it("should get all users", async () => {
    await userService.createUserData("testUser", additionalInfoMock)
    await userService.createUserData("testUser1", additionalInfoMock)

    const users = await userService.getAllUserData()

    expect(users.length).toEqual(2)
  })
})
