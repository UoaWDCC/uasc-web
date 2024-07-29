import { MembershipTypes } from "@/models/Payment"

const membershipOrder: { [key in MembershipTypes]: number } = {
  uoa_student: 1,
  non_uoa_student: 2,
  returning_member: 3,
  new_non_student: 4
}

type Prices = {
  title: string
  name: MembershipTypes
  priceString: string
  originalPrice?: string
  extraInfo?: string
}

const sortMembershipPrices = (prices: Prices[]): Prices[] => {
  return prices.sort(
    (a, b) => membershipOrder[a.name] - membershipOrder[b.name]
  )
}

describe("sortMembershipPrices", () => {
  it("should return pricing details in the proper order", () => {
    const mockData: Prices[] = [
      {
        title: "All Other Students",
        name: "non_uoa_student",
        priceString: "$75"
      },
      {
        title: "Non-Student: New",
        name: "new_non_student",
        priceString: "$95"
      },
      {
        title: "All UoA Students",
        name: "uoa_student",
        priceString: "$65"
      },
      {
        title: "Non-Student: Returning",
        name: "returning_member",
        priceString: "$75"
      }
    ]

    const sortedData = sortMembershipPrices(mockData)

    const expectedOrder = [
      "uoa_student",
      "non_uoa_student",
      "returning_member",
      "new_non_student"
    ]

    const actualOrder = sortedData.map((price) => price.name)

    expect(actualOrder).toEqual(expectedOrder)
  })
})
