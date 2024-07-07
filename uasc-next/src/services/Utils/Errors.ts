export class UnavailableBookingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "UnavailableBookingError"
  }
}
