import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import SubpageScaffold from '@/components/layout/SubpageScaffold'
import ServiceBusinessTransferContent from '@/components/sections/ServiceBusinessTransferContent'
import ServiceDigitalWalletContent from '@/components/sections/ServiceDigitalWalletContent'
import ServicePersonalTransferContent from '@/components/sections/ServicePersonalTransferContent'
import ServiceRealTimeFxContent from '@/components/sections/ServiceRealTimeFxContent'
import { routing } from '@/i18n/routing'
import { createBasicMetadata } from '@/lib/metadata'
import { SERVICE_MENU_SLUGS, isServiceMenuSlug } from '@/lib/service-menu'
import type { LocaleSlugPageProps, ServiceMenuItem, ServiceMenuSlug } from '@/types'

export const dynamicParams = false

const SERVICE_SEO_CONFIG: Record<
  ServiceMenuSlug,
  { namespace: string; pathname: string; image: string }
> = {
  'personal-transfer': {
    namespace: 'servicePages.personalTransfer',
    pathname: '/services/personal-transfer',
    image: '/images/service-p2p-hero.png',
  },
  'business-transfer': {
    namespace: 'servicePages.businessTransfer',
    pathname: '/services/business-transfer',
    image: '/images/service-b2b-hero.png',
  },
  'real-time-fx': {
    namespace: 'servicePages.realTimeFx',
    pathname: '/services/real-time-fx',
    image: '/images/service-fx-hero.png',
  },
  'digital-wallet': {
    namespace: 'servicePages.digitalWallet',
    pathname: '/services/digital-wallet',
    image: '/images/service-digital-wallet-hero.png',
  },
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICE_MENU_SLUGS.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: LocaleSlugPageProps): Promise<Metadata> {
  const { locale, slug } = await params

  if (!isServiceMenuSlug(slug)) {
    return {}
  }

  const seoConfig = SERVICE_SEO_CONFIG[slug]
  const t = await getTranslations({ locale, namespace: seoConfig.namespace })

  return createBasicMetadata({
    locale,
    pathname: seoConfig.pathname,
    title: `${t('hero.title')} | V Pay`,
    description: t('hero.subtitle'),
    image: seoConfig.image,
  })
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
