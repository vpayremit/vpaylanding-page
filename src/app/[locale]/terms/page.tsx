import { redirect } from '@/i18n/navigation'
import { TERMS_SLUGS } from '@/data/terms'
import type { LocalePageProps } from '@/types'

export default async function TermsPage({ params }: LocalePageProps) {
  const { locale } = await params
  redirect({
    href: `/terms/${TERMS_SLUGS[0]}`,
    locale: locale as 'ko' | 'en',
  })
}
