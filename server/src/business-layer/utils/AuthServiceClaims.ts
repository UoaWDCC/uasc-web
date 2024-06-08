export const AuthServiceClaims = {
  MEMBER: "member",
  ADMIN: "admin"
} as const

export enum UserAccountTypes {
  ADMIN = "admin",
  MEMBER = "member",
  GUEST = "guest"
}
