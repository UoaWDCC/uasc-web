import PortableTextRenderer from "./PortableTextRenderer"
import type { PortableTextBlock } from "@portabletext/react"

const sampleValue: PortableTextBlock[] = [
  {
    _type: "block",
    style: "h1",
    children: [{ _type: "span", text: "Heading 1" }]
  },
  {
    _type: "block",
    style: "h2",
    children: [{ _type: "span", text: "Heading 2" }]
  },
  {
    _type: "block",
    style: "h3",
    children: [{ _type: "span", text: "Heading 3" }]
  },
  {
    _type: "block",
    style: "h4",
    children: [{ _type: "span", text: "Heading 4" }]
  },
  {
    _type: "block",
    style: "h5",
    children: [{ _type: "span", text: "Heading 5" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "Normal paragraph text." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [
      { _type: "span", marks: ["strong"], text: "Bold text. " },
      { _type: "span", marks: ["em"], text: "Italic text. " },
      {
        _type: "span",
        marks: ["link"],
        text: "Link text.",
        markDefs: [{ _key: "link", _type: "link", href: "https://example.com" }]
      }
    ]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "List below:" }]
  },
  {
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [{ _type: "span", text: "Bullet item 1" }]
  },
  {
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [{ _type: "span", text: "Bullet item 2" }]
  },
  {
    _type: "block",
    style: "normal",
    listItem: "number",
    level: 1,
    children: [{ _type: "span", text: "Numbered item 1" }]
  },
  {
    _type: "block",
    style: "normal",
    listItem: "number",
    level: 1,
    children: [{ _type: "span", text: "Numbered item 2" }]
  }
]

const allElementsValue: PortableTextBlock[] = [
  {
    _type: "block",
    style: "h1",
    children: [{ _type: "span", text: "Heading 1" }]
  },
  {
    _type: "block",
    style: "h2",
    children: [{ _type: "span", text: "Heading 2" }]
  },
  {
    _type: "block",
    style: "h3",
    children: [{ _type: "span", text: "Heading 3" }]
  },
  {
    _type: "block",
    style: "h4",
    children: [{ _type: "span", text: "Heading 4" }]
  },
  {
    _type: "block",
    style: "h5",
    children: [{ _type: "span", text: "Heading 5" }]
  },
  {
    _type: "block",
    style: "h6",
    children: [{ _type: "span", text: "Heading 6" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "Paragraph text." }]
  },
  {
    _type: "block",
    style: "blockquote",
    children: [{ _type: "span", text: "Blockquote text." }]
  },
  {
    _type: "block",
    style: "pre",
    children: [{ _type: "span", text: "Preformatted code block." }]
  },
  {
    _type: "block",
    style: "code",
    children: [{ _type: "span", text: "Inline code." }]
  },
  {
    _type: "block",
    style: "normal",
    children: [
      { _type: "span", marks: ["strong"], text: "Bold text. " },
      { _type: "span", marks: ["em"], text: "Italic text. " },
      { _type: "span", marks: ["del"], text: "Deleted text. " },
      { _type: "span", marks: ["ins"], text: "Inserted text. " },
      { _type: "span", marks: ["sub"], text: "Subscript. " },
      { _type: "span", marks: ["sup"], text: "Superscript. " },
      {
        _type: "span",
        marks: ["link"],
        text: "Link text.",
        markDefs: [{ _key: "link", _type: "link", href: "https://example.com" }]
      }
    ]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "Horizontal rule below:" }]
  },
  { _type: "block", style: "hr", children: [] },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "Bullet list:" }]
  },
  {
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [{ _type: "span", text: "Bullet item 1" }]
  },
  {
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [{ _type: "span", text: "Bullet item 2" }]
  },
  {
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: "Numbered list:" }]
  },
  {
    _type: "block",
    style: "normal",
    listItem: "number",
    level: 1,
    children: [{ _type: "span", text: "Numbered item 1" }]
  },
  {
    _type: "block",
    style: "normal",
    listItem: "number",
    level: 1,
    children: [{ _type: "span", text: "Numbered item 2" }]
  }
]

export default {
  title: "Utils/PortableTextRenderer",
  component: PortableTextRenderer
}

export const Default = () => <PortableTextRenderer value={sampleValue} />

export const WithHeaderAndTextColorOverride = () => (
  <PortableTextRenderer
    value={sampleValue}
    headerColorClass="text-red-600"
    textColorClass="text-green-700"
  />
)

export const OnlyHeaderColorOverride = () => (
  <PortableTextRenderer
    value={sampleValue}
    headerColorClass="text-purple-600"
  />
)

export const OnlyTextColorOverride = () => (
  <PortableTextRenderer value={sampleValue} textColorClass="text-yellow-700" />
)

export const EmptyValue = () => <PortableTextRenderer value={[]} />

export const AllElements = () => (
  <PortableTextRenderer value={allElementsValue} />
)
