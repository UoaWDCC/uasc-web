import { components } from "./__generated__/schema"

export type UserAdditionalInfo = components["schemas"]["UserAdditionalInfo"]

export type UserClaims = {
  admin?: boolean
  member?: boolean
}
