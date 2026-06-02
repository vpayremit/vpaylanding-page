'use client'

import { startTransition, useEffect, useRef, useState } from 'react'

import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down'
import Menu from 'lucide-react/dist/esm/icons/menu'
import X from 'lucide-react/dist/esm/icons/x'
import { useLocale, useTranslations } from 'next-intl'

import Image from 'next/image'

import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { SERVICE_MENU_PREVIEW_IMAGES } from '@/lib/service-menu'
import type { ServiceMenuItem } from '@/types'

import { cn } from '@/lib/utils'

export default function Header() {
  const tCommon = useTranslations('common')
  const tNav = useTranslations('nav')
  const tServiceMenu = useTranslations('serviceMenu')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const [isScrolled, setIsScrolled] = useState(false)
  const desktopServiceMenuRef = useRef<HTMLDetailsElement>(null)
  const mobileMenuRef = useRef<HTMLDetailsElement>(null)
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    mobileMenuRef.current?.removeAttribute('open')
    desktopServiceMenuRef.current?.removeAttribute('open')
  }, [pathname])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (
        desktopServiceMenuRef.current?.open &&
        !desktopServiceMenuRef.current.contains(event.target as Node)
      ) {
        desktopServiceMenuRef.current.removeAttribute('open')
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && desktopServiceMenuRef.current?.open) {
        desktopServiceMenuRef.current.removeAttribute('open')
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const navItems = [
    { label: tNav('fees'), href: '/fees' },
    { label: tNav('news'), href: '/news' },
    { label: tNav('contact'), href: '/contact' },
  ]
  const serviceMenuItems = tServiceMenu.raw('items') as ServiceMenuItem[]
  const isServicesPath = pathname === '/services' || pathname.startsWith('/services/')
  const desktopNavItemClass =
    'inline-flex h-12 w-[118px] shrink-0 items-center justify-center rounded-full text-center text-xl font-bold leading-[30px] transition hover:text-cta xl:w-[132px]'

  const isPathActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const changeLocale = (nextLocale: 'ko' | 'en') => {
    if (nextLocale === locale) {
      return
    }

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur-md transition-shadow duration-200',
        isScrolled ? 'shadow-[0_18px_40px_rgba(15,23,42,0.08)]' : 'shadow-none'
      )}
    >
      <div className="px-2 py-2 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3 desktop:grid desktop:grid-cols-[auto_1fr_auto] desktop:gap-3">
          <details className="group relative order-2 ml-auto desktop:order-none desktop:ml-0 desktop:hidden" ref={mobileMenuRef}>
            <summary
              aria-label={tCommon('openMenu')}
              className="flex h-12 w-12 list-none cursor-pointer items-center justify-center rounded-full border border-slate-200 text-primary transition hover:border-cta hover:text-cta [&::-webkit-details-marker]:hidden"
            >
              <Menu className="h-5 w-5 group-open:hidden" />
              <X className="hidden h-5 w-5 group-open:block" />
            </summary>

            <div className="fixed inset-x-0 top-[68px] z-[80] border-t border-slate-200 bg-white/98 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur-md">
              <div className="max-h-[calc(100vh-68px)] overflow-y-auto px-4 pb-6 pt-5 sm:px-6">
                <nav className="flex flex-col gap-1">
                  <Link
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-primary transition hover:bg-slate-50 hover:text-cta"
                    href="/about"
                  >
                    {tNav('brand')}
                  </Link>
                  <div className="rounded-[1.5rem] bg-slate-50/70 p-2">
                    <div
                      className={cn(
                        'flex items-center justify-between rounded-[1.25rem] px-3 py-3 text-sm font-semibold',
                        isServicesPath ? 'text-cta' : 'text-primary'
                      )}
                    >
                      <span>{tNav('services')}</span>
                      <ChevronDown className="h-4 w-4 rotate-180" />
                    </div>
                    <div className="px-1 pb-1">
                      {serviceMenuItems.map((item) => (
                        <Link
                          key={item.slug}
                          className={cn(
                            'flex items-center justify-between rounded-[1.25rem] px-3 py-3 text-sm font-medium transition',
                            pathname === `/services/${item.slug}`
                              ? 'bg-white text-cta'
                              : 'text-primary hover:bg-white hover:text-cta'
                          )}
                          href={`/services/${item.slug}`}
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      className="rounded-2xl px-4 py-3 text-sm font-medium text-primary transition hover:bg-slate-50 hover:text-cta"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-5 flex h-12 items-center gap-2 rounded-full bg-primary p-1">
                  <button
                    className={cn(
                      'flex-1 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 py-[6px] text-sm font-bold leading-5 transition',
                      locale === 'ko'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-white/60 hover:text-white'
                    )}
                    onClick={() => changeLocale('ko')}
                    type="button"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icons/flag-kr.svg" alt="" width={16} height={16} className="rounded-full" />
                    {tCommon('langKo')}
                  </button>
                  <button
                    className={cn(
                      'flex-1 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 py-[6px] text-sm font-bold leading-5 transition',
                      locale === 'en'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-white/60 hover:text-white'
                    )}
                    onClick={() => changeLocale('en')}
                    type="button"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icons/flag-en.svg" alt="" width={16} height={16} className="rounded-full" />
                    {tCommon('langEn')}
                  </button>
                </div>

                {/* Pre-launch state: app not yet live. After launch, swap copy back to
                    tCommon('ctaDownload') and point to the real app store / onboarding URL. */}
                <Link
                  href="/contact"
                  className="mt-4 inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cta px-7 text-base font-semibold text-white shadow-[0_5px_16px_rgba(255,122,33,0.28)] transition duration-200 hover:bg-[#ef6f18]"
                >
                  {tCommon('preRegisterCta')}
                </Link>
              </div>
            </div>
          </details>

          <Link className="order-1 shrink-0 desktop:order-none" href="/">
            <Image
              src="/icons/logo-vpay.svg"
              alt="V Pay"
              width={118}
              height={61}
              className="shrink-0"
              style={{ width: 120, minWidth: 120, height: 'auto' }}
              unoptimized
            />
          </Link>

          <nav className="hidden items-center justify-center gap-0.5 desktop:flex xl:gap-1">
            <Link
              className={cn(
                desktopNavItemClass,
                isPathActive('/about') ? 'text-cta' : 'text-primary'
              )}
              href="/about"
            >
              {tNav('brand')}
            </Link>
            <details className="group/service relative flex w-[118px] shrink-0 items-center xl:w-[132px]" ref={desktopServiceMenuRef}>
              <summary
                className={cn(
                  `${desktopNavItemClass} w-full list-none cursor-pointer gap-1 px-4 [&::-webkit-details-marker]:hidden`,
                  isServicesPath ? 'text-cta' : 'text-primary'
                )}
              >
                {tNav('services')}
                <ChevronDown
                  className={cn(
                    'h-[18px] w-[18px] shrink-0 transition-transform duration-200',
                    'group-open/service:rotate-180'
                  )}
                />
              </summary>

              <div
                className={cn(
                  'fixed inset-x-0 top-[70px] z-[70] hidden transition-[opacity,transform] duration-200 desktop:block',
                  'pointer-events-none -translate-y-2 opacity-0 group-open/service:pointer-events-auto group-open/service:translate-y-0 group-open/service:opacity-100'
                )}
              >
                <div className="border-t border-slate-200 bg-white/98 shadow-[0_28px_48px_rgba(15,23,42,0.12)] backdrop-blur-md">
                  <div className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                    <div
                      className="relative flex min-h-[362px] flex-col justify-center gap-4 overflow-hidden bg-cta px-12 py-12 text-white"
                    >
                      <div className="absolute -bottom-16 -left-12 h-[320px] w-[520px] rounded-full bg-[#FFD13E]/40 blur-[90px]" />
                      <div
                        className="relative text-[48px] font-bold leading-none font-noto"
                      >
                        {tServiceMenu('title')}
                      </div>
                      <p
                        className="relative max-w-[260px] whitespace-pre-line text-[19px] font-normal leading-[32px] font-noto"
                      >
                        {tServiceMenu('subtitle')}
                      </p>
                    </div>

                    <div className="flex min-w-0 items-start justify-center gap-[56px] px-8 pb-16 pt-14">
                      {serviceMenuItems.map((item) => (
                        <Link
                          key={item.slug}
                          className="group/menu-item flex w-[clamp(152px,14vw,220px)] min-w-0 cursor-pointer flex-col items-start gap-8"
                          href={`/services/${item.slug}`}
                        >
                          <div className="flex w-full flex-col items-start gap-4">
                            <p
                              className={cn(
                                'text-[clamp(22px,1.85vw,28px)] font-medium leading-[1.12] text-primary font-noto',
                                locale === 'en' ? 'min-h-[3.95rem]' : 'min-h-0'
                              )}
                            >
                              {item.label}
                            </p>
                            <div className="relative aspect-square w-full overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#F8F4EE_0%,#F3EEE5_100%)]">
                              <Image
                                alt={item.label}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover/menu-item:scale-[1.04]"
                                height={220}
                                sizes="220px"
                                src={SERVICE_MENU_PREVIEW_IMAGES[item.slug]}
                                width={220}
                              />
                            </div>
                          </div>

                          <span
                            className="inline-flex items-center gap-2 text-[20px] font-bold leading-5 text-cta font-noto"
                          >
                            {tServiceMenu('moreLabel')}
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </details>
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={cn(
                  desktopNavItemClass,
                  isPathActive(item.href) ? 'text-cta' : 'text-primary'
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 desktop:flex">
            <div
              className="inline-flex rounded-full bg-primary p-1"
              style={{ minWidth: 146, height: 48 }}
            >
              <button
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-[6px] text-sm font-bold leading-5 transition',
                  locale === 'ko'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-white/60 hover:text-white'
                )}
                onClick={() => changeLocale('ko')}
                type="button"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/flag-kr.svg" alt="" width={16} height={16} className="rounded-full" />
                {tCommon('langKo')}
              </button>
              <button
                className={cn(
                  'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-[6px] text-sm font-bold leading-5 transition',
                  locale === 'en'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-white/60 hover:text-white'
                )}
                onClick={() => changeLocale('en')}
                type="button"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/flag-en.svg" alt="" width={16} height={16} className="rounded-full" />
                {tCommon('langEn')}
              </button>
            </div>

            {/* Pre-launch state: app not yet live. After launch, swap copy back to
                tCommon('ctaDownload') and point to the real app store / onboarding URL. */}
            <Link
              href="/contact"
              className="inline-flex h-[52px] min-w-[150px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[50px] bg-cta px-3 text-xl font-bold leading-none text-white shadow-[0_5px_16px_rgba(255,122,33,0.28)] transition duration-200 hover:bg-[#ef6f18] font-noto"
            >
              {tCommon('preRegisterCta')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
