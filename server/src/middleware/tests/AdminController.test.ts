import AuthService from "business-layer/services/AuthService"
import { UserAccountTypes } from "business-layer/utils/AuthServiceClaims"
import { DEFAULT_BOOKING_MAX_SLOTS } from "business-layer/utils/BookingConstants"
import {
  dateToFirestoreTimeStamp,
  removeUnderscoresFromTimestamp
} from "data-layer/adapters/DateUtils"
import type { Event } from "data-layer/models/firebase"
import BookingDataService from "data-layer/services/BookingDataService"
import BookingHistoryService from "data-layer/services/BookingHistoryService"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import EventService from "data-layer/services/EventService"
import MailConfigService from "data-layer/services/MailConfigService"
import type { UserRecord } from "firebase-admin/auth"
import { Timestamp } from "firebase-admin/firestore"
import { StatusCodes } from "http-status-codes"
import { EncryptionService } from "../../business-layer/services/EncryptionService"
import { RedirectKeys } from "../../business-layer/utils/RedirectKeys"
import type { EmailTemplate } from "../../data-layer/models/MailConfig"
import {
  ADMIN_USER_UID,
  createUserDataWithStripeId,
  createUserWithClaim,
  GUEST_USER_UID,
  MEMBER_USER_UID
} from "../routes.mock"
import { adminToken, guestToken, memberToken, request } from "../routes.setup"

