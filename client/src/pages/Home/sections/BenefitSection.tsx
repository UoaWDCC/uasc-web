import MemberBenefitCard from "components/generic/MemberBenefitCards/MemberBenefitCard"
import { Benefit } from "components/utils/types"
import HomeSectionHeading from "./utils/HomeSectionHeading"
import HomeSectionWrapper from "./utils/HomeSectionWrapper"

interface IBenefitSection {
  benefits: Benefit[]
}

const BenefitSection = ({ benefits }: IBenefitSection) => (
  <section>
    <HomeSectionWrapper>
      <HomeSectionHeading text="Member Benefits" />
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
    </HomeSectionWrapper>
  </section>
)

export default BenefitSection
