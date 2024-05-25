import { dateToFirestoreTimeStamp, datesToDateRange } from "./DateUtils"

describe("DateUtils Unit test", () => {
  it("should return correct firestore formatted timestamp", () => {
    const output = dateToFirestoreTimeStamp(new Date(0))
    expect(output).toEqual({
      seconds: 0,
      nanoseconds: 0
    })
  })

  describe("Date range converter", () => {
    it("should format dates properly", () => {
      const result = datesToDateRange("10/07/2020", "10/07/2020")
      expect(result).toHaveLength(1)
      expect(result[0].getUTCMonth()).toEqual(9)
    })
  })
})
