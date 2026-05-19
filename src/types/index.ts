export interface NavItem {
  label: string
  href: string
}

export interface ServiceItem {
  tag: string
  title: string
  subtitle: string
}

export type ServiceMenuSlug =
  | 'personal-transfer'
  | 'business-transfer'
  | 'real-time-fx'

export interface ServiceMenuItem {
  slug: ServiceMenuSlug
  label: string
  image: string
}

export interface TestimonialItem {
  quote: string
  role: string
  tags: string[]
}

export interface WhyItem {
  title: string
  description: string
}

export interface ServiceReviewItem {
  role: string
  quote: string
}

export interface ServiceKeyItem {
  title: string
  icon: string
}

export interface ServiceTechItem {
  title: string
  description: string
  image: string
}

export interface ProcessStep {
  title: string
  items: string[]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PolicyBulletSection {
  title: string
  description: string
  bullets: string[]
}

export interface PolicyStatusRow {
  code: string
  status: string
  description: string
}

export interface PolicyStatusSection {
  title: string
  rows: PolicyStatusRow[]
}

export interface ContactInfoItem {
  type: 'address' | 'phone' | 'email'
  label: string
  value: string
}

export interface ContactFaqItem {
  question: string
  answer?: string
}

export interface FeesReasonItem {
  title: string
  description: string
}

export interface AboutHistoryItem {
  year: string
  description: string
}

export interface AboutValueItem {
  title: string
  description: string
  icon: string
}

export type NewsTabKey = 'notice' | 'pressReleases' | 'sns' | 'partnership'
export type NewsArticleSource = Extract<NewsTabKey, 'notice' | 'pressReleases'>

export interface NewsArticleItem {
  date: string
  title: string
  excerpt: string
  image: string
}

export interface NewsArticleCardItem extends NewsArticleItem {
  slug: string
  source: NewsArticleSource
}

export interface NewsDetailSection {
  heading: string
  paragraphs: string[]
}

export interface NewsChannelItem {
  label: string
  icon: string
}

export type FeeStatus = 'available' | 'coming_soon'

export interface FeeEntry {
  country: string
  country_ko: string
  flag: string
  currency: string
  fee?: string
  processing_time?: string
  processing_time_ko?: string
  limit_per_txn?: string
  limit_annual?: string
  status: FeeStatus
}

export interface LocalePageProps {
  params: Promise<{ locale: string }>
}

export interface LocaleSlugPageProps {
  params: Promise<{ locale: string; slug: string }>
}
