import type { ReactNode } from "react"
import EditIcon from "@/assets/icons/edit.svg"
interface IProfileInformationPanel {
  /**
   * The main heading of the panel
   */
  title: string
  children?: ReactNode
  /**
   *  Handler to be called when the user requests an edit for their profile
   *
   * @example
   * () => {
   *    openEditPanel()
   * }
   */
  onEdit?: () => void
}

const ProfileInformationPanel = ({
  title,
  children,
  onEdit
}: IProfileInformationPanel) => {
  return (
    <div className="w-full flex-row rounded border border-stone-300 bg-white p-5">
      <div className="flex flex-nowrap justify-between p-1">
        <h3 className="text-dark-blue-100 text-nowrap">{title}</h3>
        {onEdit && (
          <div
            className="inline-flex h-[30px] w-[30px] cursor-pointer items-center justify-center py-[5px] pl-[5px]"
            onClick={onEdit}
          >
            <EditIcon className="absolute h-5 w-[21.69px]" />
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap items-stretch justify-start gap-x-[50px] gap-y-[10px] p-1 pt-3">
        {children}
      </div>
    </div>
  )
}

export default ProfileInformationPanel
