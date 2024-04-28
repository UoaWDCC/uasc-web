import fetchClient from "services/OpenApiFetchClient"

const PaymentService = {
  getMembershipPaymentClientSecret: async function () {
    const { data } = await fetchClient.GET("/payment/membership", {})
    return data
  }
} as const

export default PaymentService
