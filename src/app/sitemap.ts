import type { MetadataRoute } from 'next'

import { getNotices, getPressReleases } from '@/data/news'
import { TERMS_SLUGS } from '@/data/terms'
import { routing } from '@/i18n/routing'
import { getSiteUrl } from '@/lib/metadata'
import { buildNewsArticleItems } from '@/lib/news'
import { SERVICE_MENU_SLUGS } from '@/lib/service-menu'

const STATIC_PATHS: Array<{
  path: string
  priority: number
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
}> = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/fees', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/news', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/terms', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getSiteUrl().origin
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    for (const { path, priority, changeFrequency } of STATIC_PATHS) {
      entries.push({
        url: `${origin}/${locale}${path}`,
        lastModified,
        changeFrequency,
        priority,
      })
    }

    for (const slug of SERVICE_MENU_SLUGS) {
      entries.push({
        url: `${origin}/${locale}/services/${slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }

    for (const slug of TERMS_SLUGS) {
      entries.push({
        url: `${origin}/${locale}/terms/${slug}`,
        lastModified,
        changeFrequency: 'yearly',
        priority: 0.4,
      })
    }

    const noticeItems = buildNewsArticleItems(getNotices(locale), 'notice')
    const pressItems = buildNewsArticleItems(getPressReleases(locale), 'pressReleases')

    for (const article of [...noticeItems, ...pressItems]) {
      entries.push({
        url: `${origin}/${locale}/news/${article.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
  }

  return entries
}
