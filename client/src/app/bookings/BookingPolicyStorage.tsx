"use client"

import {
  BookingContext,
  type PolicyWithTextBlocks
} from "@/components/composite/Booking/BookingContext"
import { useContext, useEffect } from "react"

const BookingPolicyStorage = ({
  policies
}: {
  policies: PolicyWithTextBlocks[]
}) => {
  const { setPolicies } = useContext(BookingContext)
  useEffect(() => {
    setPolicies?.(policies)
  }, [policies, setPolicies])

  return null
}

export default BookingPolicyStorage
