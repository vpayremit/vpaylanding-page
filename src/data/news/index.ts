import type { NewsArticleItem } from '@/types'

import noticesEn from './notices.en.json'
import noticesKo from './notices.ko.json'
import pressReleasesEn from './press-releases.en.json'
import pressReleasesKo from './press-releases.ko.json'

type Locale = 'ko' | 'en'

export function getNotices(locale: Locale): NewsArticleItem[] {
  return (locale === 'ko' ? noticesKo : noticesEn) as NewsArticleItem[]
}

export function getPressReleases(locale: Locale): NewsArticleItem[] {
  return (locale === 'ko' ? pressReleasesKo : pressReleasesEn) as NewsArticleItem[]
}