describe("AdminController endpoint tests", () => {
  describe("/admin/users", () => {
    it("should get users for admin", (done) => {
      request
        .get("/admin/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})
        .expect(StatusCodes.OK, done)
    })

    it("should fetch merged data for users", async () => {
      const response = await request
        .get("/admin/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(response.status).toEqual(StatusCodes.OK)
      expect(response.body.data).toHaveLength(3)
      expect(
        response.body.data.some(
          (item: any) => item.membership === UserAccountTypes.ADMIN
        )
      )
    })

    it("should reject invalid fetch quantities", async () => {
      const response = await request
        .get("/admin/users")
        .set("Authorization", `Bearer ${adminToken}`)
        .query({ toFetch: 101 })
        .send({})
      expect(response.status).toEqual(StatusCodes.BAD_REQUEST)

      const response2 = await request
        .get(`/admin/users`)
        .set("Authorization", `Bearer ${adminToken}`)
        .query({ toFetch: -1 })
        .send({})
      // we should fetch everything after the one we just got
      expect(response2.status).toEqual(StatusCodes.BAD_REQUEST)
    })

    it("should fetch merged data for users, after the offset", async () => {
      // Will fetch indexes 1,2
      const response = await request
        .get("/admin/users?toFetch=1")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(response.status).toEqual(StatusCodes.OK)
      expect(response.body.data).toHaveLength(1)
      expect(typeof response.body.nextCursor).toBe("string")

      const nextCursor = response.body.nextCursor

      const response2 = await request
        .get(`/admin/users`)
        .set("Authorization", `Bearer ${adminToken}`)
        .query({ toFetch: 3, cursor: nextCursor })
        .send({})
      // we should fetch everything after the one we just got
      expect(response2.body.data).toHaveLength(2)
    })

    it("Should not allow members to get users", (done) => {
      request
        .get("/admin/users")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})
        .expect(StatusCodes.UNAUTHORIZED, done)
    })
    it("Should not allow guests to get users", (done) => {
      request
        .get("/admin/users")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({})
        .expect(StatusCodes.UNAUTHORIZED, done)
    })
  })

  describe("/admin/users/promote and /admin/users/demote", () => {
    it("Should allow admins to promote guests", (done) => {
      request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: GUEST_USER_UID })
        .expect(StatusCodes.OK, done)
    })
    it("Should allow admins to demote members", (done) => {
      request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })
        .expect(StatusCodes.OK, done)
    })
    it("Should not allow admins to demote or promote admins", async () => {
      const res = await request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })
      expect(res.status).toEqual(StatusCodes.FORBIDDEN) // forbidden

      const res2 = await request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: ADMIN_USER_UID })
      expect(res2.status).toEqual(StatusCodes.FORBIDDEN) // forbidden
    })

    it("Should not allow guests/members to use demote/promote", async () => {
      const res = await request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({ uid: GUEST_USER_UID })
      expect(res.status).toEqual(StatusCodes.UNAUTHORIZED) // unauthorised

      const res2 = await request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ uid: MEMBER_USER_UID })
      expect(res2.status).toEqual(StatusCodes.UNAUTHORIZED) // unauthorised
    })

    it("Should conflict upon promoting members/demoting guests", async () => {
      const res = await request
        .put("/admin/users/promote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID })
      expect(res.status).toEqual(StatusCodes.CONFLICT) // conflict

      const res2 = await request
        .put("/admin/users/demote")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: GUEST_USER_UID })
      expect(res2.status).toEqual(StatusCodes.CONFLICT) // conflict
    })
  })

  describe("admin/users/demote-all", () => {
    const authService = new AuthService()

    it("Should not demote admin users", async () => {
      const res = await request
        .patch("/admin/users/demote-all")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})
      expect(res.status).toEqual(StatusCodes.OK)

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

      expect(res.status).toEqual(StatusCodes.OK)
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

      expect(res.status).toEqual(StatusCodes.CREATED)
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
      const res = await request
        .post("/admin/bookings/make-dates-available")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate,
          slots: 69
        })

      expect(res.status).toEqual(StatusCodes.BAD_REQUEST) // exceed maximum

      const res2 = await request
        .post("/admin/bookings/make-dates-available")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate
        })

      expect(res2.status).toEqual(StatusCodes.CREATED)
      expect(res2.body.updatedBookingSlots).toHaveLength(6)
      expect(
        removeUnderscoresFromTimestamp(res2.body.updatedBookingSlots[0].date)
      ).toEqual(startDate)
      expect(
        removeUnderscoresFromTimestamp(res2.body.updatedBookingSlots[5].date)
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

      const res3 = await request
        .post("/admin/bookings/make-dates-available")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate,
          slots: CUSTOM_SLOTS
        })
      expect(res3.body.updatedBookingSlots).toHaveLength(6)
      expect(
        removeUnderscoresFromTimestamp(res3.body.updatedBookingSlots[0].date)
      ).toEqual(startDate)
      expect(
        removeUnderscoresFromTimestamp(res3.body.updatedBookingSlots[5].date)
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

      expect(res.status).toEqual(StatusCodes.CREATED)
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

      expect(res.status).toEqual(StatusCodes.CREATED)
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

      expect(res.status).toEqual(StatusCodes.CREATED)
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

      expect(res.status).toEqual(StatusCodes.CREATED)
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

      expect(res.status).toEqual(StatusCodes.CREATED)
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

      expect(res.status).toEqual(StatusCodes.CREATED)
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

      expect(res.status).toEqual(StatusCodes.OK)
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

      expect(res.status).toEqual(StatusCodes.UNAUTHORIZED)
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

      expect(res.status).toEqual(StatusCodes.OK)
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

      expect(res.status).toEqual(StatusCodes.NOT_FOUND)
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

      expect(deleteRes.status).toEqual(StatusCodes.OK)
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

      expect(response.status).toEqual(StatusCodes.OK)
    })

    it("Should not allow adding a coupon to a user without stripe_id", async () => {
      const response = await request
        .post("/admin/users/add-coupon")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: MEMBER_USER_UID, quantity: 5 })

      expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
    })

    it("Should return 404 if user is not found", async () => {
      const response = await request
        .post("/admin/users/add-coupon")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ uid: "non_existent_user", quantity: 5 })

      expect(response.status).toEqual(StatusCodes.NOT_FOUND)
    })

    it("Should not allow members to add a coupon", async () => {
      const response = await request
        .post("/admin/users/add-coupon")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ uid: MEMBER_USER_UID, quantity: 5 })

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it("Should not allow guests to add a coupon", async () => {
      const response = await request
        .post("/admin/users/add-coupon")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({ uid: MEMBER_USER_UID, quantity: 5 })

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED)
    })
  })

  describe("/admin/users/:uid", () => {
    it("Should get user data for admin", async () => {
      const response = await request
        .get(`/admin/users/${MEMBER_USER_UID}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(response.status).toEqual(StatusCodes.OK)
      expect(response.body.data.uid).toEqual(MEMBER_USER_UID)
    })

    it("Should return 404 if user not found", async () => {
      const response = await request
        .get(`/admin/users/someRandomUser`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(response.status).toEqual(StatusCodes.NOT_FOUND)
      expect(response.body.error).toEqual("User not found")
    })

    it("Should not allow members to get individual user data", async () => {
      const response = await request
        .get(`/admin/users/${MEMBER_USER_UID}`)
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it("Should not allow guests to get individual user data", async () => {
      const response = await request
        .get(`/admin/users/${MEMBER_USER_UID}`)
        .set("Authorization", `Bearer ${guestToken}`)
        .send({})

      expect(response.status).toEqual(StatusCodes.UNAUTHORIZED)
    })
  })
  describe("/admin/bookings/history", () => {
    it("should be scoped to admins only", async () => {
      const res = await request
        .get(`/admin/bookings/history?limit=100`)
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})
      expect(res.status).toEqual(StatusCodes.UNAUTHORIZED)

      const res2 = await request
        .get(`/admin/bookings/history?limit=100`)
        .set("Authorization", `Bearer ${guestToken}`)
        .send({})
      expect(res2.status).toEqual(StatusCodes.UNAUTHORIZED)

      const res3 = await request
        .get(`/admin/bookings/history?limit=100`)
        .send({})

      expect(res3.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it("should be able to fetch the latest X bookings", async () => {
      const bookingHistoryService = new BookingHistoryService()

      const startDate = dateToFirestoreTimeStamp(new Date(2002, 10, 8))
      const endDate = dateToFirestoreTimeStamp(new Date(2002, 10, 10))

      bookingHistoryService.addBookingDeletedEvent({
        uid: "user-removed-from-booking",
        start_date: startDate as Timestamp,
        end_date: endDate as Timestamp,
        event_type: "removed_user_from_booking",
        timestamp: Timestamp.now()
      })

      bookingHistoryService.addBookingDeletedEvent({
        uid: "user-removed-from-booking",
        start_date: startDate as Timestamp,
        end_date: endDate as Timestamp,
        event_type: "removed_user_from_booking",
        timestamp: Timestamp.now()
      })

      const res = await request
        .get(`/admin/bookings/history?limit=1`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(res.status).toEqual(StatusCodes.OK)
      expect(res.body.historyEvents).toHaveLength(1)

      /**
       * Pagination Test
       */
      const res2 = await request
        .get(`/admin/bookings/history?limit=100&cursor=${res.body.nextCursor}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(res2.status).toEqual(StatusCodes.OK)
      expect(res2.body.historyEvents).toHaveLength(1)

      const res3 = await request
        .get(`/admin/bookings/history?limit=2`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({})

      expect(res3.body.historyEvents).toHaveLength(2)
    })
  })

  describe("/admin/events", () => {
    const event1: Event = {
      title: "UASC New event",
      physical_start_date: dateToFirestoreTimeStamp(new Date()),
      location: "UASC",
      sign_up_start_date: dateToFirestoreTimeStamp(new Date()),
      sign_up_end_date: dateToFirestoreTimeStamp(new Date())
    }
    const eventService = new EventService()

    it("should let admins create an event", async () => {
      const res = await request
        .post("/admin/events")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ data: event1 })

      expect(res.status).toEqual(StatusCodes.CREATED)

      // There should not be more than 1, even if we request more
      expect((await eventService.getAllEvents(69)).events).toHaveLength(1)
    })
    it("should let admins edit an event", async () => {
      const newEvent = await eventService.createEvent(event1)
      const newDate = dateToFirestoreTimeStamp(new Date())
      const res = await request
        .patch(`/admin/events/${newEvent.id}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          title: "Cool event!",
          location: "UoA",
          physical_start_date: newDate
        } as Partial<Event>)
      expect(res.status).toEqual(StatusCodes.OK)
      const fetchedEvent = await eventService.getEventById(newEvent.id)
      expect(fetchedEvent.title).toEqual("Cool event!")
      expect(fetchedEvent.location).toEqual("UoA")
      expect(
        removeUnderscoresFromTimestamp(fetchedEvent.physical_start_date)
      ).toEqual(newDate)
    })
  })
  describe("GET /admin/events/:id", () => {
    const event1: Event = {
      title: "UASC New event",
      physical_start_date: dateToFirestoreTimeStamp(new Date()),
      location: "UASC",
      sign_up_start_date: dateToFirestoreTimeStamp(new Date()),
      sign_up_end_date: dateToFirestoreTimeStamp(new Date())
    }
    const eventService = new EventService()

    it("should return the event details for a valid event ID", async () => {
      const { id: id1 } = await eventService.createEvent(event1)
      const res = await request
        .get(`/admin/events/${id1}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send()
      expect(res.status).toEqual(StatusCodes.OK)
      expect(res.body.data).toBeDefined()
      expect(res.body.data.title).toEqual("UASC New event")
      expect(res.body.data.location).toEqual("UASC")
    })

    it("should return 404 if the event does not exist", async () => {
      const res = await request
        .get("/admin/events/random-event")
        .set("Authorization", `Bearer ${adminToken}`)
        .send()
      expect(res.status).toEqual(StatusCodes.NOT_FOUND)
      expect(res.body.error).toEqual("Event not found.")
    })
  })

  describe("DELETE /admin/events/:id", () => {
    const event1: Event = {
      title: "UASC New event",
      physical_start_date: dateToFirestoreTimeStamp(new Date()),
      location: "UASC",
      sign_up_start_date: dateToFirestoreTimeStamp(new Date()),
      sign_up_end_date: dateToFirestoreTimeStamp(new Date())
    }
    const eventService = new EventService()

    it("should delete existing event", async () => {
      const { id: id1 } = await eventService.createEvent(event1)
      const res = await request
        .delete(`/admin/events/${id1}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send()
      expect(res.status).toEqual(StatusCodes.NO_CONTENT)

      const event = await eventService.getEventById(id1)

      expect(event).not.toBeDefined()
    })
  })

  describe("/admin/redirect/{redirectKey}", () => {
    const originalEnv = process.env
    beforeEach(() => {
      process.env[`REDIRECT_${RedirectKeys.MEMBERS_GOOGLE_SHEET_LINK}`] =
        "https://test.example.com"
    })

    afterEach(() => {
      process.env = originalEnv
    })

    it("should return the correct URL for valid redirect key", async () => {
      const res = await request
        .get(`/admin/redirect/${RedirectKeys.MEMBERS_GOOGLE_SHEET_LINK}`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.OK)
      expect(res.body.url).toEqual("https://test.example.com")
    })

    it("should be case insensitive for redirect keys", async () => {
      const res = await request
        .get(
          `/admin/redirect/${RedirectKeys.MEMBERS_GOOGLE_SHEET_LINK.toLowerCase()}`
        )
        .set("Authorization", `Bearer ${adminToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.OK)
      expect(res.body.url).toEqual("https://test.example.com")
    })

    it("should return 404 for invalid redirect keys", async () => {
      const res = await request
        .get("/admin/redirect/nonexistent")
        .set("Authorization", `Bearer ${adminToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.NOT_FOUND)
      expect(res.body.error).toBeDefined()
    })

    it("should return 404 when environment variable is not set", async () => {
      delete process.env.unset

      const res = await request
        .get(`/admin/redirect/unset`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.NOT_FOUND)
      expect(res.body.error).toBeDefined()
    })

    it("should not be accessible by non-admin users", async () => {
      const res = await request
        .get("/admin/redirect/test")
        .set("Authorization", `Bearer ${memberToken}`)
        .send()
      expect(res.status).toEqual(StatusCodes.UNAUTHORIZED)

      const res2 = await request
        .get("/admin/redirect/test")
        .set("Authorization", `Bearer ${guestToken}`)
        .send()
      expect(res2.status).toEqual(StatusCodes.UNAUTHORIZED)
    })
  })

  describe("/admin/mail/config", () => {
    it("should allow admins to get mail configuration", async () => {
      const res = await request
        .get("/admin/mail/config")
        .set("Authorization", `Bearer ${adminToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.OK)
    })

    it("should not allow members to get mail configuration", async () => {
      const res = await request
        .get("/admin/mail/config")
        .set("Authorization", `Bearer ${memberToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it("should not allow guests to get mail configuration", async () => {
      const res = await request
        .get("/admin/mail/config")
        .set("Authorization", `Bearer ${guestToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.UNAUTHORIZED)
    })

    it("should allow admins to update mail configuration", async () => {
      const configData = {
        config: {
          email: "test@example.com",
          fromHeader: "Test UASC Bookings"
        }
      }

      const res = await request
        .put("/admin/mail/config")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(configData)

      expect(res.status).toEqual(StatusCodes.OK)

      // Verify the config was saved
      const mailConfigService = new MailConfigService(new EncryptionService())
      const savedConfig = await mailConfigService.getMailConfig()
      expect(savedConfig).toBeDefined()
      expect(savedConfig.email).toEqual("test@example.com")
      expect(savedConfig.fromHeader).toEqual("Test UASC Bookings")
    })

    it("should not allow members to update mail configuration", async () => {
      const res = await request
        .put("/admin/mail/config")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({ config: { email: "test@example.com" } })

      expect(res.status).toEqual(StatusCodes.UNAUTHORIZED)
    })
  })

  describe("/admin/mail/templates", () => {
    const mailConfigService = new MailConfigService(new EncryptionService())

    // Setup a test template
    beforeEach(async () => {
      const testTemplate: EmailTemplate = {
        id: "test_template",
        name: "Test Template",
        content:
          "p Hello #{name}, your booking is from #{startDate} to #{endDate}",
        description: "Test description",
        updatedAt: new Date()
      }

      await mailConfigService.updateEmailTemplate(testTemplate)
    })

    it("should allow admins to get all email templates", async () => {
      const res = await request
        .get("/admin/mail/templates")
        .set("Authorization", `Bearer ${adminToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.OK)
      expect(res.body.templates).toBeDefined()
      expect(res.body.templates.length).toBeGreaterThanOrEqual(1)
    })

    it("should allow admins to get a specific email template", async () => {
      const res = await request
        .get("/admin/mail/templates/test_template")
        .set("Authorization", `Bearer ${adminToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.OK)
      expect(res.body.template).toBeDefined()
      expect(res.body.template.id).toEqual("test_template")
      expect(res.body.template.name).toEqual("Test Template")
      expect(res.body.template.content).toContain("Hello #{name}")
    })

    it("should return 404 for non-existent template", async () => {
      const res = await request
        .get("/admin/mail/templates/nonexistent_template")
        .set("Authorization", `Bearer ${adminToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.NOT_FOUND)
      expect(res.body.error).toBeDefined()
    })

    it("should allow admins to update an email template", async () => {
      const templateData = {
        id: "booking_confirmation",
        name: "Updated Booking Confirmation",
        content:
          "p Hello there #{name}! Your booking from #{startDate} to #{endDate} is confirmed.",
        description: "Updated template for booking confirmations"
      }

      const res = await request
        .put("/admin/mail/templates")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(templateData)

      expect(res.status).toEqual(StatusCodes.OK)

      // Verify the template was saved
      const template = await mailConfigService.getEmailTemplate(
        "booking_confirmation"
      )
      expect(template).toBeDefined()
      expect(template.name).toEqual("Updated Booking Confirmation")
      expect(template.content).toContain("Hello there #{name}!")
    })

    it("should reject invalid pug templates", async () => {
      const templateData = {
        id: "booking_confirmation",
        name: "Invalid Template",
        content: "p Hello #{name! Your booking is confirmed.", // Missing closing brace
        description: "Invalid template"
      }

      const res = await request
        .put("/admin/mail/templates")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(templateData)

      expect(res.status).toEqual(StatusCodes.BAD_REQUEST)
      expect(res.body.error).toContain("Invalid template content")
    })

    it("should not allow members to access or update templates", async () => {
      const res = await request
        .get("/admin/mail/templates")
        .set("Authorization", `Bearer ${memberToken}`)
        .send()

      expect(res.status).toEqual(StatusCodes.UNAUTHORIZED)

      const res2 = await request
        .put("/admin/mail/templates")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          id: "booking_confirmation",
          name: "Test",
          content: "p Test"
        })

      expect(res2.status).toEqual(StatusCodes.UNAUTHORIZED)
    })
  })
})
