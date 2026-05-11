import Image from 'next/image'
import Clock from 'lucide-react/dist/esm/icons/clock'
import Mail from 'lucide-react/dist/esm/icons/mail'
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import PhoneCall from 'lucide-react/dist/esm/icons/phone-call'
import { getTranslations } from 'next-intl/server'

import type { ContactFaqItem, ContactInfoItem } from '@/types'

import Button from '../ui/Button'
import ContactFaqPanel from './ContactFaqPanel'

const heroImageFilename = 'contact-hero-badge.png'
const officeImageFilename = 'contact-office-photo.png'
const helpBannerFilename = 'contact-help-banner.png'

const heroImagePath = `/images/${heroImageFilename}`
const officeImagePath = `/images/${officeImageFilename}`
const helpBannerPath = `/images/${helpBannerFilename}`

function ContactIcon({ type }: { type: ContactInfoItem['type'] }) {
  const className = 'h-11 w-11 shrink-0 text-cta'

  if (type === 'address') {
    return <MapPin className={className} strokeWidth={1.8} />
  }

  if (type === 'phone') {
    return <PhoneCall className={className} strokeWidth={1.8} />
  }

  return <Mail className={className} strokeWidth={1.8} />
}

export default async function ContactContent() {
  const t = await getTranslations('contactPage')
  const contactItems = t.raw('contactItems') as ContactInfoItem[]
  const faqItems = t.raw('faq.items') as ContactFaqItem[]

  const tabs = [
    { key: 'paymentStatus', label: t('faq.tabs.paymentStatus') },
    { key: 'refundStatus', label: t('faq.tabs.refundStatus') },
    { key: 'settlementStatus', label: t('faq.tabs.settlementStatus') },
  ]

  return (
    <main className="bg-white">
      <section className="pt-12 md:pt-16 desktop:pt-[100px]">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 desktop:px-0">
          <div className="flex flex-col gap-10 desktop:flex-row desktop:items-end desktop:gap-[72px]">
            <div className="flex flex-col gap-12 desktop:min-w-0 desktop:flex-[1_1_0] desktop:max-w-[904px] desktop:gap-[80px] desktop:[padding-left:min(240px,12.5vw)]">
              <div className="w-full max-w-[463px]">
                <h1
                  className="text-[40px] font-bold leading-tight text-[#000000] md:text-[52px] desktop:text-[64px] desktop:leading-none font-noto"
                >
                  {t('heroTitle')}
                </h1>
                <p
                  className="mt-4 max-w-[463px] text-[20px] leading-[1.55] text-[#1c1c1e] md:text-[26px] desktop:mt-6 desktop:text-[32px] desktop:leading-[44px] font-noto"
                >
                  {t('heroSubtitle')}
                </p>
              </div>

              <address className="flex flex-col gap-8 not-italic md:gap-10 desktop:w-[482px] desktop:gap-12 desktop:pb-[80px]">
                {contactItems.map((item) => (
                  <div key={item.type} className="flex items-start gap-4 desktop:gap-5">
                    <ContactIcon type={item.type} />
                    <div className="flex flex-col items-start gap-3 pt-1 md:pt-2 desktop:gap-4">
                      <p
                        className="text-[22px] font-medium leading-none text-[#1c1c1e] md:text-[24px] desktop:text-[28px] desktop:leading-[23.9px] font-noto"
                      >
                        {item.label}
                      </p>
                      <p
                        className="max-w-[418px] text-[16px] leading-7 text-[#666563] md:text-[18px] desktop:text-[20px] font-noto"
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-4 desktop:gap-5">
                  <Clock className="h-11 w-11 shrink-0 text-cta" strokeWidth={1.8} />
                  <div className="flex flex-col items-start gap-3 pt-1 md:pt-2 desktop:gap-4">
                    <p
                      className="text-[22px] font-medium leading-none text-[#1c1c1e] md:text-[24px] desktop:text-[28px] desktop:leading-[23.9px] font-noto"
                    >
                      {t('businessHoursLabel')}
                    </p>
                    <p
                      className="max-w-[418px] text-[16px] leading-7 text-[#666563] md:text-[18px] desktop:text-[20px] font-noto"
                    >
                      {t('businessHoursValue')}
                    </p>
                  </div>
                </div>
              </address>
            </div>

            <div className="relative aspect-[944/623] w-full overflow-hidden bg-[#d9d9d9] desktop:min-w-0 desktop:max-w-[944px] desktop:flex-[1_1_0]">
              <Image
                src={heroImagePath}
                alt=""
                fill
                className="object-cover"
                priority
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc(100vw - 4rem), 944px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-12 pb-10 md:pt-16 md:pb-14 desktop:pt-[100px] desktop:pb-[80px]">
        <div className="mx-auto w-full max-w-[1920px] px-0">
          <div className="relative h-[511px] w-full overflow-hidden">
            <Image
              src={officeImagePath}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      <ContactFaqPanel
        items={faqItems}
        moreLabel={t('faq.moreLabel')}
        searchPlaceholder={t('faq.searchPlaceholder')}
        tabs={tabs}
        title={t('faq.title')}
      />

      <section className="bg-white pt-10 pb-16 md:pt-10 md:pb-20 desktop:pt-[40px] desktop:pb-[100px]">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 desktop:px-[230px]">
          <div className="cta-banner relative min-h-[252px] overflow-hidden rounded-[32px] md:min-h-[288px] desktop:h-[330px]">
            <Image
              src={helpBannerPath}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc(100vw - 4rem), 1460px"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />

            <div className="cta-content absolute inset-0 flex flex-col items-start justify-start gap-4 px-5 py-6 md:gap-5 md:px-8 md:py-8 desktop:gap-6 desktop:px-[100px] desktop:py-[64px]">
              <div className="flex max-w-[1004px] flex-col items-start gap-3 md:gap-4 desktop:gap-6">
                <h2
                  className="text-[22px] font-bold leading-[1.2] text-white md:text-[30px] desktop:text-[48px] font-noto"
                >
                  {t('helpTitle')}
                </h2>
                <p
                  className="max-w-[1004px] text-[13px] leading-[1.45] text-white md:text-[16px] md:leading-[1.55] desktop:text-[28px] desktop:leading-[44px] font-noto"
                >
                  {t('helpSubtitle')}
                </p>
              </div>

              {/* TODO: Connect to support channel (e.g. mailto:info@vpayv.com or /contact form) */}
              <Button
                className="h-9 rounded-[500px] px-4 text-[11px] font-bold leading-4 shadow-none md:h-10 md:px-5 md:text-xs desktop:h-11 desktop:px-[26px] desktop:text-sm desktop:leading-5 font-inter opacity-50"
                disabled
              >
                {t('helpCta')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
