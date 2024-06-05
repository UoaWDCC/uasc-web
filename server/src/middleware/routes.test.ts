import "dotenv/config"
import { _app } from "../index"
import { cleanFirestore, cleanAuth } from "test-config/TestUtils"
import supertest from "supertest"
import UserDataService from "data-layer/services/UserDataService"
import {
  ADMIN_USER_UID,
  GUEST_USER_UID,
  MEMBER_USER_UID,
  createUserData,
  createUserWithClaim,
  deleteUsersFromAuth
} from "./routes.mock"

import {
  checkoutSessionMock,
  customerMock,
  productMock
} from "test-config/mocks/Stripe.mock"
import { signupUserMock } from "test-config/mocks/User.mock"
import AuthService from "business-layer/services/AuthService"
import { MembershipTypeValues } from "business-layer/utils/StripeProductMetadata"

import BookingSlotService from "data-layer/services/BookingSlotsService"
import { dateToFirestoreTimeStamp } from "data-layer/adapters/DateUtils"
import BookingDataService from "data-layer/services/BookingDataService"
import { Timestamp } from "firebase-admin/firestore"

const request = supertest(_app)

/**
 * This needs to be updated as we add more stripe functions...
 */
jest.mock("stripe", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        customers: {
          create: () => {
            return { id: "test" }
          }
        },
        products: {
          search: () => {
            return { data: [productMock] }
          }
        },
        checkout: {
          sessions: {
            create: () => {
              return { client_secret: "test" }
            },
            list: () => {
              return {
                data: [checkoutSessionMock]
              }
            }
          }
        },
        webhooks: {
          constructEvent: () => {
            return {
              type: "payment_intent.succeeded",
              data: {
                object: {
                  customer: customerMock
                }
              }
            }
          }
        }
      }
    })
  }
})

const usersToCreate: string[] = [
  ADMIN_USER_UID,
  MEMBER_USER_UID,
  GUEST_USER_UID
]

const createUsers = async () => {
  await Promise.all(
    usersToCreate.map(async (uid) => {
      await createUserData(uid)
    })
  )
}

