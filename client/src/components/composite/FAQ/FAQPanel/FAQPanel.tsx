import FAQItem from "@/components/generic/FAQItem/FAQItem"
import type { FAQCategory } from "@/models/sanity/FAQCategory/Utils"

export interface IFAQPanel {
  categories: FAQCategory[]
}

const FAQPanel = ({ categories }: IFAQPanel) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6 rounded-md border border-black bg-white p-6">
        <p className="text-gray-500 text-center">No FAQ items available.</p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-6 rounded-md border border-black bg-white p-6">
      {categories.map((category) => (
        <div key={category.name} className="flex flex-col gap-4">
          <div className="border-b border-gray-300 pb-2">
            <h3 className="text-dark-blue-100 font-semibold">
              {category.name}
            </h3>
            {category.description && (
              <p className="text-sm text-gray-600 mt-1">
                {category.description}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            {category.faqItems.map((item, index) => (
              <FAQItem
                key={`${category.name}-${index}`}
                question={item.question}
                answer={item.answer}
                category={category.name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FAQPanel
