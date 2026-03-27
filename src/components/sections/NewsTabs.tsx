import Search from 'lucide-react/dist/esm/icons/search'

import Image from 'next/image'

import type { NewsArticleCardItem, NewsChannelItem, NewsTabKey } from '@/types'
import { Link } from '@/i18n/navigation'

type HeroConfig = {
  filename: string
  overlayText?: string
}

interface NewsTabsProps {
  activeTab: NewsTabKey
  heroEyebrow: string
  heroTitle: string
  noticeLabel: string
  pressLabel: string
  snsLabel: string
  partnershipLabel: string
  noticeSectionTitle: string
  noticeSearchPlaceholder: string
  noticeMoreLabel: string
  noticeItems: NewsArticleCardItem[]
  pressSectionTitle: string
  pressSearchPlaceholder: string
  pressMoreLabel: string
  pressItems: NewsArticleCardItem[]
  snsHeroText: string
  snsSectionTitle: string
  snsCta: string
  snsChannels: NewsChannelItem[]
  partnershipHeroText: string
}

const bannerImages: Record<NewsTabKey, HeroConfig> = {
  notice: { filename: 'news-hero-notice.png' },
  pressReleases: { filename: 'news-hero-press-releases.png' },
  sns: { filename: 'news-hero-sns.png' },
  partnership: { filename: 'news-hero-partnership.png' },
}

const snsPostImages = [
  'news-sns-post-01.png',
  'news-sns-post-02.png',
  'news-sns-post-03.png',
  'news-sns-post-04.png',
  'news-sns-post-05.png',
  'news-sns-post-06.png',
]

const partnershipLogosImage = 'news-partnership-logos.png'

