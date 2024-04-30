export interface IFooterProps {
  title: string
}

type props = IFooterProps

export const Footer = ({ title }: props) => {
  return (
    <div className="border border-black w-full h-[56px]">
      <div>{title}</div>
    </div>
  )
}
