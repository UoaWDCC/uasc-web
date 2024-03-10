export default class FireBaseError extends Error {
  protected statusCode: number
  constructor(name: string, statusCode: number, message?: string) {
    super(message)
    this.name = name
    this.statusCode = statusCode
  }
}
