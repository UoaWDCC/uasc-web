import { useState } from "react"
import CloseSign from "@/assets/icons/close_sign.svg"

type tagVariants = "primary" | "interactive"

interface TagProps {
  children: string
  variant: tagVariants
  handleCloseCustom?: () => void
  onClickCustom?: () => void
}

type props = TagProps

const PrimaryTagsComponent = ({ children, onClickCustom }: props) => {
  return (
    <div
      onClick={onClickCustom}
      className="bg-light-blue-60 flex h-[32px] w-[80px] items-center justify-center overflow-hidden whitespace-nowrap rounded-full"
    >
      <h5 className="font-bold">{children}</h5>
    </div>
  )
}

const InteractiveTagsComponent = ({ children, handleCloseCustom }: props) => {
  const [isVisible, setIsVisible] = useState(true)
  const handleClose = () => {
    handleCloseCustom?.()
    setIsVisible(false)
  }
  if (!isVisible) {
    return null
  }

  return (
    <div className="bg-dark-blue-100 flex h-[32px] w-[80px] items-center justify-center overflow-hidden whitespace-nowrap rounded-full">
      <h5 className="mr-4 pb-[2px] font-bold text-white">{children}</h5>

      <div className="absolute ml-11 cursor-pointer" onClick={handleClose}>
        <CloseSign className="fill-white" />
      </div>
    </div>
  )
}

const TagComponent = ({
  children,
  variant,
  handleCloseCustom,
  onClickCustom
}: props) => {
  switch (variant) {
    case "primary":
      return (
        <PrimaryTagsComponent onClickCustom={onClickCustom} variant="primary">
          {children}
        </PrimaryTagsComponent>
      )
  }
  switch (variant) {
    case "interactive":
      return (
        <InteractiveTagsComponent
          handleCloseCustom={handleCloseCustom}
          variant="interactive"
        >
          {children}
        </InteractiveTagsComponent>
      )
  }
}

export default TagComponent
