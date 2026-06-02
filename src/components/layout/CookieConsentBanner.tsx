'use client'

import CookieConsent from 'react-cookie-consent'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

export default function CookieConsentBanner() {
  const t = useTranslations('cookieConsent')

  return (
    <CookieConsent
      buttonText={t('acceptCta')}
      cookieName="vpay-cookie-consent"
      expires={365}
      location="bottom"
      style={{
        background: '#1A2530',
        padding: '16px 24px',
        alignItems: 'center',
        zIndex: 60,
      }}
      buttonStyle={{
        background: '#FF7A21',
        color: '#FFFFFF',
        borderRadius: 500,
        fontWeight: 700,
        padding: '10px 24px',
        fontSize: 14,
        margin: '0 16px 0 0',
        border: 'none',
        cursor: 'pointer',
      }}
      contentStyle={{
        flex: '1 1 300px',
        margin: '0 16px 0 0',
        color: '#FFFFFF',
        fontSize: 14,
        lineHeight: '20px',
      }}
    >
      {t('message')}{' '}
      <Link
        href="/terms"
        style={{ color: '#FF7A21', textDecoration: 'underline' }}
      >
        {t('privacyLinkText')}
      </Link>
    </CookieConsent>
  )
}
