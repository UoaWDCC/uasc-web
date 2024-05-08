import { HTMLAttributes } from "react"

export interface TagProps extends HTMLAttributes<HTMLOrSVGElement> {
  children: string
}

const TagsComponent = () => {
  return <div className="h-[32px] w-[80px] rounded border border-black"></div>
}

export default TagsComponent
