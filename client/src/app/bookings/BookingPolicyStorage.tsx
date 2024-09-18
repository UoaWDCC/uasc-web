"use client"

import { BookingContext } from "@/components/composite/Booking/BookingContext"
import { useContext, useEffect } from "react"
import { Policies } from "@/models/sanity/Policies/Utils"

const BookingPolicyStorage = ({ policies }: { policies: Policies[] }) => {
  const { setPolicies } = useContext(BookingContext)
  useEffect(() => {
    setPolicies?.(policies)
  }, [policies, setPolicies])

  return null
}

export default BookingPolicyStorage
