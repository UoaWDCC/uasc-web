"use client"

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from "@stripe/react-stripe-js"
import { stripePromise } from "@/services/Stripe"

interface IPaymentFormProps {
  clientSecret: string
  onComplete: () => void
}

export const PaymentForm = ({
  clientSecret,
  onComplete
}: IPaymentFormProps) => {
  return (
    <EmbeddedCheckoutProvider
      // @ts-ignore
      stripe={stripePromise}
      options={{
        clientSecret,
        onComplete
      }}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}
