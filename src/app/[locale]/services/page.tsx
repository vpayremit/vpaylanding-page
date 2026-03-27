import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'

import SubpageScaffold from '@/components/layout/SubpageScaffold'
import { createBasicMetadata } from '@/lib/metadata'
import type { LocalePageProps } from '@/types'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params
  const tServiceMenu = await getTranslations({ locale, namespace: 'serviceMenu' })

  return createBasicMetadata({
    locale,
    pathname: '/services',
    title: `${tServiceMenu('title')} | V Pay`,
    description: tServiceMenu('subtitle').replaceAll('\n', ' '),
    image: '/images/service-menu-business-transfer.png',
  })
}

export default async function ServicesPage() {
  const t = await getTranslations('nav')

  return <SubpageScaffold title={t('services')} />
}
