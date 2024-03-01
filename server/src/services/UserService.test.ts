import { describe, expect, test } from "@jest/globals"

import UserService from "./UserService"

describe("UserService", () => {
  const userService = new UserService()
  test("always returns 8", () => {
    expect(userService.testGetter()).toEqual(8)
  })
})
