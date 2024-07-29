import { UserAccountTypes } from "business-layer/utils/AuthServiceClaims"
import { request, adminToken, memberToken, guestToken } from "../routes.setup"
import {
  ADMIN_USER_UID,
  GUEST_USER_UID,
  MEMBER_USER_UID,
  createUserDataWithStripeId,
  createUserWithClaim
} from "../routes.mock"
import { Timestamp } from "firebase-admin/firestore"
import { DEFAULT_BOOKING_MAX_SLOTS } from "business-layer/utils/BookingConstants"
import {
  dateToFirestoreTimeStamp,
  removeUnderscoresFromTimestamp
} from "data-layer/adapters/DateUtils"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import BookingDataService from "data-layer/services/BookingDataService"
import AuthService from "business-layer/services/AuthService"
import { UserRecord } from "firebase-admin/auth"

describe("AdminController endpoint tests", () => {
  describe("/admin/users", () => {
    it("should get users for admin", (done) => {
      request
        .get("/admin/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})
        .expect(200, done)
    })

    it("should fetch merged data for users", async () => {
      const response = await request
        .get("/admin/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(response.status).toEqual(200)
      expect(response.body.data).toHaveLength(3)
      expect(
        response.body.data.some(
          (item: any) => item.membership === UserAccountTypes.ADMIN
        )
      )
    })

    it("should reject invalid fetch quantities", async () => {
      let response = await request
        .get("/admin/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .query({ toFetch: 101 })
        .send({})
      expect(response.status).toEqual(400)

      response = await request
        .get(`/admin/users`)
        .set("Authorization", `Bearer ${adminToken}`)
        .query({ toFetch: -1 })
        .send({})
      // we should fetch everything after the one we just got
      expect(response.status).toEqual(400)
    })

    it("should fetch merged data for users, after the offset", async () => {
      // Will fetch indexes 1,2
      let response = await request
        .get("/admin/users?toFetch=1")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(response.status).toEqual(200)
      expect(response.body.data).toHaveLength(1)
      expect(typeof response.body.nextCursor).toBe("string")

      const nextCursor = response.body.nextCursor

      response = await request
        .get(`/admin/users`)
        .set("Authorization", `Bearer ${adminToken}`)
        .query({ toFetch: 3, cursor: nextCursor })
        .send({})
      // we should fetch everything after the one we just got
      expect(response.body.data).toHaveLength(2)
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
  })

  describe("/admin/users/promote and /admin/users/demote", () => {
    it("Should allow admins to promote guests", (done) => {
      request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: GUEST_USER_UID })
        .expect(200, done)
    })
    it("Should allow admins to demote members", (done) => {
      request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })
        .expect(200, done)
    })
    it("Should not allow admins to demote or promote admins", async () => {
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

    it("Should conflict upon promoting members/demoting guests", async () => {
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

  describe("admin/users/demote-all", () => {
    const authService = new AuthService()

    it("Should not demote admin users", async () => {
      const res = await request
        .patch("/admin/users/demote-all")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})
      expect(res.status).toEqual(200)

      const { admin } = await authService.getCustomerUserClaim(ADMIN_USER_UID)
      expect(admin).toEqual(true)
    })
    it("Should demote all members", async () => {
      // Note that this isn't testing on creating over a thousand members
      // as it would be too slow
      for (let i = 0; i < 5; i++) {
        await createUserWithClaim(`${i}`, UserAccountTypes.MEMBER)
      }
      const res = await request
        .patch("/admin/users/demote-all")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(res.status).toEqual(200)
      const allUsers: UserRecord[] = await authService.getAllUsers()
      expect(
        allUsers.some((user) => user.customClaims?.member === true)
      ).toEqual(false)
    })
  })

  describe("admin/bookings/make-dates-available", () => {
    const bookingSlotService = new BookingSlotService()
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
      expect(
        removeUnderscoresFromTimestamp(res.body.updatedBookingSlots[0].date)
      ).toEqual(startDate)
      expect(
        removeUnderscoresFromTimestamp(res.body.updatedBookingSlots[5].date)
      ).toEqual(endDate)

      const dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        endDate
      )
      expect(dates).toHaveLength(6)

      dates.forEach((date) => {
        expect(date.max_bookings).toEqual(DEFAULT_BOOKING_MAX_SLOTS)
      })
    })

    it("Should create booking slots specified within the date range, using the specified slots - while also overwriting old availabilities", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("10/09/2001"))
      const endDate = dateToFirestoreTimeStamp(new Date("10/14/2001"))
      let res = await request
        .post("/admin/bookings/make-dates-available")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate,
          slots: 69
        })

      expect(res.status).toEqual(400) // exceed maximum

      res = await request
        .post("/admin/bookings/make-dates-available")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate
        })

      expect(res.status).toEqual(201)
      expect(res.body.updatedBookingSlots).toHaveLength(6)
      expect(
        removeUnderscoresFromTimestamp(res.body.updatedBookingSlots[0].date)
      ).toEqual(startDate)
      expect(
        removeUnderscoresFromTimestamp(res.body.updatedBookingSlots[5].date)
      ).toEqual(endDate)

      let dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        endDate
      )
      expect(dates).toHaveLength(6)

      dates.forEach((date) => {
        expect(date.max_bookings).toEqual(DEFAULT_BOOKING_MAX_SLOTS)
      })

      const CUSTOM_SLOTS = 11 as const

      res = await request
        .post("/admin/bookings/make-dates-available")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate,
          slots: CUSTOM_SLOTS
        })
      expect(res.body.updatedBookingSlots).toHaveLength(6)
      expect(
        removeUnderscoresFromTimestamp(res.body.updatedBookingSlots[0].date)
      ).toEqual(startDate)
      expect(
        removeUnderscoresFromTimestamp(res.body.updatedBookingSlots[5].date)
      ).toEqual(endDate)

      dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        endDate
      )
      expect(dates).toHaveLength(6)

      dates.forEach((date) => {
        expect(date.max_bookings).toEqual(CUSTOM_SLOTS)
      })
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
      expect(
        removeUnderscoresFromTimestamp(res.body.updatedBookingSlots[0].date)
      ).toEqual(startDate)

      dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        startDate
      )
      expect(dates).toHaveLength(1)
      expect(dates[0].max_bookings).toBeGreaterThan(0)
      expect(dates[0].description).toEqual("my test")
      expect(removeUnderscoresFromTimestamp(dates[0].date)).toEqual(startDate)
    })
  })

  describe("admin/bookings/make-dates-unavailable", () => {
    const bookingSlotService = new BookingSlotService()

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
      expect(
        removeUnderscoresFromTimestamp(res.body.updatedBookingSlots[0].date)
      ).toEqual(startDate)

      dates = await bookingSlotService.getBookingSlotsBetweenDateRange(
        startDate,
        startDate
      )

      expect(dates).toHaveLength(1)
      expect(dates[0].max_bookings).toBeLessThanOrEqual(0)
      expect(dates[0].description).toEqual("my test")
      expect(removeUnderscoresFromTimestamp(dates[0].date)).toEqual(startDate)
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
      expect(removeUnderscoresFromTimestamp(dates[0].date)).toEqual(startDate)

      expect(dates[1].max_bookings).toBeLessThanOrEqual(0)
      expect(dates[1].description).toEqual("skipped a date")
      expect(removeUnderscoresFromTimestamp(dates[1].date)).toEqual(leapDate)
    })
  })

  describe("/admin/bookings/create", () => {
    it("should create bookings a user within the date range", async () => {
      const bookingSlotService = new BookingSlotService()

      const startDate = dateToFirestoreTimeStamp(new Date("01/01/2022"))
      const endDate = dateToFirestoreTimeStamp(new Date("12/31/2023"))

      await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("02/01/2023")),
        max_bookings: 10
      })

      await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("03/01/2023")),
        max_bookings: 10
      })

      // Important test case, don't return dates with no bookings
      await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("01/01/2023")),
        max_bookings: 10
      })

      const res = await request
        .post("/admin/bookings/create")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate,
          userId: MEMBER_USER_UID
        })

      expect(res.status).toEqual(200)
      expect(res.body.data).toHaveLength(3)
      expect.arrayContaining([
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({ uid: MEMBER_USER_UID })
          ])
        })
      ])
    })

    it("should return unauthorized error for non-admin users", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("01/01/2023"))
      const endDate = dateToFirestoreTimeStamp(new Date("12/31/2023"))

      const res = await request
        .post("/admin/bookings/create")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          startDate,
          endDate,
          userId: undefined
        })

      expect(res.status).toEqual(401)
    })

    it("Shouldn't duplicate members in the same slot", async () => {
      const bookingSlotService = new BookingSlotService()
      const bookingDataService = new BookingDataService()

      const startDate = dateToFirestoreTimeStamp(new Date("01/01/2022"))
      const endDate = dateToFirestoreTimeStamp(new Date("12/31/2023"))

      const slot1 = await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("02/01/2023")),
        max_bookings: 10
      })

      await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("01/01/2024")),
        max_bookings: 10
      })

      await bookingDataService.createBooking({
        user_id: MEMBER_USER_UID,
        booking_slot_id: slot1.id,
        stripe_payment_id: ""
      })

      let res = await request
        .post("/admin/bookings/create")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate,
          userId: MEMBER_USER_UID
        })

      expect(res.status).toEqual(200)
      expect(res.body.data).toHaveLength(1)
      expect.arrayContaining([
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({ uid: MEMBER_USER_UID })
          ])
        })
      ])

      expect(
        (
          await bookingSlotService.getBookingSlotsBetweenDateRange(
            startDate,
            endDate
          )
        ).length
      ).toEqual(1)

      const newEndDate = dateToFirestoreTimeStamp(new Date("01/01/2024"))

      res = await request
        .post("/admin/bookings/create")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          newEndDate,
          userId: MEMBER_USER_UID
        })

      expect(
        (
          await bookingSlotService.getBookingSlotsBetweenDateRange(
            startDate,
            newEndDate
          )
        ).length
      ).toEqual(2)
    })
  })

  describe("/admin/bookings/delete", () => {
    it("should error on deleting invalid booking id", async () => {
      const res = await request
        .post(`/admin/bookings/delete`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ bookingID: "blah blah" })

      expect(res.status).toEqual(404)
    })
    it("should delete booking by booking id", async () => {
      const bookingDataService = new BookingDataService()
      const bookingSlotService = new BookingSlotService()

      const { id } = await bookingSlotService.createBookingSlot({
        date: Timestamp.fromMillis(Date.now() + 5000),
        max_bookings: 10
      })
      const createdBooking = await bookingDataService.createBooking({
        user_id: "Eddie Wang",
        booking_slot_id: id,
        stripe_payment_id: ""
      })

      const deleteRes = await request
        .post(`/admin/bookings/delete`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ bookingID: createdBooking.id })

      expect(deleteRes.status).toEqual(200)
      expect(deleteRes.body.user_id).toEqual("Eddie Wang")

      const res = await request
        .post("/bookings/available-dates")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})

      expect(res.body.data[0].availableSpaces).toEqual(10)
    })
  })

  describe("/admin/users/add-coupon", () => {
    it("Should allow admins to add a coupon to a user", async () => {
      // Create a user with a stripe_id
      const stripeId = "test_stripe_id"
      await createUserDataWithStripeId(ADMIN_USER_UID, { stripe_id: stripeId })

      const response = await request
        .post("/admin/users/add-coupon")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID, quantity: 5 })

      expect(response.status).toEqual(200)
    })

    it("Should not allow adding a coupon to a user without stripe_id", async () => {
      const response = await request
        .post("/admin/users/add-coupon")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID, quantity: 5 })

      expect(response.status).toEqual(400)
    })

    it("Should return 404 if user is not found", async () => {
      const response = await request
        .post("/admin/users/add-coupon")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: "non_existent_user", quantity: 5 })

      expect(response.status).toEqual(404)
    })

    it("Should not allow members to add a coupon", async () => {
      const response = await request
        .post("/admin/users/add-coupon")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ uid: MEMBER_USER_UID, quantity: 5 })

      expect(response.status).toEqual(401)
    })

    it("Should not allow guests to add a coupon", async () => {
      const response = await request
        .post("/admin/users/add-coupon")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({ uid: MEMBER_USER_UID, quantity: 5 })

      expect(response.status).toEqual(401)
    })
  })

  describe("/admin/users/:uid", () => {
    it("Should get user data for admin", async () => {
      const response = await request
        .get(`/admin/users/${MEMBER_USER_UID}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(response.status).toEqual(200)
      expect(response.body.data.uid).toEqual(MEMBER_USER_UID)
    })

    it("Should return 404 if user not found", async () => {
      const response = await request
        .get(`/admin/users/someRandomUser`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(response.status).toEqual(404)
      expect(response.body.error).toEqual("User not found")
    })

    it("Should not allow members to get individual user data", async () => {
      const response = await request
        .get(`/admin/users/${MEMBER_USER_UID}`)
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})

      expect(response.status).toEqual(401)
    })

    it("Should not allow guests to get individual user data", async () => {
      const response = await request
        .get(`/admin/users/${MEMBER_USER_UID}`)
        .set("Authorization", `Bearer ${guestToken}`)
        .send({})

      expect(response.status).toEqual(401)
    })
  })
})
