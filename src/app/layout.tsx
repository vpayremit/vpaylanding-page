import type { Metadata } from 'next'
import { Inter, Noto_Sans_KR } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import type { ReactNode } from 'react'

import { getSiteUrl } from '@/lib/metadata'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto',
  weight: ['500', '700'],
})

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: 'V Pay',
  description: 'P2P Remittance Korea ↔ Vietnam',
  openGraph: {
    title: 'V Pay',
    description: 'P2P Remittance Korea ↔ Vietnam',
    siteName: 'V Pay',
    type: 'website',
    images: [{ url: '/images/policy-hero-badge.png', alt: 'V Pay' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V Pay',
    description: 'P2P Remittance Korea ↔ Vietnam',
    images: ['/images/policy-hero-badge.png'],
  },
}

interface Props {
  children: ReactNode
}

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${notoSansKr.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
