export interface IPageTitleProps {
  title: string
}
type props = IPageTitleProps

export const PageTitle = ({ title }: props) => {
  return (
    <div className="bg-light-blue-100 flex h-[70px] w-full items-center justify-center">
      <div className="text-gray-1 italic">
        <h2>{title}</h2>
      </div>
    </div>
  )
}
