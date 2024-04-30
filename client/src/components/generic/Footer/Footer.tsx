export interface IFooterProps {
  title: string
}

type props = IFooterProps

export const Footer = ({ title }: props) => {
  return (
    <div className="border border-black">
      <div>{title}</div>{" "}
    </div>
  )
}
