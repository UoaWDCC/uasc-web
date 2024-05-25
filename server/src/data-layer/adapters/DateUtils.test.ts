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
    it("should format single date properly", () => {
      const result = datesToDateRange(
        new Date("10/07/2020"),
        new Date("10/07/2020")
      )
      expect(result).toHaveLength(1)
      expect(result[0].getUTCMonth()).toEqual(9)
    })
    it("should format dates properly", () => {
      const result = datesToDateRange(
        new Date("10/07/2020"),
        new Date("10/12/2020")
      )
      expect(result).toHaveLength(6)

      expect(result[0]).toEqual(new Date("10/07/2020"))
      expect(result[1]).toEqual(new Date("10/08/2020"))
      expect(result[2]).toEqual(new Date("10/09/2020"))
      expect(result[3]).toEqual(new Date("10/10/2020"))
      expect(result[4]).toEqual(new Date("10/11/2020"))
      expect(result[5]).toEqual(new Date("10/12/2020"))
    })
  })
})
