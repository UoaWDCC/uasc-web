import tick from "@/assets/selectedtick.png"
import Image from "next/image"
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
      className={`${selected ? "bg-dark-blue-100" : "border-dark-blue-100 border bg-transparent"} flex
        justify-center rounded-md  ${onClick && "cursor-pointer"} py-4`}
    >
      <div className="flex flex-col items-center justify-center">
        <h3
          className={`${selected ? "text-white" : "text-dark-blue-100"} flex-col text-nowrap`}
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
          <Image
            alt="Tick icon"
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
    items-center justify-center gap-3 rounded-md border px-7 py-5 md:flex-col md:items-start lg:flex-col"
  >
    <h3 className="font-bold">{title} </h3>
    <div className="md:hidden lg:hidden">
      <Divider />
    </div>
    <div className="flex gap-2 py-2 md:flex-col">
      <h1 className="-mt-[5%] text-6xl italic">{discountedPriceString}</h1>

      <div>
        <p className="text-3xl line-through md:text-lg lg:text-lg">
          {priceString}
        </p>
        <h5
          className="text-orange md:text-md lg:text-md mr-4 mt-auto text-nowrap
       font-bold uppercase md:mr-0 md:font-normal lg:mr-0 lg:font-normal"
        >
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
