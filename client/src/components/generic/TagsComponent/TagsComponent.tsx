import { HTMLAttributes } from "react"

export interface TagProps extends HTMLAttributes<HTMLOrSVGElement> {
  children: string
}

const TagsComponent = () => {
  return <div></div>
}

export default TagsComponent
