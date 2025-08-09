import FAQItem, { type IFAQItem } from "@/components/generic/FAQItem/FAQItem"

export interface IFAQPanel {
  items: IFAQItem[]
}

const FAQPanel = ({ items }: IFAQPanel) => {
  // Group items by category if categories exist
  const categorizedItems = items.reduce(
    (acc, item) => {
      const category = item.category || "General"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(item)
      return acc
    },
    {} as Record<string, IFAQItem[]>
  )

  const categories = Object.keys(categorizedItems)
  const hasCategories =
    categories.length > 1 ||
    (categories.length === 1 && categories[0] !== "General")

  return (
    <div className="flex w-full flex-col gap-6 rounded-md border border-black bg-white p-6">
      {hasCategories ? (
        categories.map((category) => (
          <div key={category} className="flex flex-col gap-4">
            <h3 className="text-dark-blue-100 border-b border-gray-300 pb-2 font-semibold">
              {category}
            </h3>
            <div className="flex flex-col">
              {categorizedItems[category].map((item, index) => (
                <FAQItem
                  key={`${category}-${index}`}
                  question={item.question}
                  answer={item.answer}
                  category={item.category}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col">
          {items.map((item) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              category={item.category}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default FAQPanel
