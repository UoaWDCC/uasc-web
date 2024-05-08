type tagVariants = "primary" | "interactive"

interface TagProps {
  children: string
  variant: tagVariants
}

type props = TagProps

const PrimaryTagsComponent = ({ children }: props) => {
  return (
    <div className="bg-light-blue-60 flex h-[32px] w-[80px] items-center justify-center rounded-full border border-black">
      <h5 className="font-bold">{children}</h5>
    </div>
  )
}

const InteractiveTagsComponent = ({ children }: props) => {
  return (
    <div>
      <h5>{children}</h5>
    </div>
  )
}

const TagComponent = ({ children, variant }: props) => {
  switch (variant) {
    case "primary":
      return (
        <PrimaryTagsComponent variant="primary">
          {children}
        </PrimaryTagsComponent>
      )
  }
  switch (variant) {
    case "interactive":
      return (
        <InteractiveTagsComponent variant="interactive">
          {children}
        </InteractiveTagsComponent>
      )
  }
}

export default TagComponent
