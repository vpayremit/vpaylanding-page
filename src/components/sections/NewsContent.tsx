import { getTranslations } from 'next-intl/server'

import { buildNewsArticleItems } from '@/lib/news'
import type { NewsArticleItem, NewsChannelItem, NewsTabKey } from '@/types'

import NewsTabs from './NewsTabs'

export default async function NewsContent({ activeTab }: { activeTab: NewsTabKey }) {
  const t = await getTranslations('newsPage')
  const noticeItems = buildNewsArticleItems(t.raw('notice.items') as NewsArticleItem[], 'notice')
  const pressItems = buildNewsArticleItems(t.raw('pressReleases.items') as NewsArticleItem[], 'pressReleases')
  const snsChannels = t.raw('sns.channels') as NewsChannelItem[]

  return (
    <main className="bg-white">
      <NewsTabs
        activeTab={activeTab}
        heroEyebrow={t('hero.eyebrow')}
        heroTitle={t('hero.title')}
        noticeItems={noticeItems}
        noticeLabel={t('tabs.notice')}
        noticeMoreLabel={t('notice.moreLabel')}
        noticeSearchPlaceholder={t('notice.searchPlaceholder')}
        noticeSectionTitle={t('notice.sectionTitle')}
        partnershipHeroText={t('partnership.heroText')}
        partnershipLabel={t('tabs.partnership')}
        pressItems={pressItems}
        pressLabel={t('tabs.pressReleases')}
        pressMoreLabel={t('pressReleases.moreLabel')}
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
