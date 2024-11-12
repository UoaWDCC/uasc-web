"use client"

import { useState } from "react"
import LodgeInfo, { ILodgeInfo } from "../../LodgeInfo/LodgeInfo"
import {
  CreateBookingSection,
  ICreateBookingSection
} from "../BookingCreation/BookingCreation"
import { ProtectedCreateBookingSection } from "../BookingCreation/ProtectedCreateBookingSection"
import { useSearchParams } from "next/navigation"
import { LodgePricingProps } from "@/services/AppData/AppDataService"

/**
 * Utility type determining what should be displayed to the user in {@link BookingInformationAndCreation}
 */
type BookingStages = "booking-information" | "booking-creation"

interface IBookingInformationAndCreation {
  /**
   * The required props for {@link CreateBookingSection}
   *
   * Optional if {@link enableNetworkRequests} is set to `false`
   */
  bookingCreationProps?: ICreateBookingSection

  /**
   * The required props for {@link LodgeInfo}
   */
  lodgeInfoProps?: Omit<ILodgeInfo, "handleBookLodgeClick">

  /**
   * Only set to `true` if embedding on page, for storybook purposes keep as false.
   *
   * Uses the {@link ProtectedCreateBookingSection} component if set to `true` otherwise
   * uses the implementation of{@link CreateBookingSection}
   */
  enableNetworkRequests?: boolean

  /**
   * How much each the different types of bookings cost, based on {@link LodgePricingProps}
   */
  lodgePricing: LodgePricingProps
}

/**
 * Wrapper component that handles presentation for the booking creation page,
 * with the information screen to allow users to know more about the lodge
 */
const BookingInformationAndCreation = ({
  bookingCreationProps,
  lodgeInfoProps,
  enableNetworkRequests,
  lodgePricing
}: IBookingInformationAndCreation) => {
  const params = useSearchParams()

  const defaultStage: BookingStages =
    params.get("skip-info") === "true"
      ? "booking-creation"
      : "booking-information"

  const [currentStage, setCurrentStage] = useState<BookingStages>(defaultStage)

  switch (currentStage) {
    case "booking-information":
      return (
        <LodgeInfo
          {...lodgeInfoProps}
          handleBookLodgeClick={() => {
            setCurrentStage("booking-creation")
          }}
        />
      )
    case "booking-creation":
      if (enableNetworkRequests) {
        return <ProtectedCreateBookingSection lodgePrices={lodgePricing} />
      } else {
        return (
          <CreateBookingSection
            {...bookingCreationProps}
            lodgePrices={lodgePricing}
          />
        )
      }
  }
}

export default BookingInformationAndCreation
