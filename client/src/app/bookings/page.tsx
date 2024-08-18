import BookingInformationAndCreation from "@/components/composite/Booking/BookingInformationAndCreation/BookingInformationAndCreation"
import { sanityQuery } from "../../../sanity/lib/utils"
import { LODGE_INFORMATION_GROQ_QUERY } from "@/models/sanity/LodgeInfo/Utils"

const BookingPage = async () => {
  const lodgeInfo = await sanityQuery(LODGE_INFORMATION_GROQ_QUERY)
  console.log(lodgeInfo)

  return (
    <>
      <BookingInformationAndCreation enableNetworkRequests />
    </>
  )
}

export default BookingPage
