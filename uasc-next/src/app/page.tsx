import AppDataService, { Prices } from "@/services/AppData/AppDataService"
import HomeComponent from "./HomeComponent"

const Home = async () => {
  let data: Prices[]
  try {
    data = await AppDataService.getMembershipPricingDetails()
  } catch (e) {
    data = []
  }
  return (
    <>
      <HomeComponent data={data} />
    </>
  )
}

export default Home
