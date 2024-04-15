import MemberBenefitCard from "components/generic/MemberBenefitCards/MemberBenefitCard"
import { benefits } from "./utils/Benefits"

const BenefitSection = () => (
  <section>
    <div className="flex flex-col items-center justify-center py-12">
      <span className="home-page-gradient mt-12" />
      <div className="w-full lg:max-w-[900px]">
        <h2 className="text-dark-blue-100 text-center italic lg:text-left">
          Member Benefits
        </h2>
        <div className="mt-3 grid grid-cols-1 items-center gap-7 lg:grid-cols-2">
          {benefits.map((benefit) => {
            const { text, icon } = benefit
            return (
              <span key={text} className="flex h-full w-full justify-center">
                <MemberBenefitCard text={text} SvgIcon={icon} />
              </span>
            )
          })}
        </div>
      </div>
    </div>
  </section>
)

export default BenefitSection