function HeroBanner({
  config,
  overlayText,
}: {
  config: HeroConfig
  overlayText?: string
}) {
  return (
    <section className="w-full border-t border-black/5">
      <div className="relative aspect-[1924/511] w-full overflow-hidden bg-[#ece7df]">
        <Image
          src={`/images/${config.filename}`}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {overlayText ? (
          <>
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <p
                className="max-w-[720px] text-center text-[18px] font-bold leading-[1.35] text-white md:text-[24px] desktop:text-[40px] font-noto"
              >
                {overlayText}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}

function ArticleCard({
  item,
}: {
  item: NewsArticleCardItem
}) {
  return (
    <Link
      aria-label={item.title}
      className="group flex h-full cursor-pointer flex-col gap-5"
      href={`/news/${item.slug}`}
    >
      <div className="relative overflow-hidden rounded-[20px] border-b-[8px] border-[#ffd400] bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)] desktop:border-b-[12px]">
        <Image
          src={`/images/${item.image}`}
          alt=""
          width={400}
          height={298}
          className="aspect-[400/258] w-full object-cover"
          sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc((100vw - 5rem) / 2), 400px"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 shadow-sm">
          <Image src="/icons/logo-vpay.svg" alt="V Pay" width={54} height={28} className="h-auto w-[42px] desktop:w-[54px]" />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <p className="text-xs font-bold leading-6 text-cta md:text-sm font-inter">
          {item.date}
        </p>
        <div className="flex flex-1 flex-col gap-3">
          <h3
            className="text-[20px] font-medium leading-[1.35] text-[#1c1c1e] transition group-hover:text-cta md:text-[24px] desktop:text-[32px] desktop:leading-10 font-noto"
          >
            {item.title}
          </h3>
          <p
            className="text-[15px] font-medium leading-7 text-[#666563] md:text-[17px] desktop:text-[20px] desktop:leading-8 font-noto"
          >
            {item.excerpt}
          </p>
        </div>
      </div>
    </Link>
  )
}

function SearchBox({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex w-full items-center justify-between rounded-xl border border-[#e5e7eb] bg-[#f5f5f5] px-4 py-3 md:w-[288px] md:px-6 md:py-4">
      <span className="text-sm font-bold leading-6 text-[#a1a1aa] font-inter">
        {placeholder}
      </span>
      <Search className="h-5 w-5 text-[#8e8e93]" />
    </div>
  )
}

function ArticleGridSection({
  items,
  moreLabel,
  searchPlaceholder,
  sectionTitle,
}: {
  items: NewsArticleCardItem[]
  moreLabel: string
  searchPlaceholder: string
  sectionTitle: string
}) {
  return (
    <section className="bg-white py-12 md:py-16 desktop:px-56 desktop:py-20">
      <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-4 md:px-8 desktop:gap-14 desktop:px-0">
        <div className="flex flex-col gap-4 desktop:flex-row desktop:items-center desktop:justify-between">
          <h2
            className="text-[28px] font-bold leading-tight text-primary md:text-[32px] desktop:text-[36px] font-noto"
          >
            {sectionTitle}
          </h2>
          <SearchBox placeholder={searchPlaceholder} />
        </div>

        <div className="grid gap-8 md:grid-cols-2 desktop:grid-cols-3 desktop:gap-x-10 desktop:gap-y-16">
          {items.map((item) => (
            <ArticleCard item={item} key={`${item.image}-${item.date}`} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <button
            className="inline-flex h-12 cursor-pointer items-center justify-center rounded-[500px] border border-[#d1d1d6] px-6 text-sm font-bold leading-6 text-primary transition hover:border-cta hover:text-cta"
            type="button"
          >
            {moreLabel}
          </button>
        </div>
      </div>
    </section>
  )
}

function SocialIcon({ filename }: { filename: string }) {
  return (
    <Image
      src={`/icons/${filename}`}
      alt=""
      width={44}
      height={44}
      className="h-11 w-11 shrink-0 object-contain"
    />
  )
}

function SnsPanel({
  channels,
  cta,
  heroText,
  sectionTitle,
}: {
  channels: NewsChannelItem[]
  cta: string
  heroText: string
  sectionTitle: string
}) {
  return (
    <>
      <HeroBanner config={bannerImages.sns} overlayText={heroText} />

      <section className="bg-white py-12 md:py-16 desktop:px-56 desktop:py-20">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-6 px-4 md:px-8 desktop:px-0">
          <div className="grid gap-3 md:grid-cols-2 desktop:grid-cols-3 desktop:gap-6">
            {snsPostImages.map((filename) => (
              <Image
                src={`/images/${filename}`}
                alt=""
                width={320}
                height={320}
                className="aspect-square w-full rounded-[20px] border-4 border-cta object-cover"
                key={filename}
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc((100vw - 5rem) / 2), 320px"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef] py-14 md:py-20 desktop:px-56 desktop:py-28">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-4 md:px-8 desktop:gap-20 desktop:px-0">
          <div className="flex flex-col gap-6 desktop:flex-row desktop:items-center desktop:justify-between">
            <h2
              className="text-[32px] font-bold leading-tight text-primary md:text-[40px] desktop:text-[48px] font-noto"
            >
              {sectionTitle}
            </h2>
            <button
              className="inline-flex h-12 cursor-pointer items-center justify-center self-start rounded-[500px] bg-cta px-5 text-sm font-bold text-white shadow-[0_14px_32px_rgba(255,122,33,0.18)] transition hover:bg-[#ef6f18] md:h-14 md:px-6 md:text-base desktop:h-16 desktop:px-6 desktop:text-2xl"
              type="button"
            >
              {cta}
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 desktop:gap-8">
            {channels.map((channel) => (
              <button
                className="flex min-h-[92px] w-full flex-none cursor-pointer items-center justify-between rounded-3xl bg-white px-6 py-5 text-left shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition hover:shadow-[0_18px_36px_rgba(15,23,42,0.08)] md:w-[calc((100%-1rem)/2)] desktop:w-[calc((100%-4rem)/3)]"
                data-news-sns-channel={channel.label}
                key={channel.label}
                type="button"
              >
                <div className="flex items-center gap-4">
                  <SocialIcon filename={channel.icon} />
                  <span
                    className="text-[20px] font-bold leading-none text-[#1c1c1e] desktop:text-[28px] font-noto"
                  >
                    {channel.label}
                  </span>
                </div>
                <span className="text-2xl font-bold text-cta">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function PartnershipPanel({
  heroText,
}: {
  heroText: string
}) {
  return (
    <>
      <HeroBanner config={bannerImages.partnership} overlayText={heroText} />

      <section className="bg-white py-12 md:py-16 desktop:px-56 desktop:py-20">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 desktop:px-0">
          <Image
            src={`/images/${partnershipLogosImage}`}
            alt=""
            data-news-partnership-logos
            width={1389}
            height={300}
            className="w-full rounded-[24px] object-cover"
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc(100vw - 4rem), 1389px"
          />
        </div>
      </section>
    </>
  )
}

export default function NewsTabs({
  activeTab,
  heroEyebrow,
  heroTitle,
  noticeLabel,
  pressLabel,
  snsLabel,
  partnershipLabel,
  noticeSectionTitle,
  noticeSearchPlaceholder,
  noticeMoreLabel,
  noticeItems,
  pressSectionTitle,
  pressSearchPlaceholder,
  pressMoreLabel,
  pressItems,
  snsHeroText,
  snsSectionTitle,
  snsCta,
  snsChannels,
  partnershipHeroText,
}: NewsTabsProps) {
  const tabs = [
    { key: 'notice' as const, label: noticeLabel },
    { key: 'pressReleases' as const, label: pressLabel },
    { key: 'sns' as const, label: snsLabel },
    { key: 'partnership' as const, label: partnershipLabel },
  ]

  const renderPanel = () => {
    if (activeTab === 'notice') {
      return (
        <>
          <HeroBanner config={bannerImages.notice} />
          <ArticleGridSection
            items={noticeItems}
            moreLabel={noticeMoreLabel}
            searchPlaceholder={noticeSearchPlaceholder}
            sectionTitle={noticeSectionTitle}
          />
        </>
      )
    }

    if (activeTab === 'pressReleases') {
      return (
        <>
          <HeroBanner config={bannerImages.pressReleases} />
          <ArticleGridSection
            items={pressItems}
            moreLabel={pressMoreLabel}
            searchPlaceholder={pressSearchPlaceholder}
            sectionTitle={pressSectionTitle}
          />
        </>
      )
    }

    if (activeTab === 'sns') {
      return (
        <SnsPanel
          channels={snsChannels}
          cta={snsCta}
          heroText={snsHeroText}
          sectionTitle={snsSectionTitle}
        />
      )
    }

    return <PartnershipPanel heroText={partnershipHeroText} />
  }

  return (
    <>
      <section className="bg-white pt-12 md:pt-16 desktop:px-60 desktop:pt-20">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-4 md:px-8 desktop:px-0">
          <div className="flex flex-col items-start gap-8 desktop:gap-10">
            <div className="flex flex-col items-start gap-6">
              <p
                className="text-[26px] font-bold leading-tight text-cta md:text-[30px] desktop:text-[36px] font-noto"
              >
                {heroEyebrow}
              </p>
              <h1
                className="max-w-[760px] whitespace-pre-line text-[40px] font-bold leading-[1.15] text-primary md:text-[56px] desktop:text-[64px] font-noto"
              >
                {heroTitle}
              </h1>
            </div>
          </div>

          <div className="overflow-x-auto pb-1">
            <div className="flex min-w-max items-center gap-6 md:gap-8 desktop:gap-11">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key

                return (
                  <Link
                    className={`cursor-pointer border-b-4 pb-4 pt-2.5 text-left transition-all duration-200 ${
                      isActive
                        ? 'border-cta text-primary'
                        : 'border-transparent text-[#666563] hover:text-primary'
                    }`}
                    href={tab.key === 'notice' ? '/news' : `/news?tab=${tab.key}`}
                    key={tab.key}
                  >
                    <span
                      className={`block whitespace-nowrap text-[20px] leading-8 md:text-[24px] desktop:text-[30px] desktop:leading-10 font-noto ${
                        isActive ? 'font-bold' : 'font-medium'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="animate-fade-in">{renderPanel()}</div>
    </>
  )
}
