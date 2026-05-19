import { getLocale, getTranslations } from 'next-intl/server'

import { getNotices, getPressReleases } from '@/data/news'
import { buildNewsArticleItems } from '@/lib/news'
import type { NewsChannelItem, NewsTabKey } from '@/types'

import NewsTabs from './NewsTabs'

export default async function NewsContent({ activeTab }: { activeTab: NewsTabKey }) {
  const [t, locale] = await Promise.all([getTranslations('newsPage'), getLocale()])
  const noticeItems = buildNewsArticleItems(getNotices(locale as 'ko' | 'en'), 'notice')
  const pressItems = buildNewsArticleItems(getPressReleases(locale as 'ko' | 'en'), 'pressReleases')
  const snsChannels = t.raw('sns.channels') as NewsChannelItem[]

  return (
    <main className="bg-white">
      <NewsTabs
        activeTab={activeTab}
        heroEyebrow={t('hero.eyebrow')}
        heroTitle={t('hero.title')}
        heroSubtitle={t('hero.subtitle')}
        noticeItems={noticeItems}
        noticeLabel={t('tabs.notice')}
        noticeMoreLabel={t('notice.moreLabel')}
        noticeEmptyState={t('notice.emptyState')}
        noticeSearchPlaceholder={t('notice.searchPlaceholder')}
        noticeSectionTitle={t('notice.sectionTitle')}
        partnershipHeroText={t('partnership.heroText')}
        partnershipLabel={t('tabs.partnership')}
        pressItems={pressItems}
        pressLabel={t('tabs.pressReleases')}
        pressMoreLabel={t('pressReleases.moreLabel')}
        pressEmptyState={t('pressReleases.emptyState')}
        pressSearchPlaceholder={t('pressReleases.searchPlaceholder')}
        pressSectionTitle={t('pressReleases.sectionTitle')}
        snsChannels={snsChannels}
        snsCta={t('sns.cta')}
        snsHeroText={t('sns.heroText')}
        snsLabel={t('tabs.sns')}
        snsSectionTitle={t('sns.sectionTitle')}
      />
    </main>
  )
}
