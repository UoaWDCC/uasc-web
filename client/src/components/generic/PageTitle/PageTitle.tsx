export interface IPageTitleProps {
  title: string
}
type props = IPageTitleProps

export const PageTitle = ({ title }: props) => {
  return (
    <div className="border border-black w-full h-[70px]">
      <div className="">{title}</div>
    </div>
  )
}
