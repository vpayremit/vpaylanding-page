import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export type TermsSlug =
  | 'overseas-transfer'
  | 'electronic-financial'
  | 'user-cautions'
  | 'complaint-dispute'

export const TERMS_SLUGS = [
  'overseas-transfer',
  'electronic-financial',
  'user-cautions',
  'complaint-dispute',
] as const satisfies readonly TermsSlug[]

export interface TermsMeta {
  slug: TermsSlug
  label: { ko: string; en: string }
}

export const TERMS_MANIFEST: Record<TermsSlug, TermsMeta> = {
  'overseas-transfer': {
    slug: 'overseas-transfer',
    label: {
      ko: '소액해외송금서비스 이용약관',
      en: 'Terms of Use for Overseas Money Transfer',
    },
  },
  'electronic-financial': {
    slug: 'electronic-financial',
    label: {
      ko: '전자금융거래 이용약관',
      en: 'Terms and Conditions for Electronic Financial Transactions',
    },
  },
  'user-cautions': {
    slug: 'user-cautions',
    label: {
      ko: '이용자 유의사항',
      en: 'User Cautions',
    },
  },
  'complaint-dispute': {
    slug: 'complaint-dispute',
    label: {
      ko: '민원 및 분쟁처리',
      en: 'Complaint and Dispute Resolution',
    },
  },
}

export function isTermsSlug(value: string): value is TermsSlug {
  return TERMS_SLUGS.includes(value as TermsSlug)
}

export function loadTermsHtml(slug: TermsSlug, locale: 'ko' | 'en'): string {
  const filepath = join(process.cwd(), 'src/data/terms', `${slug}.${locale}.html`)
  return readFileSync(filepath, 'utf-8')
}
