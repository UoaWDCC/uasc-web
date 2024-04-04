import { UserAdditionalInfo } from "data-layer/models/firebase"
import jwt from "jsonwebtoken"
import { Timestamp } from "firebase-admin/firestore"

export default class UserEditSelf {
  public async changeDateOfBirth(newDateOfBirth: Timestamp) {}
}
