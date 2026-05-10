import Image from 'next/image'
import { getLocale, getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export default async function Footer() {
  const [t, locale] = await Promise.all([getTranslations('footer'), getLocale()])
  const backgroundSrc = locale === 'ko' ? '/images/footer-bg-ko.png' : '/images/footer-bg-en.png'

  return (
    <footer className="relative overflow-hidden bg-primary" id="contact">
      <div className="absolute inset-0">
        <Image
          src={backgroundSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-[rgba(26,37,48,0.5)]" />
      </div>

      <div className="relative mt-8 bg-white/85 px-5 py-8 backdrop-blur-[25px] md:mt-12 md:px-10 md:py-10 desktop:mt-[68px] desktop:px-20 desktop:py-[48px] 2xl:px-[240px]">
        <div className="mx-auto flex max-w-[1920px] flex-col gap-10 desktop:gap-[64px]">
          <div className="flex flex-col gap-10 desktop:flex-row desktop:items-start desktop:justify-between">
            <div className="flex flex-col gap-6 desktop:gap-[30px]">
              <p
                className={cn("text-[32px] font-bold leading-none text-[#1c1c1e] md:text-[40px] desktop:text-[48px]", locale === 'ko' ? 'font-noto' : 'font-inter')}
              >
                {t('company')}
              </p>

              <div className="flex flex-col gap-4 desktop:gap-5">
                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/footer-mail.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-5 w-5 shrink-0 desktop:h-6 desktop:w-6"
                    unoptimized
                  />
                  <p
                    className="text-[15px] font-medium leading-[1.25] text-[#414545] md:text-[18px] desktop:text-[20px] desktop:leading-[25px] font-inter"
                  >
                    {t('contactEmail')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/footer-phone.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-5 w-5 shrink-0 desktop:h-6 desktop:w-6"
                    unoptimized
                  />
                  <p
                    className="text-[15px] font-medium leading-[1.25] text-[#414545] md:text-[18px] desktop:text-[20px] desktop:leading-[25px] font-inter"
                  >
                    {t('contactPhone')}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Image
                    src="/icons/footer-pin.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="mt-0.5 h-5 w-5 shrink-0 desktop:h-6 desktop:w-6"
                    unoptimized
                  />
                  <p
                    className={cn("max-w-[520px] text-[15px] font-medium leading-[1.35] text-[#414545] md:text-[18px] desktop:text-[20px] desktop:leading-[25px]", locale === 'ko' ? 'font-noto' : 'font-inter')}
                  >
                    {t('address')}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-start desktop:justify-end">
              <Image
                src="/icons/logo-vpay.svg"
                alt="V Pay"
                width={118}
                height={61}
                className="h-auto w-[168px] md:w-[220px] desktop:w-[315px]"
                sizes="(max-width: 767px) 168px, (max-width: 1199px) 220px, 315px"
                unoptimized
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 desktop:gap-8">
            <div className="h-px w-full bg-[#d1d1d6]" />

            <div className="flex flex-col gap-4 desktop:flex-row desktop:items-center desktop:justify-between">
              <p
                className="text-[14px] font-normal leading-[1.4] text-[#8e8e93] md:text-[16px] desktop:text-[20px] desktop:leading-[25px] font-inter"
              >
                {t('copyright', { year: new Date().getFullYear() })}
              </p>

              <div className="flex flex-wrap items-center gap-3 md:gap-4 desktop:gap-6">
                <Link
                  className={cn("cursor-pointer text-[16px] font-semibold leading-none text-[#1c1c1e] transition hover:text-cta md:text-[20px] desktop:text-[24px] desktop:leading-[24px]", locale === 'ko' ? 'font-noto' : 'font-inter')}
                  href="/terms"
                >
                  {t('links.terms')}
                </Link>
                <span className="hidden h-5 w-px bg-[#d1d1d6] desktop:block" />
                <Link
                  className={cn("cursor-pointer text-[16px] font-semibold leading-none text-[#1c1c1e] transition hover:text-cta md:text-[20px] desktop:text-[24px] desktop:leading-[24px]", locale === 'ko' ? 'font-noto' : 'font-inter')}
                  href="/policy"
                >
                  {t('links.privacy')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
