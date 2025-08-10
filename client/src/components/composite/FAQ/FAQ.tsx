import { Footer } from "@/components/generic/Footer/Footer"
import FAQPanel, { type IFAQPanel } from "./FAQPanel/FAQPanel"

interface IFAQ extends IFAQPanel {}

const FAQ = ({ categories }: IFAQ) => {
  return (
    <>
      <div
        className="bg-mountain-background-image relative z-10 flex min-h-[100vh] w-fit
      min-w-full flex-col items-center bg-cover bg-top bg-no-repeat md:px-8"
      >
        <div className="bg-gray-1 pointer-events-none absolute -z-30 h-full w-full opacity-70" />
        <div className="z-20 flex w-full max-w-[800px] flex-col items-center gap-4 pb-8 pt-16">
          <h2 className="text-dark-blue-100 mr-auto italic">
            Frequently Asked Questions
          </h2>
          <FAQPanel categories={categories} />
        </div>
      </div>

      <Footer />
    </>
  )
}

export default FAQ
