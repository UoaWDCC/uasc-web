import { userInfoMock, userInfoMock2 } from "test-config/mocks/User.mock"
import UserDataService from "./UserDataService"
import { cleanFirestore } from "test-config/TestUtils"

const TEST_UID_1 = "testUser"

describe("UserService integration tests", () => {
  let userService: UserDataService

  afterEach(async () => {
    await cleanFirestore()
  })

  beforeEach(() => {
    userService = new UserDataService()
  })

  it("should add a user", async () => {
    await userService.createUserData(TEST_UID_1, userInfoMock)
    const user = await userService.getUserData(TEST_UID_1)

    expect(user).toEqual({ ...userInfoMock, uid: TEST_UID_1 })
  })

  it("should know if a user has a document", async () => {
    let result = await userService.userDataExists(TEST_UID_1)
    expect(result).toEqual(false)

    await userService.createUserData(TEST_UID_1, userInfoMock)
    result = await userService.userDataExists(TEST_UID_1)
    expect(result).toEqual(true)

    await userService.deleteUserData(TEST_UID_1)
    result = await userService.userDataExists(TEST_UID_1)
    expect(result).toEqual(false)
  })

  it("edit a user", async () => {
    await userService.createUserData(TEST_UID_1, userInfoMock)
    await userService.editUserData(TEST_UID_1, { does_racing: false })
    const user = await userService.getUserData(TEST_UID_1)

    expect(user).toEqual({
      ...userInfoMock,
      does_racing: false,
      uid: TEST_UID_1
    })
  })

  it("should delete a user", async () => {
    await userService.createUserData(TEST_UID_1, userInfoMock)

    await userService.deleteUserData(TEST_UID_1)
    const user = await userService.getUserData(TEST_UID_1)

    expect(user).not.toEqual({ ...userInfoMock, uid: TEST_UID_1 })
    expect(user).toEqual(undefined)
  })

  it("should get all users", async () => {
    await userService.createUserData(TEST_UID_1, userInfoMock)
    await userService.createUserData("testUser2", userInfoMock)

    const users = await userService.getAllUserData()

    expect(users.length).toEqual(2)
  })

  it("should filter users by first name", async () => {
    await userService.createUserData(TEST_UID_1, userInfoMock)
    await userService.createUserData("testUser2", userInfoMock)
    await userService.createUserData("testUser3", userInfoMock2)

    const filteredNameUsers = await userService.getFilteredUsers({
      first_name: "first"
    })
    expect(filteredNameUsers.length).toEqual(2)
    expect(filteredNameUsers[0].first_name).toEqual("first")
    expect(filteredNameUsers[1].first_name).toEqual("first")

    const filteredNameUser = await userService.getFilteredUsers({
      first_name: "third"
    })
    expect(filteredNameUser.length).toEqual(1)
    expect(filteredNameUser[0].first_name).toEqual("third")
  })
})
