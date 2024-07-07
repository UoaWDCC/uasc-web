import {
  checkoutSessionMock,
  customerMock,
  productMock
} from "test-config/mocks/Stripe.mock"

import "dotenv/config"
import { _app } from "../index"
import supertest from "supertest"
import {
  ADMIN_USER_UID,
  GUEST_USER_UID,
  MEMBER_USER_UID,
  createUserData,
  createUserWithClaim,
  deleteUsersFromAuth
} from "./routes.mock"

/**
 * This needs to be updated as we add more stripe functions...
 */
jest.mock("stripe", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        customers: {
          create: () => {
            return { id: "test" }
          }
        },
        products: {
          search: () => {
            return { data: [productMock] }
          }
        },
        checkout: {
          sessions: {
            create: () => {
              return { client_secret: "test" }
            },
            list: () => {
              return {
                data: [checkoutSessionMock]
              }
            }
          }
        },
        webhooks: {
          constructEvent: () => {
            return {
              type: "payment_intent.succeeded",
              data: {
                object: {
                  customer: customerMock
                }
              }
            }
          }
        },
        coupons: {
          create: jest.fn().mockResolvedValue({
            id: "mock_coupon_id",
            amount_off: 4000, // amount off in cents
            currency: "nzd"
          })
        },
        promotionCodes: {
          create: jest.fn().mockResolvedValue({
            id: "mock_promotion_code_id",
            coupon: "mock_coupon_id",
            customer: "mock_customer_id"
          })
        }
      }
    })
  }
})

const usersToCreate: string[] = [
  ADMIN_USER_UID,
  MEMBER_USER_UID,
  GUEST_USER_UID
]

const createUsers = async () => {
  await Promise.all(
    usersToCreate.map(async (uid) => {
      await createUserData(uid)
    })
  )
}

let adminToken: string | undefined
let memberToken: string | undefined
let guestToken: string | undefined

global.beforeEach(async () => {
  adminToken = await createUserWithClaim(ADMIN_USER_UID, "admin")
  memberToken = await createUserWithClaim(MEMBER_USER_UID, "member")
  guestToken = await createUserWithClaim(GUEST_USER_UID)
})
global.afterEach(async () => {
  await deleteUsersFromAuth(usersToCreate)
})
global.afterAll(async () => {
  _app.close()
})

const request = supertest(_app)

export {
  // requester
  request,
  // methods
  createUsers,
  // tokens
  adminToken,
  memberToken,
  guestToken
}
