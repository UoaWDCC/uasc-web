import {
  request,
  memberToken,
  guestToken,
  createUsers,
  adminToken
} from "../routes.setup"
import {
  ADMIN_USER_UID,
  GUEST_USER_UID,
  MEMBER_USER_UID,
  createUserData
} from "../routes.mock"
import { dateToFirestoreTimeStamp } from "data-layer/adapters/DateUtils"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import BookingDataService from "data-layer/services/BookingDataService"
import { cleanFirestore } from "test-config/TestUtils"
import { Timestamp } from "firebase-admin/firestore"

describe("BookingController endpoint tests", () => {
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

    it("should return an empty array for a user with no bookings", async () => {
      const res = await request
        .get("/bookings")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})

      expect(res.status).toBe(200)
      expect(res.body.dates).toEqual([])
    })

    it("should return all booking dates for a user with bookings", async () => {
      const bookingDataService = new BookingDataService()
      const bookingSlotService = new BookingSlotService()

      const { id: bookingSlotId1 } = await bookingSlotService.createBookingSlot(
        {
          date: Timestamp.fromDate(new Date("2024-06-06")),
          max_bookings: 9
        }
      )

      const { id: bookingSlotId2 } = await bookingSlotService.createBookingSlot(
        {
          date: Timestamp.fromDate(new Date("2024-06-10")),
          max_bookings: 9
        }
      )

      await bookingDataService.createBooking({
        user_id: MEMBER_USER_UID,
        booking_slot_id: bookingSlotId1,
        stripe_payment_id: ""
      })
      await bookingDataService.createBooking({
        user_id: MEMBER_USER_UID,
        booking_slot_id: bookingSlotId2,
        stripe_payment_id: ""
      })

      const res = await request
        .get("/bookings")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({})

      expect(res.status).toBe(200)
      expect(res.body.dates).toContainEqual("2024-06-06")
      expect(res.body.dates).toContainEqual("2024-06-10")
      expect(res.body.dates).not.toContainEqual("2023-12-16")
      expect(res.body.dates.length).toBe(2)
    })

    it("should return 401 for unauthorized users", async () => {
      const bookingDataService = new BookingDataService()
      const bookingSlotService = new BookingSlotService()

      const { id: bookingSlotId1 } = await bookingSlotService.createBookingSlot(
        {
          date: Timestamp.fromDate(new Date("2002-06-06")),
          max_bookings: 9
        }
      )

      await bookingDataService.createBooking({
        user_id: MEMBER_USER_UID,
        booking_slot_id: bookingSlotId1,
        stripe_payment_id: ""
      })

      const res = await request
        .get("/bookings")
        .set("Authorization", `Bearer ${guestToken}`)
        .send({})

      expect(res.status).toEqual(401)
    })
  })
  describe("/bookings/fetch-users", () => {
    beforeEach(async () => {
      await createUsers()
    })

    afterEach(async () => {
      await cleanFirestore()
    })

    it("should return users with bookings (and their corresponding bookingIds) within the date range", async () => {
      const bookingSlotService = new BookingSlotService()
      const bookingDataService = new BookingDataService()

      const startDate = dateToFirestoreTimeStamp(new Date("01/01/2022"))
      const endDate = dateToFirestoreTimeStamp(new Date("12/31/2023"))

      const slot1 = await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("02/01/2023")),
        max_bookings: 10
      })

      const slot2 = await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("03/01/2023")),
        max_bookings: 10
      })

      // Important test case, don't return dates with no bookings
      await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("01/01/2023")),
        max_bookings: 10
      })

      const bookingResult1 = await bookingDataService.createBooking({
        user_id: MEMBER_USER_UID,
        booking_slot_id: slot1.id,
        stripe_payment_id: ""
      })
      const id1 = bookingResult1.id

      const bookingResult2 = await bookingDataService.createBooking({
        user_id: GUEST_USER_UID,
        booking_slot_id: slot2.id,
        stripe_payment_id: ""
      })
      const id2 = bookingResult2.id

      const res = await request
        .post("/bookings/fetch-users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate
        })
      console.log(res.body.data[1])

      expect(res.status).toEqual(200)
      expect(res.body.data).toHaveLength(2)
      expect.arrayContaining([
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({ uid: MEMBER_USER_UID })
          ])
        }),
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({ uid: GUEST_USER_UID })
          ])
        }),
        expect.objectContaining({
          bookingIds: expect.arrayContaining([
            expect.objectContaining({ bookingId: id1 })
          ])
        }),
        expect.objectContaining({
          bookingIds: expect.arrayContaining([
            expect.objectContaining({ bookingId: id2 })
          ])
        })
      ])
    })

    it("should return an empty array if no users have bookings within the date range", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("01/01/2024"))
      const endDate = dateToFirestoreTimeStamp(new Date("12/31/2024"))

      const bookingSlotService = new BookingSlotService()
      const bookingDataService = new BookingDataService()

      const slot1 = await bookingSlotService.createBookingSlot({
        date: dateToFirestoreTimeStamp(new Date("02/01/2025")), // Out of range date
        max_bookings: 10
      })

      await bookingDataService.createBooking({
        user_id: MEMBER_USER_UID,
        booking_slot_id: slot1.id,
        stripe_payment_id: ""
      })

      const res = await request
        .post("/bookings/fetch-users")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate
        })

      expect(res.status).toEqual(200)
      expect(res.body.data).toHaveLength(0)
    })

    it("should return unauthorized error for non-admin users", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("01/01/2023"))
      const endDate = dateToFirestoreTimeStamp(new Date("12/31/2023"))

      const res = await request
        .post("/bookings/fetch-users")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          startDate,
          endDate
        })

      expect(res.status).toEqual(401)
    })
  })

  describe("/bookings/create-bookings", () => {
    beforeEach(async () => {
      await createUsers()
    })

    afterEach(async () => {
      await cleanFirestore()
    })

    it("should create bookings for userIds within the date range", async () => {
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
        .post("/bookings/create-bookings")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate,
          userIds: [GUEST_USER_UID, MEMBER_USER_UID]
        })

      expect(res.status).toEqual(200)
      expect(res.body.data).toHaveLength(3)
      expect.arrayContaining([
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({ uid: MEMBER_USER_UID })
          ])
        }),
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({ uid: GUEST_USER_UID })
          ])
        })
      ])
    })

    it("should return unauthorized error for non-admin users", async () => {
      const startDate = dateToFirestoreTimeStamp(new Date("01/01/2023"))
      const endDate = dateToFirestoreTimeStamp(new Date("12/31/2023"))

      const res = await request
        .post("/bookings/create-bookings")
        .set("Authorization", `Bearer ${memberToken}`)
        .send({
          startDate,
          endDate,
          userIds: []
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

      await bookingDataService.createBooking({
        user_id: MEMBER_USER_UID,
        booking_slot_id: slot1.id,
        stripe_payment_id: ""
      })

      await bookingDataService.createBooking({
        user_id: MEMBER_USER_UID,
        booking_slot_id: slot1.id,
        stripe_payment_id: ""
      })

      const res = await request
        .post("/bookings/create-bookings")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          startDate,
          endDate,
          userIds: [MEMBER_USER_UID]
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
    })
  })
})