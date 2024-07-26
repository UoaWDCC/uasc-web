import Gear from "@/assets/icons/gear-spinner.svg"
import { Footer } from "../Footer/Footer"
const Loader = () => {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <Gear className="w-[50px]" />
        <h2 className="text-dark-blue-100 font-bold">Loading...</h2>
      </div>
      <Footer />
    </>
  )
}

export default Loader
