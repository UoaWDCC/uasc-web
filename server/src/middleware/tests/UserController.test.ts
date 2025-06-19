import * as admin from "firebase-admin"
import UserDataService from "data-layer/services/UserDataService"
import { ADMIN_USER_UID, GUEST_USER_UID, MEMBER_USER_UID } from "../routes.mock"
import { request, adminToken, memberToken } from "../routes.setup"
import { StatusCodes } from "http-status-codes"

describe("UserController endpoint tests", () => {
  describe("/users/self", () => {
    it("Should not allow members to fetch their own stripe id", async () => {
      const res = await request
        .get("/users/self")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})

      expect(res.body.stripe_id).toBe(undefined)
    })
  })
  describe("/users/edit-self", () => {
    it("should edit the users information", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          updatedInformation: {
            gender: "male",
            does_ski: true,
            university_year: "4th"
          }
        })

      expect(res.status).toEqual(StatusCodes.OK) // success
      const updatedUser = await new UserDataService().getUserData(
        ADMIN_USER_UID
      )
      expect(updatedUser.gender).toEqual("male")
      expect(updatedUser.does_ski).toEqual(true)
      expect(updatedUser.university_year).toEqual("4th")
    })

    it("should not edit users stripe_id for multiple attributes", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          updatedInformation: {
            faculty: "arts",
            gender: "two spirit",
            stripe_id: "my fake stripe id"
          }
        })

      expect(res.status).toEqual(StatusCodes.BAD_REQUEST) // invalid request
      const updatedUser = await new UserDataService().getUserData(
        MEMBER_USER_UID
      )
      expect(updatedUser.stripe_id).not.toEqual("my fake stripe id")
    })

    it("should not be able to put invalid domain into attribute", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ updatedInformation: { does_ski: "invalid" } })

      expect(res.status).toEqual(StatusCodes.BAD_REQUEST) // invalid request
      const updatedUser = await new UserDataService().getUserData(
        MEMBER_USER_UID
      )
      expect(updatedUser.does_ski).not.toEqual("invalid")
    })
  })

  describe("/users/delete-user", () => {
    it("should delete the user", async () => {
      const res = await request
        .delete("/users/delete-user")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })

      expect(res.status).toEqual(StatusCodes.OK)
      const deletedUser = await new UserDataService().getUserData(
        MEMBER_USER_UID
      )
      expect(deletedUser).toEqual(undefined)

      // check that user is actually deleted from auth
      try {
        await admin.auth().getUser(MEMBER_USER_UID)
        fail("User should be deleted from auth")
      } catch (err) {
        if (err && typeof err === "object" && "errorInfo" in err) {
          expect(err.errorInfo).toEqual({
            code: "auth/user-not-found",
            message:
              "There is no user record corresponding to the provided identifier."
          })
        }
      }

      const unaffectedUser = await new UserDataService().getUserData(
        GUEST_USER_UID
      )
      expect(unaffectedUser).not.toEqual(undefined)
    })

    it("should not delete an admin user", async () => {
      const res = await request
        .delete("/users/delete-user")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })

      expect(res.status).toEqual(StatusCodes.FORBIDDEN) // forbidden request
      const deletedUser = await new UserDataService().getUserData(
        ADMIN_USER_UID
      )
      expect(deletedUser).not.toEqual(undefined)

      const adminUser = await admin.auth().getUser(ADMIN_USER_UID)
      expect(adminUser).not.toEqual(undefined)
    })

    it("should return 401 for unauthorized users", async () => {
      const res = await request
        .delete("/users/delete-user")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ uid: MEMBER_USER_UID })

      expect(res.status).toEqual(StatusCodes.UNAUTHORIZED)
    })
  })
})
