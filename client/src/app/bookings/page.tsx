import BookingInformationAndCreation from "@/components/composite/Booking/BookingInformationAndCreation/BookingInformationAndCreation"
import { SanityImageUrl, sanityQuery } from "../../../sanity/lib/utils"
import {
  LODGE_INFORMATION_GROQ_QUERY,
  LodgeInformation
} from "@/models/sanity/LodgeInfo/Utils"
import { PortableText } from "@portabletext/react"

const BookingPage = async () => {
  const lodgeInfo = await sanityQuery<LodgeInformation[]>(
    LODGE_INFORMATION_GROQ_QUERY
  )

  /**
   * We assume there will be only one based on the way {@link LodgeInformation}
   * is set up in sanity
   */
  const lodgeInfoSingleton: LodgeInformation | undefined = lodgeInfo[0]

  const RenderedContent = () => {
    return (
      lodgeInfoSingleton?.information && (
        <PortableText value={lodgeInfoSingleton.information} />
      )
    )
  }

  const processedImages =
    lodgeInfoSingleton?.imageUrls?.map((item) =>
      item.url
        ? new SanityImageUrl(item.url).autoFormat().width(700).toString()
        : ""
    ) || []

  return (
    <>
      <BookingInformationAndCreation
        enableNetworkRequests
        lodgeInfoProps={{
          children: <RenderedContent />,
          images: processedImages
        }}
      />
    </>
  )
}

export default BookingPage
