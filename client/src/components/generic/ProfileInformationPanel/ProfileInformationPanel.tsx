import { ReactNode } from "react"
import editButton from "assets/icons/edit.svg"
interface IProfileInformationPanel {
  title: string // The title field
  children?: ReactNode
  onEdit?: () => void // The edit button
}

const ProfileInformationPanel = ({
  title,
  children,
  onEdit
}: IProfileInformationPanel) => {
  return (
    // <div className="box-border flex w-[75%] flex-col border p-4">
    // <div className="absolute max-w-[50%] flex-row rounded border border-stone-300 bg-white p-4">
    <div className="absolute max-w-[90%] flex-row rounded border border-stone-300 bg-white p-4">
      <div className="flex flex-nowrap justify-between text-nowrap p-1">
        <h3 className="text-dark-blue-100">{title}</h3>
        {onEdit && (
          <img
            className="flex-end max-w-[80%] cursor-pointer items-end pl-4 pr-4"
            src={editButton}
            alt="Edit"
            onClick={onEdit}
          />
        )}
      </div>
      {/* <div className="flex w-[90%] flex-row flex-wrap gap-5 p-1 pt-3"> */}
      <div className="flex flex-row flex-wrap items-stretch justify-start gap-10 p-1 pt-3">
        {children}
      </div>
      {/* </div> */}
      {/* <div className="flex-direction: row; flex">{children}</div> */}
    </div>
  )
}

export default ProfileInformationPanel
