import type { ComponentType } from 'react'

import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import SubpageScaffold from '@/components/layout/SubpageScaffold'
import ServiceBusinessTransferContent from '@/components/sections/ServiceBusinessTransferContent'
import ServiceDigitalWalletContent from '@/components/sections/ServiceDigitalWalletContent'
import ServicePersonalTransferContent from '@/components/sections/ServicePersonalTransferContent'
import ServiceRealTimeFxContent from '@/components/sections/ServiceRealTimeFxContent'
import { SERVICE_MENU_SLUGS, isServiceMenuSlug } from '@/lib/service-menu'
import type { ServiceMenuItem, ServiceMenuSlug } from '@/types'

const SERVICE_CONTENT_MAP: Record<ServiceMenuSlug, ComponentType> = {
  'personal-transfer': ServicePersonalTransferContent,
  'business-transfer': ServiceBusinessTransferContent,
  'real-time-fx': ServiceRealTimeFxContent,
  'digital-wallet': ServiceDigitalWalletContent,
}

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return SERVICE_MENU_SLUGS.map((slug) => ({ slug }))
}

export default async function ServiceDetailPage({ params }: Props) {
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

  const ContentComponent = SERVICE_CONTENT_MAP[slug]

  if (!ContentComponent) {
    return <SubpageScaffold title={serviceItem.label} />
  }

  return <ContentComponent />
}
