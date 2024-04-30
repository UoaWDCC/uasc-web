export interface IFooterProps {
  title: string
  about: string
  faq: string
  contact: string
  policy: string
}

type props = IFooterProps

export const Footer = ({ title, about }: props) => {
  return (
    <div className="flex h-[56px] w-full items-center justify-center border border-black">
      <div>{title}</div>
      <a href="#">{about}</a>
    </div>
  )
}
