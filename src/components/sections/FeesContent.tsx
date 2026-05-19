import type { ComponentType, SVGProps } from 'react'

import Image from 'next/image'
import Scale from 'lucide-react/dist/esm/icons/scale'
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check'
import Zap from 'lucide-react/dist/esm/icons/zap'
import { getLocale, getTranslations } from 'next-intl/server'

import AssetOrPlaceholder, { hasPublicAsset } from '@/components/ui/AssetOrPlaceholder'
import feesData from '@/data/fees.json'
import { cn } from '@/lib/utils'
import type { FeeEntry, FeesReasonItem } from '@/types'

import Button from '../ui/Button'

type LucideIconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: string | number }>

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

function TextReasonCard({
  item,
  Icon,
}: {
  item: FeesReasonItem
  Icon?: LucideIconComponent
}) {
  return (
    <article className="h-full rounded-2xl bg-white px-6 py-6 md:px-8 md:py-8 desktop:px-10 desktop:py-8">
      <div className="flex h-full flex-col items-start justify-start gap-4">
        {/* Lucide placeholder. Swap to AssetOrPlaceholder with designer SVG when delivered:
            fees-reason-scale.svg / fees-reason-fx.svg / fees-reason-license.svg */}
        {Icon ? (
          <Icon
            className="h-10 w-10 text-cta md:h-12 md:w-12 desktop:h-14 desktop:w-14"
            strokeWidth={1.8}
          />
        ) : null}
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

function FeeCard({ entry, locale, t }: { entry: FeeEntry; locale: 'ko' | 'en'; t: FeeCardTranslator }) {
  const isAvailable = entry.status === 'available'
  const countryName = locale === 'ko' ? entry.country_ko : entry.country
  const processingTime = locale === 'ko' ? entry.processing_time_ko : entry.processing_time

  return (
    <article className="flex h-full flex-col gap-6 rounded-2xl border border-[#e8e3da] bg-white p-6 md:p-8 desktop:p-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {hasPublicAsset('icons', entry.flag) ? (
            <Image
              src={`/icons/${entry.flag}`}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
              sizes="40px"
              unoptimized
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8e3da] text-[11px] font-bold text-[#666563] font-inter">
              {entry.currency.slice(0, 2)}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-[18px] font-bold leading-[1.2] text-primary md:text-[20px] desktop:text-[22px] font-noto">
              {countryName}
            </p>
            <p className="text-[13px] leading-[1.4] text-[#8e8e93] md:text-[14px] font-inter">
              {entry.currency}
            </p>
          </div>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold leading-none md:text-[13px] font-inter',
            isAvailable
              ? 'bg-[#e6f7ee] text-[#0a7a3b]'
              : 'bg-[#f0f0f3] text-[#666563]',
          )}
        >
          {isAvailable ? t('statusBadge.available') : t('statusBadge.comingSoon')}
        </span>
      </div>

      {isAvailable ? (
        <dl className="grid gap-4 text-[14px] leading-[1.4] md:text-[15px] desktop:text-[16px] font-noto">
          <FeeCardRow label={t('cardLabels.fee')} value={entry.fee} />
          <FeeCardRow label={t('cardLabels.processingTime')} value={processingTime} />
          <FeeCardRow label={t('cardLabels.limitPerTxn')} value={entry.limit_per_txn} />
          <FeeCardRow label={t('cardLabels.limitAnnual')} value={entry.limit_annual} />
        </dl>
      ) : null}
    </article>
  )
}

function FeeCardRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[#f0eee9] pb-3 last:border-b-0 last:pb-0">
      <dt className="text-[#666563]">{label}</dt>
      <dd className="text-right font-semibold text-primary">{value}</dd>
    </div>
  )
}

type FeeCardTranslator = (key: string) => string

export default async function FeesContent() {
  const [t, locale] = await Promise.all([getTranslations('feesPage'), getLocale()])
  const reasonItems = t.raw('reasons.items') as FeesReasonItem[]
  const fees = feesData as FeeEntry[]
  const safeLocale: 'ko' | 'en' = locale === 'en' ? 'en' : 'ko'

  return (
    <main className="bg-white">
      <section className="bg-white py-12 md:py-16 desktop:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 desktop:px-20 2xl:px-56">
          <div className="flex flex-col gap-10 md:gap-12 desktop:gap-16">
            <div className="flex flex-col items-start gap-6 md:gap-8 desktop:gap-10">
              <h1 className="text-[36px] font-bold leading-tight text-primary md:text-[48px] desktop:text-[60px] font-noto">
                {t('comparisonTitle')}
              </h1>
              <p className="text-[20px] font-medium leading-[1.5] text-[#666563] md:text-[24px] desktop:text-[32px] desktop:leading-10 font-noto">
                {t('comparisonSubtitle')}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 desktop:grid-cols-3">
              {fees.map((entry) => (
                <FeeCard key={entry.country} entry={entry} locale={safeLocale} t={t} />
              ))}
            </div>

            <p className="text-[12px] leading-[1.6] text-[#8e8e93] md:text-[13px] desktop:text-[14px] font-noto">
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </section>

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
                className="h-12 self-start rounded-[500px] px-5 text-sm font-semibold shadow-none md:h-14 md:px-6 md:text-base desktop:h-16 desktop:px-6 desktop:text-2xl desktop:leading-8 font-inter opacity-50"
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
                <TextReasonCard item={reasonItems[2]} Icon={Scale} />
                <TextReasonCard item={reasonItems[3]} Icon={Zap} />
                <TextReasonCard item={reasonItems[4]} Icon={ShieldCheck} />
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
              <Button className="h-12 self-start rounded-[500px] px-6 text-base font-bold shadow-none md:h-14 md:text-lg desktop:h-16 desktop:text-2xl desktop:leading-8 opacity-50" disabled>
                {t('ctaButton')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
