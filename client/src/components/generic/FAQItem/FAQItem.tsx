"use client"

import { useState } from "react"

export interface IFAQItem {
  /**
   * The question being asked
   *
   * @example "How do I book the lodge?"
   */
  question: string
  /**
   * The answer to the question
   *
   * @example "You can book the lodge through our online booking system..."
   */
  answer: string
  /**
   * Optional category for grouping
   *
   * @example "Bookings"
   */
  category?: string
}

const FAQItem = ({ question, answer }: IFAQItem) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h4 className="text-dark-blue-100 font-medium">{question}</h4>
        <span
          className={`text-dark-blue-100 text-xl font-bold transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 pr-8">
          <p className="text-gray-700 whitespace-pre-line leading-6">
            {answer}
          </p>
        </div>
      )}
    </div>
  )
}

export default FAQItem
