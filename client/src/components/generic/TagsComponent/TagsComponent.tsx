import { HTMLAttributes } from "react"

export interface TagProps extends HTMLAttributes<HTMLOrSVGElement> {
  children: string
}

const TagsComponent = () => {
  return (
    <div>
      <input type=""></input>
    </div>
  )
}

export default TagsComponent
