import PortableTextRenderer from "@/components/utils/PortableTextRenderer"
import type { PolicyWithTextBlocks } from "@/components/composite/Booking/BookingContext"
import BookingInformationAndCreation from "@/components/composite/Booking/BookingInformationAndCreation/BookingInformationAndCreation"
import {
  LODGE_INFORMATION_GROQ_QUERY,
  type LodgeInformation
} from "@/models/sanity/LodgeInfo/Utils"
import {
  POLICIES_GROQ_QUERY,
  type Policies
} from "@/models/sanity/Policies/Utils"
import AppDataService from "@/services/AppData/AppDataService"
import { SanityImageUrl, sanityQuery } from "../../../sanity/lib/utils"
import BookingPolicyStorage from "./BookingPolicyStorage"

const BookingPage = async () => {
  const lodgeInfo = await sanityQuery<LodgeInformation[]>(
    LODGE_INFORMATION_GROQ_QUERY
  )

  const lodgePrices = await AppDataService.getLodgePrices()
  /**
   * We assume there will be only one based on the way {@link LodgeInformation}
   * is set up in sanity
   */
  const lodgeInfoSingleton: LodgeInformation | undefined =
    // However this can only be a singleton if the list is non-empty
    lodgeInfo.length > 0 ? lodgeInfo[0] : undefined

  const RenderedContent = () => {
    return (
      lodgeInfoSingleton?.information && (
        <PortableTextRenderer value={lodgeInfoSingleton.information} />
      )
    )
  }

  const processedImages =
    lodgeInfoSingleton?.imageUrls?.map((item) =>
      item.url
        ? new SanityImageUrl(item.url).autoFormat().width(700).toString()
        : ""
    ) || []

  const fetchedPolicies = await sanityQuery<Policies[]>(POLICIES_GROQ_QUERY)
  /** We assume there will be only one based on the way {@link Policies } is set up in sanity */
  // If list isn't empty, assign all policies to the variable
  const policies: PolicyWithTextBlocks[] = fetchedPolicies.map((policy) => {
    return {
      ...policy,
      information: policy.information ? (
        <span>
          <PortableTextRenderer
            value={policy.information}
            headerColorClass={"white"}
            textColorClass={"white"}
          />
        </span>
      ) : (
        <></>
      )
    }
  })

  return (
    <>
      <BookingInformationAndCreation
        enableNetworkRequests
        lodgePricing={lodgePrices}
        lodgeInfoProps={{
          children: <RenderedContent />,
          imageSrcs: processedImages
        }}
      />
      <BookingPolicyStorage policies={policies} />
    </>
  )
}

export default BookingPage
