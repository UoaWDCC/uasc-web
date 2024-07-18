import Lock from "@/assets/icons/lock.svg"
import Link from "next/link"
const WorkInProgressComponent = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Lock />
      <h2>Events Page Unavailable</h2>
      <Link href="https://www.facebook.com/UoAsnowsports">
        Go to our Facebook events page
      </Link>
    </div>
  )
}

export default WorkInProgressComponent
