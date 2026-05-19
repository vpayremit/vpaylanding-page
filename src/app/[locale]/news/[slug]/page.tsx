import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import NewsDetailContent from '@/components/sections/NewsDetailContent'
import { getNotices, getPressReleases } from '@/data/news'
import { buildNewsArticleItems, getRelatedNewsItems } from '@/lib/news'
import { createBasicMetadata } from '@/lib/metadata'
import type { LocaleSlugPageProps, NewsDetailSection } from '@/types'

async function getNewsDetailData(locale: string) {
  const t = await getTranslations({ locale, namespace: 'newsPage' })
  const noticeItems = buildNewsArticleItems(getNotices(locale as 'ko' | 'en'), 'notice')
  const pressItems = buildNewsArticleItems(
    getPressReleases(locale as 'ko' | 'en'),
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

export async function generateMetadata({ params }: LocaleSlugPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const { articles, detailTitle, sections } = await getNewsDetailData(locale)
  const article = articles.find((item) => item.slug === slug)

  if (!article) {
    return {}
  }

  return createBasicMetadata({
    locale,
    pathname: `/news/${slug}`,
    title: `${detailTitle} | V Pay`,
    description: sections[0]?.paragraphs[0] ?? '',
    image: '/images/news-detail-hero.png',
    type: 'article',
  })
}

export default async function NewsDetailPage({ params }: LocaleSlugPageProps) {
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
