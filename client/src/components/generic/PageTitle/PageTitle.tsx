export interface IPageTitleProps {
  title: string
}
type props = IPageTitleProps

export const PageTitle = ({ title }: props) => {
  return (
    <div className="">
      <div className="">{title}</div>
    </div>
  )
}
