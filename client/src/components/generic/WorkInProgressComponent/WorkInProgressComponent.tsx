import Lock from "@/assets/icons/lock.svg"
import Link from "next/link"
const WorkInProgressComponent = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Lock className="fill-dark-blue-100" />
      <h2 className="italic">Events Page Unavailable</h2>
      <Link
        href="https://www.facebook.com/UoAsnowsports"
        className="text-light-blue-100 hover:underline"
      >
        Go to our Facebook events page
      </Link>
    </div>
  )
}

export default WorkInProgressComponent
