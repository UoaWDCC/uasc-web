import Lock from "@/assets/icons/lock.svg"
import Link from "next/link"
interface WorkInProgressComponentProps {
  pageName: string
}

type props = WorkInProgressComponentProps
const WorkInProgressComponent = ({ pageName }: props) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Lock className="fill-dark-blue-100" />
      <h2 className="italic">{pageName} Unavailable</h2>
      <Link
        href="https://www.facebook.com/UoAsnowsports"
        className="text-light-blue-100 hover:underline"
      >
        Go to our Facebook to sign up for the events!
      </Link>
    </div>
  )
}

export default WorkInProgressComponent
