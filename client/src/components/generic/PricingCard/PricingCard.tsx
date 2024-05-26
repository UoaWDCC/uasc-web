import tick from "assets/selectedtick.png"
interface IPricingCardDefault {
  title: string
  priceString: string
  extraInfo?: string
  selected?: boolean
  onClick?: () => void
}

interface IPricingCardHome extends Omit<IPricingCardDefault, "selected"> {
  discountedPriceString: string
}

const Divider = () => (
  <div className="bg-light-blue-100 h-[50px] w-[2px] rounded-full" />
)

// Public interface
export interface IPricingCard extends IPricingCardHome, IPricingCardDefault {
  variant?: "default" | "home"
}

const PricingCardDefault = ({
  title,
  priceString,
  extraInfo,
  selected = false,
  onClick
}: IPricingCardDefault) => {
  return (
    <div
      onClick={onClick}
      className={`${selected ? "bg-dark-blue-100" : "border-dark-blue-100 border bg-transparent"} mb-6 flex  justify-center rounded-md p-8 ${onClick && "cursor-pointer"}`}
    >
      <div className="flex items-center justify-center md:flex-col lg:flex-col">
        <h3
          className={`${selected ? "text-white" : "text-dark-blue-100"} mr-[30%] flex-col text-nowrap md:mr-0 lg:mr-0`}
        >
          {title}
        </h3>
        <h1
          className={`${selected ? "text-white" : "text-dark-blue-100"} flex-col italic`}
        >
          {priceString}
        </h1>
        <small className="text-orange -ml-[18%] mt-[20%] text-nowrap md:ml-0 md:mt-0 lg:ml-0 lg:mt-0">
          {extraInfo}
        </small>
        {selected && (
          <img
            src={tick}
            className="ml-auto mr-auto w-12 md:mt-6 md:h-6 md:w-6 lg:mt-6 lg:h-6 lg:w-6"
          />
        )}
      </div>
    </div>
  )
}

const PricingCardHome = ({
  title,
  priceString,
  extraInfo,
  discountedPriceString
}: IPricingCardHome) => (
  <div
    className="border-light-blue-100 text-light-blue-100 bg-gray-1 relative flex 
   items-center justify-center gap-3 rounded-md border px-7 py-5 md:flex-col lg:flex-col"
  >
    <h4 className=" md:text-h3 lg:text-h3 md:mr-[14%] lg:mr-[14%]">{title} </h4>
    <div className="pr-[3.5%] md:hidden lg:hidden">
      <Divider />
    </div>
    <div className="flex gap-2 align-top md:flex-col md:pr-[75px] lg:flex-col lg:pr-[75px] ">
      <div className="">
        <h1 className="-mt-[5%] text-6xl italic md:text-5xl lg:text-5xl">
          {discountedPriceString}
        </h1>
      </div>

      <div className="pl-[5%]">
        <p className="text-3xl line-through md:text-lg lg:text-lg">
          {priceString}
        </p>
        <h5 className="text-orange md:text-md lg:text-md text-nowrap pr-8 font-bold uppercase md:font-normal lg:font-normal">
          {extraInfo}
        </h5>
      </div>
    </div>
  </div>
)

/**
 * Note if you are using the `home` variant the big price text is always
 * the `discountedPriceString` even if theres no discount
 */
const PricingCard = ({
  title,
  priceString,
  discountedPriceString,
  extraInfo,
  variant = "default",
  selected = false,
  onClick
}: IPricingCard) => {
  switch (variant) {
    case "default":
      return (
        <PricingCardDefault
          onClick={onClick}
          selected={selected}
          title={title}
          priceString={priceString}
          extraInfo={extraInfo}
        />
      )
    case "home":
      return (
        <PricingCardHome
          title={title}
          priceString={priceString}
          extraInfo={extraInfo}
          discountedPriceString={discountedPriceString}
        />
      )
  }
}

export default PricingCard
