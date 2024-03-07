import { additionalInfoMock } from "test-config/mocks/UserMocks"
import UserService from "./UserService"
import { cleanFirestore } from "test-config/TestUtils"

describe("UserService integration tests", () => {
  let userService: UserService

  afterEach(async () => {
    await cleanFirestore()
  })

  beforeEach(() => {
    userService = new UserService()
  })

  it("should add a user", async () => {
    await userService.addUser("testUser", additionalInfoMock)
    const user = await userService.getUser("testUser")

    expect(user).toEqual(additionalInfoMock)
  })

  it("edit a user", async () => {
    await userService.addUser("testUser", additionalInfoMock)
    await userService.editUser("testUser", { does_racing: false })
    const user = await userService.getUser("testUser")

    expect(user).toEqual({ ...additionalInfoMock, does_racing: false })
  })

  it("should delete a user", async () => {
    await userService.addUser("testUser", additionalInfoMock)

    await userService.deleteUser("testUser")
    const user = await userService.getUser("testUser")

    expect(user).not.toEqual(additionalInfoMock)
    expect(user).toEqual(undefined)
  })

  it("should get all users", async () => {
    await userService.addUser("testUser", additionalInfoMock)
    await userService.addUser("testUser1", additionalInfoMock)

    const users = await userService.getUsers()

    expect(users.length).toEqual(2)
  })
})
