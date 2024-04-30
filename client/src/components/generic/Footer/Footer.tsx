export interface IFooterProps {
  title: string
}

type props = IFooterProps

export const Footer = ({ title }: props) => {
  return (
    <div className="h-[56px] w-full border border-black">
      <div>{title}</div>
    </div>
  )
}
