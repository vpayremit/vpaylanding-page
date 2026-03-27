import { getLocale, getTranslations } from 'next-intl/server'

import {
  AssetOrPlaceholder,
  ServiceCoreTechnologySection,
  ServiceCtaImageSection,
  ServiceFaqSection,
  ServiceHeroSection,
  ServiceKeyContentSection,
  ServiceProcessSection,
} from '@/components/sections/service/ServiceShared'
import type { ServiceKeyItem, ServiceTechItem } from '@/types'

export default async function ServiceBusinessTransferContent() {
  const locale = await getLocale()
  const t = await getTranslations('servicePages.businessTransfer')
  const keyItems = t.raw('keyContent.items') as ServiceKeyItem[]
  const techItems = t.raw('coreTechnology.items') as ServiceTechItem[]
  const faqItems = t.raw('faq.items') as Array<{ question: string }>

  const processFilename = locale === 'ko' ? 'service-b2b-process-ko.png' : 'service-b2b-process-en.png'
  const ctaFilename = locale === 'ko' ? 'service-p2p-cta-ko.png' : 'service-p2p-cta-en.png'

  return (
    <main className="bg-white">
      <ServiceHeroSection
        badge={t('hero.badge')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        image="service-b2b-hero.png"
      />

      <section className="px-4 py-12 desktop:px-56 desktop:py-28">
        <div className="mx-auto flex max-w-[1460px] flex-col gap-10 rounded-[32px] bg-white desktop:flex-row desktop:items-center desktop:gap-16">
          <div className="overflow-hidden rounded-[28px] desktop:w-[568px] desktop:shrink-0">
            <AssetOrPlaceholder
              folder="images"
              filename="service-b2b-review-visual.png"
              alt={t('reviews.title')}
              width={568}
              height={600}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1199px) 100vw, 568px"
            />
          </div>
          <div className="flex flex-1 flex-col gap-10 desktop:gap-16">
            <h2 className="text-3xl font-bold text-primary md:text-5xl desktop:text-6xl font-noto">
              {t('reviews.title')}
            </h2>
            <div className="flex flex-col items-end gap-6">
              <div className="flex items-start gap-6">
                <span className="mt-1 text-4xl font-bold leading-none text-cta opacity-50 desktop:text-6xl">“</span>
                <p className="text-2xl leading-[1.5] text-primary md:text-3xl md:leading-[1.5] desktop:text-4xl desktop:leading-[54px] font-noto">
                  {t('reviews.quote')}
                </p>
              </div>
              <p className="text-right text-2xl font-bold text-cta desktop:text-3xl font-noto">
                {t('reviews.author')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServiceKeyContentSection title={t('keyContent.title')} items={keyItems} />

      <ServiceProcessSection title={t('process.title')} cta={t('process.cta')} image={processFilename} />
      <ServiceCoreTechnologySection title={t('coreTechnology.title')} cta={t('coreTechnology.cta')} items={techItems} />
      <ServiceCtaImageSection image={ctaFilename} alt="B2B CTA" />
      <ServiceFaqSection title={t('faq.title')} items={faqItems} />
    </main>
  )
}
