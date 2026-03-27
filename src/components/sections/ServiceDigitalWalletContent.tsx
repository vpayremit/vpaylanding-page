import { getLocale, getTranslations } from 'next-intl/server'

import {
  ServiceCoreTechnologySection,
  ServiceCtaImageSection,
  ServiceFaqSection,
  ServiceHeroSection,
  ServiceKeyContentSection,
  ServiceTargetReviewsSection,
} from '@/components/sections/service/ServiceShared'
import type { ServiceKeyItem, ServiceReviewItem, ServiceTechItem } from '@/types'

export default async function ServiceDigitalWalletContent() {
  const locale = await getLocale()
  const t = await getTranslations('servicePages.digitalWallet')
  const reviews = t.raw('reviews.items') as ServiceReviewItem[]
  const keyItems = t.raw('keyContent.items') as ServiceKeyItem[]
  const techItems = t.raw('coreTechnology.items') as ServiceTechItem[]
  const faqItems = t.raw('faq.items') as Array<{ question: string }>

  const ctaFilename = locale === 'ko' ? 'service-p2p-cta-ko.png' : 'service-p2p-cta-en.png'
  const reviewAvatars = ['service-wallet-review-avatar-1.png', 'service-wallet-review-avatar-2.png']

  return (
    <main className="bg-white">
      <ServiceHeroSection
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="service-digital-wallet-hero.png"
      />

      <ServiceTargetReviewsSection
        title={t('reviews.title')}
        reviews={reviews}
        reviewAvatars={reviewAvatars}
        cardMaxWidth="720px"
        avatarSizeClass="h-20 w-20 md:h-28 md:w-28 desktop:h-40 desktop:w-40"
        backgroundClassName="bg-[#7a7a7a]"
        cardWrapClassName="w-full max-w-[1220px]"
      />

      <ServiceKeyContentSection
        title={t('keyContent.title')}
        items={keyItems}
        itemClassName="flex flex-col items-center gap-4 px-2 py-4 text-center"
        textClassName="text-base font-medium leading-7 text-[#1c1c1e] md:text-xl desktop:text-2xl"
      />

      <ServiceCoreTechnologySection
        title={t('coreTechnology.title')}
        cta={t('coreTechnology.cta')}
        items={techItems}
      />

      <ServiceCtaImageSection image={ctaFilename} alt="Digital Wallet CTA" />
      <ServiceFaqSection title={t('faq.title')} items={faqItems} />
    </main>
  )
}
