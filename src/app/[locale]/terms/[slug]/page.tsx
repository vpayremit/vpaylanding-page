import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import TermsPageContent from '@/components/sections/TermsPageContent'
import {
  TERMS_MANIFEST,
  TERMS_SLUGS,
  isTermsSlug,
  loadTermsHtml,
  type TermsSlug,
} from '@/data/terms'
import { routing } from '@/i18n/routing'
import { createBasicMetadata } from '@/lib/metadata'
import type { LocaleSlugPageProps } from '@/types'

export const dynamicParams = false

export function generateStaticParams() {
  return TERMS_SLUGS.flatMap((slug) =>
    routing.locales.map((locale) => ({ locale, slug })),
  )
}

export async function generateMetadata({ params }: LocaleSlugPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isTermsSlug(slug)) return {}
  const safeLocale: 'ko' | 'en' = locale === 'en' ? 'en' : 'ko'
  const title = TERMS_MANIFEST[slug as TermsSlug].label[safeLocale]
  return createBasicMetadata({
    locale,
    pathname: `/terms/${slug}`,
    title: `${title} | V Pay`,
    description: title,
    image: '/images/policy-hero-badge.png',
    type: 'article',
  })
}

export default async function TermsSlugPage({ params }: LocaleSlugPageProps) {
  const { locale, slug } = await params
  if (!isTermsSlug(slug)) notFound()
  const safeLocale: 'ko' | 'en' = locale === 'en' ? 'en' : 'ko'
  const t = await getTranslations({ locale, namespace: 'footer' })
  const title = TERMS_MANIFEST[slug as TermsSlug].label[safeLocale]
  const html = loadTermsHtml(slug as TermsSlug, safeLocale)
  return (
    <TermsPageContent
      html={html}
      locale={safeLocale}
      navLabel={t('termsAndPoliciesTitle')}
      slug={slug as TermsSlug}
      title={title}
    />
  )
}
