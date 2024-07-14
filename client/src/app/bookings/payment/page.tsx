"use client"

import { BookingContext } from "@/components/composite/Booking/BookingContext"
import BookingPayment from "@/components/composite/Booking/BookingPayment/BookingPayment"
import { useContext } from "react"

export default function BookingPaymentPage() {
  const { clientSecret } = useContext(BookingContext)
  return <BookingPayment clientSecret={clientSecret} />
}
