import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import SubpageScaffold from '@/components/layout/SubpageScaffold'
import ServiceBusinessTransferContent from '@/components/sections/ServiceBusinessTransferContent'
import ServiceDigitalWalletContent from '@/components/sections/ServiceDigitalWalletContent'
import ServicePersonalTransferContent from '@/components/sections/ServicePersonalTransferContent'
import ServiceRealTimeFxContent from '@/components/sections/ServiceRealTimeFxContent'
import { routing } from '@/i18n/routing'
import { SERVICE_MENU_SLUGS, isServiceMenuSlug } from '@/lib/service-menu'
import type { LocaleSlugPageProps, ServiceMenuItem, ServiceMenuSlug } from '@/types'

export const dynamicParams = false

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_MENU_SLUGS.map((slug) => ({ locale, slug }))
  )
}

function renderServiceContent(slug: ServiceMenuSlug) {
  switch (slug) {
    case 'personal-transfer':
      return <ServicePersonalTransferContent />
    case 'business-transfer':
      return <ServiceBusinessTransferContent />
    case 'real-time-fx':
      return <ServiceRealTimeFxContent />
    case 'digital-wallet':
      return <ServiceDigitalWalletContent />
    default:
      return null
  }
}

export default async function ServiceDetailPage({ params }: LocaleSlugPageProps) {
  const { locale, slug } = await params

  if (!isServiceMenuSlug(slug)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: 'serviceMenu' })
  const items = t.raw('items') as ServiceMenuItem[]
  const serviceItem = items.find((item) => item.slug === slug)

  if (!serviceItem) {
    notFound()
  }

  const content = renderServiceContent(slug)

  if (!content) {
    return <SubpageScaffold title={serviceItem.label} />
  }

  return content
}
