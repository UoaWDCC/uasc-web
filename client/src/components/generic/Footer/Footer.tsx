export interface IFooterProps {
  title: string
}

type props = IFooterProps

export const Footer = ({ title }: props) => {
  return <div>{title}</div>
}
