import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import type { WhyItem } from '@/types'

import Container from '../ui/Container'

const whyVPayImages = [
  '/images/whyvpay-pooling.png',
  '/images/whyvpay-prefunding.png',
  '/images/whyvpay-routing.png',
  '/images/whyvpay-risk.png',
] as const

export default async function WhyVPay() {
  const t = await getTranslations('whyVpay')
  const items = t.raw('items') as WhyItem[]

  return (
    <section className="bg-white py-20 md:py-28 desktop:py-[150px]">
      <Container>
        <div className="mx-auto max-w-[1120px]">
          <div className="mx-auto max-w-[980px] text-center desktop:max-w-none">
            <h2
              className="text-[36px] font-bold leading-[1.15] text-[#1A2530] md:text-[48px] desktop:whitespace-nowrap desktop:text-[64px] font-noto"
            >
              {t('sectionTitle')}
            </h2>
          </div>

          <div className="mt-14 grid gap-x-6 gap-y-12 md:mt-16 md:grid-cols-2 md:gap-y-14 desktop:mt-20 desktop:gap-x-10 desktop:gap-y-20">
            {items.map((item, index) => (
              <article key={item.title} className="w-full">
                <div className="flex min-h-[180px] items-center justify-center rounded-[24px] bg-[#F7F5EF]/50 px-4 py-8 md:min-h-[220px] md:px-6 md:py-10 desktop:min-h-[264px] desktop:px-[10px] desktop:py-8">
                  <Image
                    src={whyVPayImages[index] ?? whyVPayImages[0]}
                    alt={item.title}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 767px) 120px, (max-width: 1199px) 160px, 200px"
                    className="h-[120px] w-[120px] object-contain md:h-[160px] md:w-[160px] desktop:h-[200px] desktop:w-[200px]"
                  />
                </div>

                <div className="mt-6 space-y-3 desktop:mt-6 desktop:space-y-4">
                  <h3
                    className="text-[24px] font-semibold leading-[1.2] text-[#1C1C1E] md:text-[28px] desktop:text-[32px] font-noto"
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[16px] leading-[1.5] text-[#666563] md:text-[18px] desktop:text-[22px] desktop:leading-[1.35] font-noto"
                    style={{ fontWeight: 400 }}
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
