import { dateToFirestoreTimeStamp } from "./FirestoreUtils"

describe("FirestoreUtils Integration test", () => {
  it("should return correct firestore formatted timestamp", () => {
    const output = dateToFirestoreTimeStamp(new Date(0))
    expect(output).toEqual({
      seconds: 0,
      nanoseconds: 0
    })
  })
})
