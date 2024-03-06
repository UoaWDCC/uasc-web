export type AuthenticationError = {
  message: "You do not have permission to perform this action"
  details: { [name: string]: unknown }
}
