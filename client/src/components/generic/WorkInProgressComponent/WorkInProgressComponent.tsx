import Lock from "@/assets/icons/lock.svg"

interface WorkInProgressComponentProps {
  pageName: string
}

type props = WorkInProgressComponentProps
const WorkInProgressComponent = ({ pageName }: props) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <Lock className="fill-dark-blue-100" />
      <h2 className="italic">{pageName} Page Unavailable</h2>
    </div>
  )
}

export default WorkInProgressComponent
