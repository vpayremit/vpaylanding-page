import type { ReactNode } from 'react'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'

import CookieConsentBanner from '@/components/layout/CookieConsentBanner'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { isValidLocale } from '@/i18n/routing'

interface Props {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      {children}
      <Footer />
      <CookieConsentBanner />
    </NextIntlClientProvider>
  )
}
