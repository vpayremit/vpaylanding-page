import { getTranslations } from 'next-intl/server'

import FAQ from '@/components/sections/FAQ'
import Hero from '@/components/sections/Hero'
import RemittanceProcess from '@/components/sections/RemittanceProcess'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import WhyVPay from '@/components/sections/WhyVPay'
import { createBasicMetadata } from '@/lib/metadata'
import type { LocalePageProps } from '@/types'

export async function generateMetadata({ params }: LocalePageProps) {
  const { locale } = await params
  const tNav = await getTranslations({ locale, namespace: 'nav' })

  return createBasicMetadata({
    locale,
    pathname: '/',
    title:
      locale === 'ko'
        ? 'V Pay | 글로벌 송금 및 결제 서비스'
        : 'V Pay | Global Remittance and Payment Service',
    description:
      locale === 'ko'
        ? `${tNav('brand')}는 한국과 해외를 연결하는 글로벌 송금 및 결제 서비스를 제공합니다.`
        : `${tNav('brand')} provides global remittance and payment services connecting Korea and overseas.`,
    image: '/images/og-home.png',
  })
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Testimonials />
      <WhyVPay />
      <RemittanceProcess />
      <FAQ />
    </main>
  )
}
