export const HOME_PAGE_GROQ_QUERY = `
*[_type == "home-page"]
  {"benefitCards": benefits.benefits[]{"imageUrl": image.asset->url,...
},...}`

type BenefitItem = { imageUrl?: string; description: string }

export type HomePage = {
  landing?: { headline?: string }
  introduction: { title?: string; description?: string; subheading?: string }
  benefitCards?: BenefitItem[]
  pricing?: { discount?: string }
}
