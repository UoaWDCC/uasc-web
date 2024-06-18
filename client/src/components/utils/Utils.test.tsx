import { DateUtils } from "./DateUtils"

describe("Date Utilities", () => {
  describe("UTC formatting with date", () => {
    it("should set the hours back to zero", () => {
      const localDate = new Date("2022-01-01T10:10:00.000Z")
      const updatedDate = DateUtils.convertLocalDateToUTCDate(localDate)
      expect(updatedDate.getUTCHours()).toEqual(0)
      expect(updatedDate.getUTCMinutes()).toEqual(0)
      expect(updatedDate.getUTCSeconds()).toEqual(0)
    })
  })
})
