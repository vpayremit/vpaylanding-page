import type { ServiceMenuSlug } from '@/types'

export const SERVICE_MENU_SLUGS = [
  'personal-transfer',
  'business-transfer',
  'real-time-fx',
  'digital-wallet',
] as const satisfies readonly ServiceMenuSlug[]

export function isServiceMenuSlug(value: string): value is ServiceMenuSlug {
  return SERVICE_MENU_SLUGS.includes(value as ServiceMenuSlug)
}

export const SERVICE_MENU_PREVIEW_IMAGES: Record<ServiceMenuSlug, string> = {
  'personal-transfer': '/images/hero-money.png',
  'business-transfer': '/images/service-menu-business-transfer.png',
  'real-time-fx': '/images/service-menu-real-time-fx.png',
  'digital-wallet': '/images/service-menu-digital-wallet.png',
}
