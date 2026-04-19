import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

export default async function Hero() {
  const t = await getTranslations('hero')

  return (
    <section className="overflow-hidden bg-white p-2 desktop:p-4">
      <div className="flex flex-col gap-4 desktop:h-[calc(100vh-76px)] desktop:min-h-[842px] desktop:flex-row">
        <div
          className="relative flex flex-col justify-between overflow-hidden rounded-[32px] px-6 py-10 md:px-10 md:py-12 desktop:flex-[1_1_50%] desktop:pt-[124px] desktop:pr-10 desktop:pb-[60px] desktop:pl-20"
        >
          <Image src="/images/hero-bg-left.png" alt="" fill className="object-cover" priority sizes="50vw" />

          <div className="relative z-10">
            <p
              className="text-[36px] md:text-[48px] desktop:text-[72px] font-inter"
              style={{
                fontWeight: 700,
                lineHeight: '100%',
                color: '#FFFFFF',
                letterSpacing: 0,
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {t('tag')}
            </p>
            <p
              className="mt-4 text-[24px] leading-[32px] md:text-[32px] md:leading-[40px] desktop:mt-[26px] desktop:text-[48px] desktop:leading-[56px] font-noto"
              style={{
                fontWeight: 700,
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              {t('title')}
            </p>
          </div>

          <div className="relative z-10 mt-8 flex flex-col gap-6 desktop:mt-0">
            <p
              className="text-[16px] leading-[24px] md:text-[22px] md:leading-[32px] desktop:text-[32px] desktop:leading-[44px] font-noto"
              style={{
                fontWeight: 500,
                color: '#FFFFFF',
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap gap-3 desktop:gap-4">
              {/* TODO: Replace disabled state with real Google Play store link */}
              <button
                className="h-[48px] px-5 text-[14px] md:h-[56px] md:px-6 md:text-[16px] desktop:h-[72px] desktop:px-8 desktop:text-[20px]"
                type="button"
                disabled
                style={{
                  borderRadius: 50,
                  background: '#000000',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  color: '#FFFFFF',
                  fontFamily: 'Helvetica Neue',
                  fontWeight: 500,
                  lineHeight: '100%',
                  border: 'none',
                  cursor: 'not-allowed',
                  opacity: 0.5,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/icon-google-play.svg" alt="" style={{ width: 24, height: 24 }} />
                {t('googlePlay')}
              </button>
              {/* TODO: Replace disabled state with real Apple App Store link */}
              <button
                className="h-[48px] px-5 text-[14px] md:h-[56px] md:px-6 md:text-[16px] desktop:h-[72px] desktop:px-8 desktop:text-[20px]"
                type="button"
                disabled
                style={{
                  borderRadius: 50,
                  background: '#000000',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  color: '#FFFFFF',
                  fontFamily: 'Helvetica Neue',
                  fontWeight: 500,
                  lineHeight: '100%',
                  border: 'none',
                  cursor: 'not-allowed',
                  opacity: 0.5,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/icon-apple-store.svg" alt="" style={{ height: 24, width: 'auto' }} />
                {t('appStore')}
              </button>
            </div>
          </div>
        </div>

        <div
          className="relative h-[500px] overflow-hidden rounded-[32px] md:h-[600px] desktop:h-full desktop:min-h-0 desktop:flex-[1_1_50%]"
        >
          <Image src="/images/hero-money.png" alt="" fill className="object-cover" priority sizes="50vw" />

          <div
            className="absolute left-1/2 top-1/2 w-[calc(100%-32px)] max-w-[483px] -translate-x-1/2 -translate-y-1/2 bg-white desktop:top-[262px] desktop:h-[394px] desktop:w-[483px] desktop:translate-y-0"
            style={{
              borderRadius: 32,
              boxShadow: '0px 1px 1px 1px rgba(0,0,0,0.04), 0px 1px 6px 0px rgba(0,0,0,0.08)',
              padding: 20,
              background: 'white',
              display: 'flex',
              flexDirection: 'column',
              gap: 32,
            }}
          >
            <p
              className="font-inter"
              style={{
                fontWeight: 500,
                fontSize: 16,
                lineHeight: '24px',
                color: '#FF7A21',
                textAlign: 'center',
                margin: 0,
              }}
            >
              {t('exchangeRate')}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                className="desktop:w-[121px]"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  height: 40,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 12,
                  paddingRight: 12,
                  borderRadius: 50,
                  background: '#F5F5F5',
                }}
              >
                <Image src="/icons/flag-kr.svg" alt="KR" width={32} height={32} className="rounded-full" unoptimized />
                <span
                  className="font-inter"
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    lineHeight: '25px',
                    color: '#1C1C1E',
                  }}
                >
                  KRW
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/icon-chevron-down.svg" alt="" width={16} height={16} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <p
                  className="font-inter"
                  style={{
                    fontWeight: 400,
                    fontSize: 20,
                    lineHeight: '16px',
                    color: '#8E8E93',
                    margin: 0,
                  }}
                >
                  {t('send')}
                </p>
                <p
                  className="text-[24px] desktop:text-[32px] font-inter"
                  style={{
                    fontWeight: 700,
                    lineHeight: '30px',
                    color: '#FF7A21',
                    margin: 0,
                  }}
                >
                  {t('exchangeFromAmount')}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, height: 1, background: '#D1D1D6' }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/icon-swap.svg" alt="" width={24} height={24} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                className="desktop:w-[121px]"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  height: 40,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 12,
                  paddingRight: 12,
                  borderRadius: 50,
                  background: '#F5F5F5',
                }}
              >
                <Image src="/icons/flag-vn.svg" alt="VN" width={32} height={32} className="rounded-full" unoptimized />
                <span
                  className="font-inter"
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    lineHeight: '25px',
                    color: '#1C1C1E',
                  }}
                >
                  VND
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/icon-chevron-down.svg" alt="" width={16} height={16} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <p
                  className="font-inter"
                  style={{
                    fontWeight: 400,
                    fontSize: 20,
                    lineHeight: '16px',
                    color: '#8E8E93',
                    margin: 0,
                  }}
                >
                  {t('receive')}
                </p>
                <p
                  className="text-[24px] desktop:text-[32px] font-inter"
                  style={{
                    fontWeight: 700,
                    lineHeight: '30px',
                    color: '#1C1C1E',
                    margin: 0,
                  }}
                >
                  {t('exchangeToAmount')}
                </p>
              </div>
            </div>

            {/* TODO: Connect to actual remittance app / onboarding flow */}
            <button
              className="font-inter"
              type="button"
              disabled
              style={{
                width: '100%',
                height: 54,
                paddingLeft: 12,
                paddingRight: 12,
                gap: 8,
                borderRadius: 500,
                border: '1px solid #FFD500',
                background: '#FF7A21',
                boxShadow: '0px 0px 24px 0px rgba(255, 122, 33, 0.5) inset',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: 20,
                lineHeight: '25px',
              }}
            >
              {t('sendNow')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
