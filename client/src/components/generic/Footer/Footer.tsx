export interface IFooterProps {
  title: string
}

type props = IFooterProps

export const Footer = ({ title }: props) => {
  return (
    <div className="flex h-[56px] w-full items-center justify-center border border-black">
      <div>{title}</div>
    </div>
  )
}
