import type { NewsArticleCardItem, NewsArticleItem, NewsArticleSource } from '@/types'

export function buildNewsArticleItems(
  items: NewsArticleItem[],
  source: NewsArticleSource,
): NewsArticleCardItem[] {
  return items.map((item, index) => ({
    ...item,
    slug: `${source === 'notice' ? 'notice' : 'press-release'}-${String(index + 1).padStart(2, '0')}`,
    source,
  }))
}

export function getRelatedNewsItems(
  items: NewsArticleCardItem[],
  current: NewsArticleCardItem,
  count = 3,
): NewsArticleCardItem[] {
  return items.filter((item) => item.source === current.source && item.slug !== current.slug).slice(0, count)
}
