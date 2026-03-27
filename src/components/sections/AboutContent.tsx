import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import AssetOrPlaceholder, { hasPublicAsset } from '@/components/ui/AssetOrPlaceholder'
import { Link } from '@/i18n/navigation'
import type { AboutValueItem } from '@/types'

export default async function AboutContent() {
  const locale = await getLocale()
  const t = await getTranslations('aboutPage')
  const valueItems = t.raw('values.items') as AboutValueItem[]

  const heroBadgeFilename = 'policy-hero-badge.png'
  const skylineFilename = 'about-city-skyline.png'
  const historyFilename = locale === 'ko' ? 'about-history-ko.png' : 'about-history-en.png'
  const confidenceBannerFilename = 'about-confidence-banner.png'

  return (
    <main className="bg-white">
      <section className="bg-white py-14 md:py-20 desktop:py-28">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 desktop:px-60">
          <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-8 desktop:min-h-[445px]">
            <div className="flex max-w-[720px] flex-1 basis-[420px] flex-col items-start gap-10 desktop:gap-14">
              <p
                className="text-[18px] font-bold leading-none text-cta md:text-[24px] desktop:text-4xl font-noto"
              >
                {t('hero.eyebrow')}
              </p>

              <div className="flex flex-col items-start gap-6">
                <h1
                  className="whitespace-pre-line text-[36px] font-medium leading-[1.15] text-primary md:text-[48px] desktop:text-6xl font-noto"
                >
                  {t('hero.title')}
                </h1>
                <p
                  className="text-[18px] font-medium leading-[1.5] text-[#666563] md:text-[22px] desktop:text-3xl desktop:leading-10 font-noto"
                >
                  {t('hero.subtitle')}
                </p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[220px] shrink-0 self-center md:max-w-[260px] desktop:mx-0 desktop:mt-[30px] desktop:max-w-[300px]">
              <AssetOrPlaceholder
                folder="images"
                filename={heroBadgeFilename}
                alt=""
                width={300}
                height={300}
                className="h-auto w-full rotate-[8.38deg] object-contain"
                sizes="(max-width: 767px) 220px, (max-width: 1199px) 260px, 300px"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1920px]">
          <AssetOrPlaceholder
            folder="images"
            filename={skylineFilename}
            alt=""
            width={1923}
            height={833}
            className="h-auto w-full object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="overflow-hidden bg-[linear-gradient(180deg,#ff7a21_0%,#1b0901_26%,#140700_100%)]">
        <div className="mx-auto w-full max-w-[1920px]">
          <AssetOrPlaceholder
            folder="images"
            filename={historyFilename}
            alt=""
            width={1680}
            height={874}
            className="h-auto w-full object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 desktop:px-0 desktop:py-36">
        <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 desktop:px-56">
          <div className="flex flex-col gap-12 desktop:gap-24">
            <div className="flex flex-col gap-10 desktop:flex-row desktop:flex-wrap desktop:items-start desktop:justify-between desktop:gap-x-16 desktop:gap-y-8">
              <div className="flex min-w-0 flex-col items-start gap-6 desktop:max-w-[520px] desktop:flex-[0_1_520px]">
                <p
                  className="text-[18px] font-bold leading-none text-cta md:text-[24px] desktop:text-4xl font-noto"
                >
                  {t('values.eyebrow')}
                </p>
                <h2
                  className="max-w-full text-[34px] font-bold leading-tight text-primary md:text-[44px] desktop:text-6xl font-noto"
                >
                  {t('values.title')}
                </h2>
              </div>

              <p
                className="max-w-[818px] whitespace-pre-line text-[18px] font-medium leading-[1.6] text-[#666563] md:text-[20px] desktop:flex-[1_1_520px] desktop:text-2xl desktop:leading-9 font-noto"
              >
                {t('values.description')}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 desktop:grid-cols-4 desktop:gap-8">
              {valueItems.map((item) => (
                <article key={item.icon} className="flex flex-col items-start gap-6">
                  <div className="flex w-full justify-center rounded-3xl bg-stone-100/50 px-2.5 py-10">
                    <AssetOrPlaceholder
                      folder="icons"
                      filename={item.icon}
                      alt=""
                      width={180}
                      height={180}
                      className="h-[132px] w-[132px] object-contain md:h-[156px] md:w-[156px] desktop:h-44 desktop:w-44"
                      sizes="(max-width: 767px) 132px, (max-width: 1199px) 156px, 180px"
                    />
                  </div>
                  <div className="flex w-full flex-col items-center gap-4 text-center">
                    <h3
                      className="text-2xl font-bold leading-tight text-[#1c1c1e] desktop:text-3xl font-noto"
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[18px] font-medium leading-8 text-[#666563] desktop:text-xl font-noto"
                    >
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-16 md:px-8 md:pb-20 desktop:px-10 desktop:pb-24">
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="relative overflow-hidden rounded-[32px] bg-cta px-6 py-12 md:px-10 md:py-16 desktop:px-60 desktop:py-28">
            {hasPublicAsset('images', confidenceBannerFilename) && (
              <Image
                src={`/images/${confidenceBannerFilename}`}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc(100vw - 4rem), 1520px"
              />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,213,0,0.28),transparent_32%),linear-gradient(90deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_38%,rgba(255,255,255,0)_100%)]" />

            <div className="relative z-10 flex flex-col items-center gap-10 text-center desktop:gap-20">
              <div className="flex max-w-[1004px] flex-col items-center gap-6 desktop:gap-8">
                <h2
                  className="text-[34px] font-bold leading-tight text-white md:text-[44px] desktop:text-6xl font-noto"
                >
                  {t('confidence.title')}
                </h2>
                <p
                  className="text-[18px] font-medium leading-[1.6] text-white md:text-[22px] desktop:text-3xl desktop:leading-10 font-noto"
                >
                  {t('confidence.subtitle')}
                </p>
              </div>

              <Link
                className="inline-flex h-14 items-center justify-center rounded-[500px] bg-primary px-6 text-base font-bold text-white transition hover:bg-[#111923] md:h-16 md:text-lg desktop:text-2xl desktop:leading-8 font-noto"
                href="/policy"
              >
                {t('confidence.cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
