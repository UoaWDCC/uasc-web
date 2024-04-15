/**
 * Usage: First child should be a `<HomeSectionHeading />` then content after
 */
const HomeSectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="flex flex-col items-center justify-center py-12">
      <span className="home-page-gradient mt-12" />
      <div className="w-full lg:max-w-[900px]">{children}</div>
    </div>
  </>
)

export default HomeSectionWrapper