describe("Endpoints", () => {
  let adminToken: string | undefined
  let memberToken: string | undefined
  let guestToken: string | undefined

  beforeEach(async () => {
    adminToken = await createUserWithClaim(ADMIN_USER_UID, "admin")
    memberToken = await createUserWithClaim(MEMBER_USER_UID, "member")
    guestToken = await createUserWithClaim(GUEST_USER_UID)
  })

  afterEach(async () => {
    await deleteUsersFromAuth(usersToCreate)
  })

  afterAll(async () => {
    _app.close()
  })

  describe("admin/users", () => {
    it("Should get users for admin", (done) => {
      request
        .get("/admin/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})
        .expect(200, done)
    })
    it("Should not allow members to get users", (done) => {
      request
        .get("/admin/users")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})
        .expect(401, done)
    })
    it("Should not allow guests to get users", (done) => {
      request
        .get("/admin/users")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({})
        .expect(401, done)
    })
    describe("/self", () => {
      afterEach(async () => {
        await cleanFirestore()
      })
      it("Should not allow members to fetch their own stripe id", async () => {
        await createUserData(MEMBER_USER_UID)
        const res = await request
          .get("/users/self")
          .set("Authorization", `Bearer ${memberToken}`)
          .send({})

        expect(res.body.stripe_id).toBe(undefined)
      })
    })
  })

  /**
   *
   * `/Payments`
   *
   */
  describe("/payments", () => {
    beforeEach(async () => {
      await createUsers()
    })
    afterEach(async () => {
      await cleanFirestore()
    })
    describe("/membership", () => {
      it("should not let members to try create sessions", async () => {
        const res = await request
          .post("/payment/membership")
          .set("Authorization", `Bearer ${memberToken}`)
          .send({
            membershipType: MembershipTypeValues.UoaStudent
          })

        expect(res.status).toEqual(409)
      })

      it("should let guests/admins to try create sessions", async () => {
        createUserData(GUEST_USER_UID)
        let res = await request
          .post("/payment/membership")
          .set("Authorization", `Bearer ${guestToken}`)
          .send({
            membershipType: MembershipTypeValues.NewNonStudent
          })
        expect(res.status).toEqual(200)

        /**
         * Note admins should be able to create sessions for testing purposes, it is assumed that admin users will not try pay
         */
        res = await request
          .post("/payment/membership")
          .set("Authorization", `Bearer ${adminToken}`)
          .send({
            membershipType: MembershipTypeValues.UoaStudent
          })
        expect(res.status).toEqual(200)
      })
    })
  })

  describe("/admin/users/promote and /admin/users/demote", () => {
    beforeEach(async () => {
      await createUsers()
    })

    afterEach(async () => {
      await cleanFirestore()
    })
    it("Should allow admins to promote regular users", (done) => {
      request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: GUEST_USER_UID })
        .expect(200, done)
    })
    it("Should allow admins to demote regular users", (done) => {
      request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })
        .expect(200, done)
    })
    it("Should not allow admins to demote/promote admins", async () => {
      let res
      res = await request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })
      expect(res.status).toEqual(403) // forbidden

      res = await request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })
      expect(res.status).toEqual(403) // forbidden
    })

    it("Should not allow guests/members to use demote/promote", async () => {
      let res
      res = await request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({ uid: GUEST_USER_UID })
      expect(res.status).toEqual(401) // unauthorised

      res = await request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ uid: MEMBER_USER_UID })
      expect(res.status).toEqual(401) // unauthorised
    })

    it("Should check for conflicts, e.g. already member/guest", async () => {
      let res
      res = await request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })
      expect(res.status).toEqual(409) // conflict

      res = await request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: GUEST_USER_UID })
      expect(res.status).toEqual(409) // conflict
    })
  })

  describe("/users/edit-self", () => {
    beforeEach(async () => {
      await createUserData(ADMIN_USER_UID)
      await createUserData(MEMBER_USER_UID)
      await createUserData(GUEST_USER_UID)
    })

    afterEach(async () => {
      await cleanFirestore()
    })
    it("should edit the users information", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ updatedInformation: { gender: "male" } })

      expect(res.status).toEqual(200) // success
      const updatedUser = await new UserDataService().getUserData(
        ADMIN_USER_UID
      )
      expect(updatedUser.gender).toEqual("male")
    })

    it("should edit the user information for multiple attributes", async () => {
      const res = await request
        .patch("/users/edit-self")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          updatedInformation: { does_ski: true, university_year: "4th" }
        })

      expect(res.status).toEqual(200) // success
      const updatedUser = await new UserDataService().getUserData(
        MEMBER_USER_UID
      )
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

      expect(res.status).toEqual(400) // invalid request
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

      expect(res.status).toEqual(400) // invalid request
      const updatedUser = await new UserDataService().getUserData(
        MEMBER_USER_UID
      )
      expect(updatedUser.does_ski).not.toEqual("invalid")
    })
  })
  /**
   *
   * `/signup`
   *
   */
  describe("/signup", () => {
    afterEach(async () => {
      await cleanFirestore()
      await cleanAuth()
    })
    it("should return a JWT token for guest /signup POST endpoint", async () => {
      const res = await request.post("/signup").send({
        email: "test@mail.com",
        user: signupUserMock
      })
      // ensure that response is 200
      expect(res.status).toEqual(200)
      // check if user custom claims exist
      const { uid } = res.body
      const claims = await new AuthService().getCustomerUserClaim(uid)
      expect(claims).toEqual(undefined)
    })
    it("should return a 409 conflict when an email is already in use", async () => {
      let res = await request.post("/signup").send({
        email: "test@mail.com",
        user: signupUserMock
      })
      expect(res.status).toEqual(200)

      res = await request.post("/signup").send({
        email: "test@mail.com",
        user: signupUserMock
      })
      // check for conflict
      expect(res.status).toEqual(409)
    })
    it("should return no claims jwtToken", async () => {
      // console.log({ ...signupUserMock, membership: "admin" })
      const res = await request.post("/signup").send({
        email: "testadmin@mail.com",
        user: signupUserMock
      })
      // ensure that response is 200
      expect(res.status).toEqual(200)
      // check if user custom claims exist
      const { uid } = res.body
      const claims = await new AuthService().getCustomerUserClaim(uid)
      expect(claims).toEqual(undefined)
    })
  })
  /**
   *
   * `/webhook`
   *
   */
  describe("/webhook", () => {
    beforeAll(async () => {
      await cleanFirestore()
      await cleanAuth()
      await createUsers()
    })
    afterAll(async () => {
      await cleanFirestore()
      await cleanAuth()
    })
    it("should add claim to user upon successful checkout", async () => {
      const res = await request
        .post("/webhook")
        .set("stripe-signature", "test")
        .send({
          test: "foo"
        })
      expect(res.status).toEqual(200)
      const userClaims = await new AuthService().getCustomerUserClaim(
        GUEST_USER_UID
      )
      expect(userClaims).toEqual({ member: true })
    })
  })
  /**
   *
   * `/bookings`
   *
   */
  describe("/bookings", () => {
    beforeEach(async () => {
      await createUserData(ADMIN_USER_UID)
      await createUserData(MEMBER_USER_UID)
      await createUserData(GUEST_USER_UID)
    })
    afterEach(async () => {
      await cleanFirestore()
    })
    it("should return all available dates between input dates", async () => {
      const bookingDataService = new BookingDataService()
      const bookingSlotService = new BookingSlotService()

      const { id } = await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("10/09/2009")),
        max_bookings: 69
      })

      for (let i = 0; i < 5; ++i) {
        await bookingDataService.createBooking({
          user_id: "Eddie Wang",
          booking_slot_id: id,
          stripe_payment_id: ""
        })
      }

      const res = await request
        .post("/bookings/available-dates")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          startDate: dateToFirestoreTimeStamp(new Date("10/09/2009")),
          endDate: dateToFirestoreTimeStamp(new Date("11/09/2009"))
        })

      expect(res.status).toEqual(200)

      expect(res.body.data[0].availableSpaces).toEqual(64)
    })

    it("should return all available dates between now and 1 year in the future", async () => {
      const bookingDataService = new BookingDataService()
      const bookingSlotService = new BookingSlotService()

      const { id } = await bookingSlotService.createBookingSlot({
        date: Timestamp.fromMillis(Date.now() + 6969),
        max_bookings: 69
      })

      for (let i = 0; i < 10; ++i) {
        await bookingDataService.createBooking({
          user_id: "Eddie Wang",
          booking_slot_id: id,
          stripe_payment_id: ""
        })
      }

      const res = await request
        .post("/bookings/available-dates")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})

      expect(res.status).toEqual(200)
      expect(res.body.data[0].availableSpaces).toEqual(59)
    })

    it("should return all available dates for multiple booking slots", async () => {
      const bookingDataService = new BookingDataService()
      const bookingSlotService = new BookingSlotService()

      const { id: id1 } = await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("10/09/2009")),
        max_bookings: 60
      })

      const { id: id2 } = await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("10/09/2015")),
        max_bookings: 69,
        description: "slot 1"
      })

      const { id: id3 } = await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("10/21/2015")),
        max_bookings: 50,
        description: "slot 2"
      })

      for (let i = 0; i < 10; ++i) {
        await bookingDataService.createBooking({
          user_id: "Eddie Wang",
          booking_slot_id: id1,
          stripe_payment_id: ""
        })

        await bookingDataService.createBooking({
          user_id: "Benson Cho",
          booking_slot_id: id2,
          stripe_payment_id: ""
        })

        await bookingDataService.createBooking({
          user_id: "Albert Sun",
          booking_slot_id: id3,
          stripe_payment_id: ""
        })
      }

      const res = await request
        .post("/bookings/available-dates")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          startDate: dateToFirestoreTimeStamp(new Date("10/09/2015")),
          endDate: dateToFirestoreTimeStamp(new Date("10/21/2015"))
        })

      expect(res.status).toEqual(200)
      expect(res.body.data).toHaveLength(2)

      expect(
        res.body.data.find(
          (item: any) =>
            item.availableSpaces === 59 && item.description === "slot 1"
        )
      ).toBeDefined()
      expect(
        res.body.data.find(
          (item: any) =>
            item.availableSpaces === 40 && item.description === "slot 2"
        )
      ).toBeDefined()
    })

    it("should return an unauthorized error", async () => {
      const bookingDataService = new BookingDataService()
      const bookingSlotService = new BookingSlotService()

      const { id: id1 } = await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("10/09/2009")),
        max_bookings: 60
      })

      for (let i = 0; i < 10; ++i) {
        await bookingDataService.createBooking({
          user_id: "Eddie Wang",
          booking_slot_id: id1,
          stripe_payment_id: ""
        })
      }

      const res = await request
        .post("/bookings/available-dates")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({
          startDate: dateToFirestoreTimeStamp(new Date("10/09/2015")),
          endDate: dateToFirestoreTimeStamp(new Date("10/21/2015"))
        })

      expect(res.status).toEqual(401)
    })

    it("should not return negative availabilties", async () => {
      const bookingDataService = new BookingDataService()
      const bookingSlotService = new BookingSlotService()

      const { id: id1 } = await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("10/09/2009")),
        max_bookings: 1
      })

      for (let i = 0; i < 5; ++i) {
        await bookingDataService.createBooking({
          user_id: "Eddie Wang",
          booking_slot_id: id1,
          stripe_payment_id: ""
        })
      }

      const res = await request
        .post("/bookings/available-dates")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          startDate: dateToFirestoreTimeStamp(new Date("10/09/2009")),
          endDate: dateToFirestoreTimeStamp(new Date("10/21/2009"))
        })

      expect(res.status).toEqual(200)
      expect(res.body.data[0].availableSpaces).toEqual(0)
    })
  })

  /**
   * Booking endpoints
   */

  describe("admin/bookings/make-dates-available", () => {
    let bookingSlotService: BookingSlotService
    beforeEach(async () => {
      bookingSlotService = new BookingSlotService()
      await createUsers()
    })
    afterEach(async () => {
      await cleanFirestore()
    })

    it("Should create booking slots specified within the date range", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("10/09/2001"))
      const endDate = dateToFirestoreTimeStamp(new Date("10/14/2001"))
      const res = await request
        .post("/admin/bookings/make-dates-available")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate
        })

      expect(res.status).toEqual(201)
      expect(res.body.updatedBookingSlots).toHaveLength(6)
      expect(res.body.updatedBookingSlots[0].date).toEqual(startDate)
      expect(res.body.updatedBookingSlots[5].date).toEqual(endDate)

      const dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        endDate
      )

      expect(dates).toHaveLength(6)
    })

    it("Should not do anything if the start/end dates are the wrong way around", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("10/14/2001"))
      const endDate = dateToFirestoreTimeStamp(new Date("10/09/2001"))
      const res = await request
        .post("/admin/bookings/make-dates-available")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate
        })

      expect(res.status).toEqual(201)
      expect(res.body.updatedBookingSlots).toHaveLength(0)

      const dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        endDate
      )

      expect(dates).toHaveLength(0)
    })

    it("Should update 'inactive' slots specified within the date range", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("10/09/2001"))

      let dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        startDate
      )

      expect(dates).toHaveLength(0)

      bookingSlotService.createBookingSlot({
        date: startDate,
        description: "my test",
        max_bookings: -99
      })
      const res = await request
        .post("/admin/bookings/make-dates-available")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate: startDate
        })

      expect(res.status).toEqual(201)
      expect(res.body.updatedBookingSlots).toHaveLength(1)
      expect(res.body.updatedBookingSlots[0].date).toEqual(startDate)

      dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        startDate
      )

      expect(dates).toHaveLength(1)
      expect(dates[0].max_bookings).toBeGreaterThan(0)
      expect(dates[0].description).toEqual("my test")
      expect(dates[0].date).toEqual(startDate)
    })
  })

  describe("admin/bookings/make-dates-unavailable", () => {
    let bookingSlotService: BookingSlotService
    beforeEach(async () => {
      bookingSlotService = new BookingSlotService()
      await createUsers()
    })
    afterEach(async () => {
      await cleanFirestore()
    })

    it("Should NOT create booking slots specified within the date range", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("10/09/2001"))
      const endDate = dateToFirestoreTimeStamp(new Date("10/14/2001"))
      const res = await request
        .post("/admin/bookings/make-dates-unavailable")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate
        })

      expect(res.status).toEqual(201)
      expect(res.body.updatedBookingSlots).toHaveLength(0)

      const dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        endDate
      )

      expect(dates).toHaveLength(0)
    })

    it("Should not do anything if the start/end dates are the wrong way around", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("10/14/2001"))
      const endDate = dateToFirestoreTimeStamp(new Date("10/09/2001"))
      const res = await request
        .post("/admin/bookings/make-dates-unavailable")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate
        })

      expect(res.status).toEqual(201)
      expect(res.body.updatedBookingSlots).toHaveLength(0)

      const dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        endDate
      )

      expect(dates).toHaveLength(0)
    })

    it("Should update 'active' slots specified within the date range", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("10/09/2001"))

      let dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        startDate
      )

      expect(dates).toHaveLength(0)

      bookingSlotService.createBookingSlot({
        date: startDate,
        description: "my test",
        max_bookings: 9999
      })

      const res = await request
        .post("/admin/bookings/make-dates-unavailable")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate: startDate
        })

      expect(res.status).toEqual(201)
      expect(res.body.updatedBookingSlots).toHaveLength(1)
      expect(res.body.updatedBookingSlots[0].date).toEqual(startDate)

      dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        startDate
      )

      expect(dates).toHaveLength(1)
      expect(dates[0].max_bookings).toBeLessThanOrEqual(0)
      expect(dates[0].description).toEqual("my test")
      expect(dates[0].date).toEqual(startDate)
    })

    it("Should work with a 'gap' in between the dates", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("10/09/2001"))
      const leapDate = dateToFirestoreTimeStamp(new Date("10/11/2001"))

      bookingSlotService.createBookingSlot({
        date: startDate,
        description: "my test",
        max_bookings: 9999
      })

      bookingSlotService.createBookingSlot({
        date: leapDate,
        description: "skipped a date",
        max_bookings: 9999
      })

      let dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        leapDate
      )

      const res = await request
        .post("/admin/bookings/make-dates-unavailable")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate: leapDate
        })

      expect(res.status).toEqual(201)
      expect(res.body.updatedBookingSlots).toHaveLength(2)

      dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        leapDate
      )

      expect(dates).toHaveLength(2)
      expect(dates[0].max_bookings).toBeLessThanOrEqual(0)
      expect(dates[0].description).toEqual("my test")
      expect(dates[0].date).toEqual(startDate)

      expect(dates[1].max_bookings).toBeLessThanOrEqual(0)
      expect(dates[1].description).toEqual("skipped a date")
      expect(dates[1].date).toEqual(leapDate)
    })
  })
})
