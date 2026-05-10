import { getLocale, getTranslations } from 'next-intl/server'

import {
  ServiceCoreTechnologySection,
  ServiceCtaImageSection,
  ServiceFaqSection,
  ServiceHeroSection,
  ServiceKeyContentSection,
  ServiceProcessSection,
  ServiceTargetReviewsSection,
} from '@/components/sections/service/ServiceShared'
import type { ServiceKeyItem, ServiceReviewItem, ServiceTechItem } from '@/types'

export default async function ServicePersonalTransferContent() {
  const locale = await getLocale()
  const t = await getTranslations('servicePages.personalTransfer')
  const reviews = t.raw('reviews.items') as ServiceReviewItem[]
  const keyItems = t.raw('keyContent.items') as ServiceKeyItem[]
  const techItems = t.raw('coreTechnology.items') as ServiceTechItem[]
  const faqItems = t.raw('faq.items') as Array<{ question: string; answer: string }>

  const processFilename = locale === 'ko' ? 'service-p2p-process-ko.png' : 'service-p2p-process-en.png'
  const ctaFilename = locale === 'ko' ? 'service-p2p-cta-ko.png' : 'service-p2p-cta-en.png'
  const reviewAvatars = ['testimonial-1.png', 'testimonial-2.png', 'testimonial-3.png']

  return (
    <main className="bg-white">
      <ServiceHeroSection
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="service-p2p-hero.png"
      />

      <ServiceTargetReviewsSection
        title={t('reviews.title')}
        reviews={reviews}
        reviewAvatars={reviewAvatars}
        cardMaxWidth="640px"
        cardWrapClassName="w-full max-w-[1380px]"
        alternateSides
      />

      <ServiceKeyContentSection
        title={t('keyContent.title')}
        items={keyItems}
        columnsClassName="grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 desktop:grid-cols-3 desktop:gap-y-10"
        itemClassName="flex min-h-[122px] flex-col items-center gap-4 text-center desktop:items-start desktop:text-left"
        textClassName="text-base font-medium leading-7 text-[#1c1c1e] md:text-xl desktop:text-2xl"
      />

      <ServiceProcessSection title={t('process.title')} cta={t('process.cta')} image={processFilename} />
      <ServiceCoreTechnologySection title={t('coreTechnology.title')} cta={t('coreTechnology.cta')} items={techItems} />
      <ServiceCtaImageSection image={ctaFilename} alt="P2P CTA" />
      <ServiceFaqSection title={t('faq.title')} items={faqItems} />
    </main>
  )
}
