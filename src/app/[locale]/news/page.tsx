import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'

import NewsContent from '@/components/sections/NewsContent'
import type { NewsTabKey } from '@/types'

interface Props {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ tab?: string }>
}

function normalizeTab(value?: string): NewsTabKey {
  if (value === 'pressReleases' || value === 'sns' || value === 'partnership') {
    return value
  }

  return 'notice'
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'newsPage' })

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function NewsPage({ searchParams }: Props) {
  const activeTab = normalizeTab((await searchParams).tab)

  return <NewsContent activeTab={activeTab} />
}
