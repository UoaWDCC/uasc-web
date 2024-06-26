import { Timestamp } from "firebase-admin/firestore"
import {
  UTCDateToDdMmYyyy,
  dateToFirestoreTimeStamp,
  timestampsInRange
} from "./DateUtils"

describe("DateUtils Unit test", () => {
  it("should return correct firestore formatted timestamp", () => {
    const output = dateToFirestoreTimeStamp(new Date(0))
    expect(output).toEqual({
      seconds: 0,
      nanoseconds: 0
    })
  })

  describe("timestampsToRange", () => {
    it("should generate correct range of timestamps", () => {
      const startDate = Timestamp.fromDate(new Date("2024-01-01T00:00:00Z"))
      const endDate = Timestamp.fromDate(new Date("2024-01-03T00:00:00Z"))
      const steps = 1

      const result = timestampsInRange(startDate, endDate, steps)

      expect(result.length).toBe(3)
      expect(result[0].toDate().toISOString()).toBe("2024-01-01T00:00:00.000Z")
      expect(result[1].toDate().toISOString()).toBe("2024-01-02T00:00:00.000Z")
      expect(result[2].toDate().toISOString()).toBe("2024-01-03T00:00:00.000Z")
    })
  })
  describe("dd/mm/yyyy formatting", () => {
    it("should properly format the object into the right format", () => {
      const testDate = new Date("2024-01-09")
      testDate.setUTCHours(0, 0, 0, 0)

      const result = UTCDateToDdMmYyyy(testDate)

      expect(result).toEqual("09/01/2024")
    })
  })
})
