import { components } from "./__generated__/schema"

export type UserAdditionalInfo = components["schemas"]["UserAdditionalInfo"]

export type ReducedUserAdditionalInfo =
  components["schemas"]["Pick_UserAdditionalInfo.Exclude_keyofUserAdditionalInfo.stripe_id__"]

export type UserClaims = {
  admin?: boolean
  member?: boolean
}
