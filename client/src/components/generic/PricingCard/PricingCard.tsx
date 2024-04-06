import tick from "assets/selectedtick.png"
interface IPricingCard {
  title: string
  priceString: string
  extraInfo?: string
  selected?: boolean
}
const PricingCard = ({
  title,
  priceString,
  extraInfo,
  selected = false
}: IPricingCard) => {
  return (
    <div
      className={`${selected ? "bg-dark-blue-100" : "border-dark-blue-100 border bg-transparent"} mb-6 flex  justify-center rounded-md p-8`}
    >
      <div className="flex-col">
        <h3
          className={`${selected ? "text-white" : "text-dark-blue-100"} flex-col`}
        >
          {title}
        </h3>
        <h1
          className={`${selected ? "text-white" : "text-dark-blue-100"} flex-col italic`}
        >
          {priceString}
        </h1>
        <small className="text-orange">{extraInfo}</small>
        {selected && (
          <img src={tick} className="ml-auto mr-auto mt-6 h-6 w-6" />
        )}
      </div>
    </div>
  )
}

export default PricingCard
