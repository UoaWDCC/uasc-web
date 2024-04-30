export interface IPageTitleProps {
  title: string
}
type props = IPageTitleProps

export const PageTitle = ({ title }: props) => {
  return (
    <div className="border border-black">
      <div className="">{title}</div>
    </div>
  )
}
