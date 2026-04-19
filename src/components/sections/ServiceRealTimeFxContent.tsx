import { getLocale, getTranslations } from 'next-intl/server'

import Button from '@/components/ui/Button'
import {
  AssetOrPlaceholder,
  ServiceCtaImageSection,
  ServiceFaqSection,
  ServiceHeroSection,
  ServiceKeyContentSection,
  ServiceProcessSection,
  ServiceTargetReviewsSection,
} from '@/components/sections/service/ServiceShared'
import type { ServiceKeyItem, ServiceReviewItem, ServiceTechItem } from '@/types'

export default async function ServiceRealTimeFxContent() {
  const locale = await getLocale()
  const t = await getTranslations('servicePages.realTimeFx')
  const reviews = t.raw('reviews.items') as ServiceReviewItem[]
  const keyItems = t.raw('keyContent.items') as ServiceKeyItem[]
  const techItems = t.raw('coreTechnology.items') as ServiceTechItem[]
  const faqItems = t.raw('faq.items') as Array<{ question: string }>

  const processFilename = locale === 'ko' ? 'service-fx-process-ko.png' : 'service-fx-process-en.png'
  const ctaFilename = locale === 'ko' ? 'service-p2p-cta-ko.png' : 'service-p2p-cta-en.png'
  const reviewAvatars = ['service-fx-testimonial-1.png', 'service-fx-testimonial-2.png']

  return (
    <main className="bg-white">
      <ServiceHeroSection
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="service-fx-hero.png"
      />

      <ServiceTargetReviewsSection
        title={t('reviews.title')}
        reviews={reviews}
        reviewAvatars={reviewAvatars}
        cardMaxWidth="700px"
      />

      <ServiceKeyContentSection title={t('keyContent.title')} items={keyItems} />

      <ServiceProcessSection title={t('process.title')} cta={t('process.cta')} image={processFilename} />

      <section className="bg-stone-100 px-4 py-16 desktop:px-56 desktop:py-36">
        <div className="mx-auto flex max-w-[1460px] flex-col gap-12 desktop:gap-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-bold text-primary md:text-5xl desktop:text-6xl font-noto">
              {t('coreTechnology.title')}
            </h2>
            {/* TODO: Connect to fees page or service onboarding flow */}
            <Button className="self-start px-6 text-lg desktop:self-auto desktop:text-2xl opacity-50" size="md" disabled>
              {t('coreTechnology.cta')}
            </Button>
          </div>

          <div className="grid gap-8 desktop:grid-cols-2">
            {techItems.map((item) => (
              <article key={item.title} className="flex flex-col gap-6 rounded-[24px] bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.06)] desktop:flex-row desktop:items-center desktop:gap-8 desktop:rounded-[32px]">
                <div className="flex w-full shrink-0 justify-center rounded-[16px] bg-stone-100/50 px-4 py-5 desktop:w-44">
                  <AssetOrPlaceholder
                    folder="images"
                    filename={item.image}
                    alt={item.title}
                    width={114}
                    height={114}
                    className="h-28 w-28 object-contain"
                    sizes="114px"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4">
                  <h3 className="text-2xl font-medium text-[#1c1c1e] desktop:text-3xl font-noto">
                    {item.title}
                  </h3>
                  <p className="text-lg leading-8 text-[#666563] desktop:text-xl font-noto">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceCtaImageSection image={ctaFilename} alt="Real-Time FX CTA" />
      <ServiceFaqSection title={t('faq.title')} items={faqItems} />
    </main>
  )
}
