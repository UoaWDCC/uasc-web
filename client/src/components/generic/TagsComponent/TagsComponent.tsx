import { HTMLAttributes } from "react"

export interface TagProps extends HTMLAttributes<HTMLOrSVGElement> {
  children: string
}

const PrimaryTagsComponent = () => {
  return (
    <div className="h-[32px] w-[80px] rounded border border-black">
      <h5>1 of 12</h5>
    </div>
  )
}

export default PrimaryTagsComponent
