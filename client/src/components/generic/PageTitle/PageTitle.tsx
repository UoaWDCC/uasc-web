export interface IPageTitleProps {
  title: string
}
type props = IPageTitleProps

export const PageTitle = ({ title }: props) => {
  return (
    <div className="bg-light-blue-100 flex h-[70px] w-full items-center justify-center">
      <h2 className="text-gray-1 italic">{title}</h2>
    </div>
  )
}
