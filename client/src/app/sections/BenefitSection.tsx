import { Benefit } from "@/components/utils/types"
import Image from "next/image"
import HomeSectionHeading from "./utils/HomeSectionHeading"
import HomeSectionWrapper from "./utils/HomeSectionWrapper"

interface IBenefitSection {
  benefits: Benefit[]
}

const BenefitSection = ({ benefits }: IBenefitSection) => (
  <section>
    <HomeSectionWrapper>
      <HomeSectionHeading text="Member Benefits" />
      <div className="mt-16 grid grid-cols-1 items-center gap-12 sm:grid-cols-2 sm:px-6 lg:px-0">
        {benefits.map((benefit) => {
          const { text, image } = benefit
          return (
            <div key={text} className="relative isolate h-64 w-full">
              <Image
                src={image || ""}
                alt={text}
                fill
                className="-z-10 size-full object-cover"
              />
              <span className="bg-light-blue-100 absolute -top-6 w-fit max-w-[80%] px-6 py-4 text-lg font-bold text-white sm:-left-6">
                {text}
              </span>
            </div>
          )
        })}
      </div>
    </HomeSectionWrapper>
  </section>
)

export default BenefitSection
