import WorkInProgressComponent from "@/components/generic/WorkInProgressComponent/WorkInProgressComponent"
import Link from "next/link"
const Events = () => {
  return (
    <div className="fixed flex h-screen w-full flex-col items-center justify-center gap-4">
      <WorkInProgressComponent pageName="Events" />
      <Link
        href="https://www.facebook.com/UoAsnowsports"
        className="text-light-blue-100 hover:underline"
      >
        Go to our Facebook to sign up for the events!
      </Link>
    </div>
  )
}

export default Events
