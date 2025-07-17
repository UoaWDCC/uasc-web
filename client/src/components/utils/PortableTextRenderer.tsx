// DO NOT import PortableText directly from '@portabletext/react'. Use PortableTextRenderer instead for consistent styling and accessibility.
// import { PortableText } from "@portabletext/react" // Restricted: Use PortableTextRenderer

import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents
  // biome-ignore lint/style/noRestrictedImports: this is the only place it is allowed to be used
} from "@portabletext/react"

interface PortableTextRendererProps {
  value: PortableTextBlock[]
  headerColorClass?: string
  textColorClass?: string
}

const getHeaderColor = (headerColorClass?: string) =>
  headerColorClass || "text-dark-blue-100"
const getTextColor = (textColorClass?: string) => textColorClass || "text-black"

const getComponents = (
  headerColorClass?: string,
  textColorClass?: string
): PortableTextComponents => ({
  types: {},
  marks: {
    strong: ({ children }) => (
      <strong className={`font-bold ${getTextColor(textColorClass)}`}>
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className={`italic ${getTextColor(textColorClass)}`}>{children}</em>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className={`text-light-blue-100 underline hover:text-orange focus:outline focus:outline-2 focus:outline-orange ${getTextColor(textColorClass)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  },
  block: {
    h1: ({ children }) => (
      <h1
        className={`text-h1 font-black mb-4 ${getHeaderColor(headerColorClass)}`}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={`text-h2 font-bold mb-3 ${getHeaderColor(headerColorClass)}`}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={`text-h3 font-bold mb-2 ${getHeaderColor(headerColorClass)}`}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        className={`text-h4 font-medium mb-2 ${getHeaderColor(headerColorClass)}`}
      >
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5
        className={`text-h5 font-medium mb-2 ${getHeaderColor(headerColorClass)}`}
      >
        {children}
      </h5>
    ),
    normal: ({ children }) => (
      <p
        className={`text-p mb-2 leading-relaxed ${getTextColor(textColorClass)}`}
      >
        {children}
      </p>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className={`list-disc pl-6 mb-2 leading-relaxed ${getTextColor(textColorClass)}`}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className={`list-decimal pl-6 mb-2 leading-relaxed ${getTextColor(textColorClass)}`}
      >
        {children}
      </ol>
    )
  },
  listItem: {
    bullet: ({ children }) => (
      <li
        className={`mb-1 leading-relaxed text-p ${getTextColor(textColorClass)}`}
      >
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li
        className={`mb-1 leading-relaxed text-p ${getTextColor(textColorClass)}`}
      >
        {children}
      </li>
    )
  }
})

export default function PortableTextRenderer({
  value,
  headerColorClass,
  textColorClass
}: PortableTextRendererProps) {
  return (
    <PortableText
      value={value}
      components={getComponents(headerColorClass, textColorClass)}
    />
  )
}
