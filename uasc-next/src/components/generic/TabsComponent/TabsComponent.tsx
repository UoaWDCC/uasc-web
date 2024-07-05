import Button from "../FigmaButtons/FigmaButton"

/**
 * General format of a tab
 */
type Tab = {
  title: string
  content: JSX.Element
  index: number
}

interface ITabsComponentProps {
  /**
   * Array of tabs
   * @example tabs=[tab1, tab2, tab3]
   */
  tabs: Tab[]
  /**
   * Which page of the tab to show
   * @example selectedIndex={MyEnum.FirstPage}
   */
  selectedIndex: number
  /**
   * The index in the tabs array that has been selected
   */
  setCurrentIndex: (index: number) => void
}

/**
 * const TabsComponent is an arrow function that takes 3 variables from ITabsComponentProps interface and then
 * uses each tab within tabs to set up onClick functionality to setCurrentIndex to that of the tab that has been clicked
 */
const TabsComponent = ({
  tabs,
  selectedIndex,
  setCurrentIndex
}: ITabsComponentProps) => {
  return (
    <>
      <div className="bg-dark-blue-60 relative flex h-full w-full flex-col items-center py-[78px]">
        <div className="xs:gap-3 xs:flex-row absolute -top-[15px] left-1/2 flex -translate-x-1/2 flex-col sm:gap-5 ">
          {tabs.map((tab) => (
            <>
              <Button
                variant="tertiary"
                onClick={() => setCurrentIndex(tab.index)}
                disabled={tab.index === selectedIndex}
              >
                {" "}
                {tab.title}{" "}
              </Button>
            </>
          ))}
        </div>
        <div className="flex max-w-[800px] flex-col items-center px-2 text-white">
          {tabs[selectedIndex].content}
        </div>
      </div>
    </>
  )
}

export default TabsComponent
