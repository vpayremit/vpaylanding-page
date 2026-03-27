import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import NewsDetailContent from '@/components/sections/NewsDetailContent'
import { buildNewsArticleItems, getRelatedNewsItems } from '@/lib/news'
import type { NewsArticleItem, NewsDetailSection } from '@/types'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

async function getNewsDetailData(locale: string) {
  const t = await getTranslations({ locale, namespace: 'newsPage' })
  const noticeItems = buildNewsArticleItems(t.raw('notice.items') as NewsArticleItem[], 'notice')
  const pressItems = buildNewsArticleItems(
    t.raw('pressReleases.items') as NewsArticleItem[],
    'pressReleases',
  )

  return {
    articles: [...noticeItems, ...pressItems],
    breadcrumbLabel: t('detail.breadcrumb'),
    detailDate: t('detail.date'),
    detailTitle: t('detail.title'),
    moreLabel: t('detail.moreLabel'),
    sections: t.raw('detail.sections') as NewsDetailSection[],
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const { articles, detailTitle, sections } = await getNewsDetailData(locale)
  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    return {}
  }

  return {
    title: `${detailTitle} | V Pay`,
    description: sections[0]?.paragraphs[0] ?? '',
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params
  const { articles, breadcrumbLabel, detailDate, detailTitle, moreLabel, sections } =
    await getNewsDetailData(locale)
  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    notFound()
  }

  const relatedItems = getRelatedNewsItems(articles, article)

  return (
    <NewsDetailContent
      breadcrumbLabel={breadcrumbLabel}
      detailDate={detailDate}
      detailTitle={detailTitle}
      moreLabel={moreLabel}
      relatedItems={relatedItems}
      sections={sections}
    />
  )
}
