export interface IPricingBanner {
  headline: string
  priceInformation: string
  disclaimer?: string
}
const PricingBanner = ({
  headline,
  priceInformation,
  disclaimer
}: IPricingBanner) => (
  <div
    className="text-light-blue-100 border-light-blue-100 
  bg-gray-1 flex flex-col items-center justify-center gap-2 rounded-md border px-8
   py-7 lg:flex-row lg:gap-7"
  >
    <h2 className="italic">{headline}</h2>
    <h1 className="italic">{priceInformation}</h1>
    <h5 className="uppercase">{disclaimer}</h5>
  </div>
)

export default PricingBanner
