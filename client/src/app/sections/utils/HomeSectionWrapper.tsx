/**
 * Usage: First child should be a `<HomeSectionHeading />` then content after
 */
const HomeSectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-12">
      <span className="home-page-gradient" />
      <div className="w-full lg:max-w-[1000px]">{children}</div>
    </div>
  </>
)

export default HomeSectionWrapper
