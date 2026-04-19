import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import AssetOrPlaceholder, { hasPublicAsset } from '@/components/ui/AssetOrPlaceholder'
import type { FeesReasonItem } from '@/types'

import Button from '../ui/Button'

const ctaBannerFilename = 'fees-banner.png'

function SectionIntro({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
      <section className="bg-white py-12 md:py-16 desktop:py-20">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 desktop:px-20 2xl:px-56">
        <div className="flex flex-col items-start gap-8 md:gap-10 desktop:gap-14">
          <h1
            className="text-[36px] font-bold leading-tight text-primary md:text-[48px] desktop:text-[60px] font-noto"
          >
            {title}
          </h1>
          <p
            className="text-[20px] font-medium leading-[1.5] text-[#666563] md:text-[24px] desktop:text-[32px] desktop:leading-10 font-noto"
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}

function ReasonTitle({ children }: { children: string }) {
  return (
    <h3
      className="text-[22px] font-medium leading-[1.35] text-[#1c1c1e] md:text-[24px] desktop:text-[32px] font-noto"
    >
      {children}
    </h3>
  )
}

function ReasonDescription({ children }: { children: string }) {
  return (
    <p
      className="whitespace-pre-line text-[15px] leading-[1.6] text-[#666563] md:text-[17px] desktop:text-[20px] desktop:leading-8 font-noto"
    >
      {children}
    </p>
  )
}

function MediaLeftReasonCard({
  item,
  filename,
}: {
  item: FeesReasonItem
  filename: string
}) {
  return (
    <article className="rounded-2xl bg-white px-6 py-6 md:px-8 md:py-8 desktop:px-10 desktop:py-3">
      <div className="flex flex-col gap-6 desktop:flex-row desktop:items-center desktop:gap-8">
        <div className="shrink-0">
          <AssetOrPlaceholder
            folder="icons"
            filename={filename}
            alt=""
            width={150}
            height={150}
            className="h-[112px] w-[112px] rounded-[24px] object-contain md:h-[128px] md:w-[128px] desktop:h-[150px] desktop:w-[150px]"
            sizes="(max-width: 767px) 112px, (max-width: 1199px) 128px, 150px"
          />
        </div>
        <div className="flex flex-1 flex-col items-start gap-4">
          <ReasonTitle>{item.title}</ReasonTitle>
          <ReasonDescription>{item.description}</ReasonDescription>
        </div>
      </div>
    </article>
  )
}

function TextReasonCard({ item }: { item: FeesReasonItem }) {
  return (
    <article className="h-full rounded-2xl bg-white px-6 py-6 md:px-8 md:py-8 desktop:px-10 desktop:py-8">
      <div className="flex h-full flex-col items-start justify-start gap-4">
        <ReasonTitle>{item.title}</ReasonTitle>
        <ReasonDescription>{item.description}</ReasonDescription>
      </div>
    </article>
  )
}

function MediaRightReasonCard({
  item,
  filename,
  large,
}: {
  item: FeesReasonItem
  filename: string
  large?: boolean
}) {
  const baseSize = large ? 200 : 170

  return (
    <article className="rounded-2xl bg-white px-6 py-6 md:px-8 md:py-8 desktop:px-10 desktop:py-3">
      <div className="flex flex-col gap-6 desktop:flex-row desktop:items-center desktop:gap-8">
        <div className="flex flex-1 flex-col items-start gap-4">
          <ReasonTitle>{item.title}</ReasonTitle>
          <ReasonDescription>{item.description}</ReasonDescription>
        </div>
        <div className="shrink-0 self-center desktop:self-auto">
          <AssetOrPlaceholder
            folder="icons"
            filename={filename}
            alt=""
            width={baseSize}
            height={baseSize}
            className="h-[136px] w-[136px] rounded-[24px] object-contain md:h-[152px] md:w-[152px] desktop:h-[170px] desktop:w-[170px]"
            sizes="(max-width: 767px) 136px, (max-width: 1199px) 152px, 170px"
          />
        </div>
      </div>
    </article>
  )
}

export default async function FeesContent() {
  const t = await getTranslations('feesPage')
  const reasonItems = t.raw('reasons.items') as FeesReasonItem[]

  return (
    <main className="bg-white">
      <SectionIntro
        subtitle={t('comparisonSubtitle')}
        title={t('comparisonTitle')}
      />

      <SectionIntro
        subtitle={t('feeGuideSubtitle')}
        title={t('feeGuideTitle')}
      />

      <section className="bg-[#f6f2eb] py-14 md:py-20 desktop:py-36">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 desktop:px-20 2xl:px-56">
          <div className="flex flex-col gap-8 desktop:gap-20">
            <div className="flex flex-col gap-6 desktop:flex-row desktop:items-center desktop:justify-between">
              <h2
                className="text-[34px] font-bold leading-tight text-primary md:text-[40px] desktop:text-[48px] font-noto"
              >
                {t('reasons.title')}
              </h2>

              {/* TODO: Connect to remittance app or onboarding flow */}
              <Button
                className="h-12 self-start rounded-[500px] px-5 text-sm font-semibold shadow-none md:h-14 md:px-6 md:text-base desktop:h-16 desktop:px-6 desktop:text-2xl desktop:leading-8 font-inter opacity-50 cursor-not-allowed"
                disabled
              >
                {t('reasons.cta')}
              </Button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid gap-6 desktop:grid-cols-2 2xl:grid-cols-[minmax(0,1fr)_614px]">
                <MediaLeftReasonCard
                  item={reasonItems[0]}
                  filename='fees-reason-broker.svg'
                />
                <MediaLeftReasonCard
                  item={reasonItems[1]}
                  filename='fees-reason-digital.svg'
                />
              </div>

              <div className="grid gap-6 desktop:grid-cols-3">
                <TextReasonCard item={reasonItems[2]} />
                <TextReasonCard item={reasonItems[3]} />
                <TextReasonCard item={reasonItems[4]} />
              </div>

              <div className="grid gap-6 desktop:grid-cols-2 2xl:grid-cols-[614px_minmax(0,1fr)]">
                <MediaRightReasonCard
                  item={reasonItems[5]}
                  filename='fees-reason-routing.svg'
                />
                <MediaRightReasonCard
                  item={reasonItems[6]}
                  filename='fees-reason-network.svg'
                  large
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionIntro subtitle={t('limitSubtitle')} title={t('limitTitle')} />

      <SectionIntro subtitle={t('timeSubtitle')} title={t('timeTitle')} />

      <section className="bg-white py-14 md:py-20 desktop:py-24">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 desktop:px-20 2xl:px-60">
          <div className="relative overflow-hidden rounded-[32px] bg-[#120f0b] px-6 py-10 md:px-10 md:py-12 desktop:h-[330px] desktop:px-16 desktop:py-24">
            {hasPublicAsset('images', ctaBannerFilename) && (
              <Image
                src={`/images/${ctaBannerFilename}`}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc(100vw - 4rem), 960px"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.68)_35%,rgba(0,0,0,0.16)_100%)]" />

            <div className="relative z-10 flex max-w-[575px] flex-col gap-8 md:gap-10">
              <h2
                className="whitespace-pre-line text-[26px] font-bold leading-[1.2] text-white md:text-[38px] desktop:text-[48px] font-noto"
              >
                {t('ctaTitle')}
              </h2>

              {/* TODO: Replace with real app store link once available */}
              <Button className="h-12 self-start rounded-[500px] px-6 text-base font-bold shadow-none md:h-14 md:text-lg desktop:h-16 desktop:text-2xl desktop:leading-8 opacity-50 cursor-not-allowed" disabled>
                {t('ctaButton')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
