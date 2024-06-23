import { useMembershipPricesQuery } from "services/AppData/AppDataQueries"
import Home from "pages/Home/Home"

/**
 * @returns Home component with data fetched from the server
 */
const WrappedHomeComponent = () => {
  const { data } = useMembershipPricesQuery()
  return <Home data={data || []} />
}

export default WrappedHomeComponent
