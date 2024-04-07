import {
  memberUserInfoMock,
  adminUserInfoMock
} from "test-config/mocks/User.mock"
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
    await userService.createUserData(TEST_UID_1, memberUserInfoMock)
    const user = await userService.getUserData(TEST_UID_1)

    expect(user).toEqual({ ...memberUserInfoMock, uid: TEST_UID_1 })
  })

  it("should know if a user has a document", async () => {
    let result = await userService.userDataExists(TEST_UID_1)
    expect(result).toEqual(false)

    await userService.createUserData(TEST_UID_1, memberUserInfoMock)
    result = await userService.userDataExists(TEST_UID_1)
    expect(result).toEqual(true)

    await userService.deleteUserData(TEST_UID_1)
    result = await userService.userDataExists(TEST_UID_1)
    expect(result).toEqual(false)
  })

  it("edit a user", async () => {
    await userService.createUserData(TEST_UID_1, memberUserInfoMock)
    await userService.editUserData(TEST_UID_1, { does_racing: false })
    const user = await userService.getUserData(TEST_UID_1)

    expect(user).toEqual({
      ...memberUserInfoMock,
      does_racing: false,
      uid: TEST_UID_1
    })
  })

  it("should delete a user", async () => {
    await userService.createUserData(TEST_UID_1, memberUserInfoMock)

    await userService.deleteUserData(TEST_UID_1)
    const user = await userService.getUserData(TEST_UID_1)

    expect(user).not.toEqual({ ...memberUserInfoMock, uid: TEST_UID_1 })
    expect(user).toEqual(undefined)
  })

  it("should get all users", async () => {
    await userService.createUserData(TEST_UID_1, memberUserInfoMock)
    await userService.createUserData("testUser2", memberUserInfoMock)

    const users = await userService.getAllUserData()

    expect(users.length).toEqual(2)
  })

  it("should filter users by membership type", async () => {
    await userService.createUserData(TEST_UID_1, memberUserInfoMock)
    await userService.createUserData("testUser2", memberUserInfoMock)
    await userService.createUserData("testUser3", adminUserInfoMock)

    const filteredMemberUsers = await userService.getFilteredUsers({
      membership: "member"
    })
    expect(filteredMemberUsers.length).toEqual(2)
    expect(filteredMemberUsers[0].membership).toEqual("member")
    expect(filteredMemberUsers[1].membership).toEqual("member")

    const filteredAdminUsers = await userService.getFilteredUsers({
      membership: "admin"
    })
    expect(filteredAdminUsers.length).toEqual(1)
  })

  it("should filter users by first name", async () => {
    await userService.createUserData(TEST_UID_1, memberUserInfoMock)
    await userService.createUserData("testUser2", memberUserInfoMock)
    await userService.createUserData("testUser3", adminUserInfoMock)

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
