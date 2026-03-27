# Codex Role & Rules for V-Pay Landing Page

## Role
You are a **Senior Frontend Engineer** implementing the V-Pay landing page.
Your job is to write clean, production-ready code following the exact spec provided.
**Do not improvise design decisions** — follow the spec precisely.

---

## Tech Stack (non-negotiable)
- **Framework**: Next.js 16 App Router (`src/app/`)
- **Language**: TypeScript (strict mode, no `any`)
- **Styling**: Tailwind CSS v4 (utility-first, no custom CSS unless required)
- **Icons**: `lucide-react` (direct imports only: `import X from 'lucide-react/dist/esm/icons/x'`)
- **Utilities**: `clsx` via `src/lib/utils.ts` `cn()` function
- **i18n**: `next-intl` — locale routing via `[locale]` segment

---

## i18n Rules (next-intl)

### Supported locales
```ts
export const locales = ['ko', 'en'] as const
export const defaultLocale = 'ko'
```

### URL structure
- Korean: `/ko/...` (default, also redirect from `/`)
- English: `/en/...`

### File structure
```
src/
  i18n/
    routing.ts          # defineRouting({ locales, defaultLocale })
    navigation.ts       # re-export Link, useRouter, usePathname, redirect
    request.ts          # getRequestConfig — loads messages
  messages/
    ko.json             # Korean content (primary)
    en.json             # English content
```

### Usage rules
- **Server components**: `const t = await getTranslations('namespace')`
- **Client components**: `const t = useTranslations('namespace')`
- **NEVER** hardcode user-facing strings in components — always use `t('key')`
- Message keys use camelCase, nested by section: `hero.title`, `nav.services`
- Arrays in messages: use indexed keys `services.0.title`, `services.1.title` OR use `t.raw('services')` for arrays
- Metadata (page title, description): use `getTranslations` in `generateMetadata()`

### Full messages/ko.json content
```json
{
  "common": {
    "ctaDownload": "앱다운로드",
    "ctaStarted": "앱다운로드",
    "langKo": "한국어",
    "langEn": "ENG"
  },
  "nav": {
    "brand": "브이페이",
    "services": "서비스",
    "fees": "수수료",
    "news": "소식",
    "policy": "정책",
    "contact": "문의"
  },
  "hero": {
    "tag": "P2P\n Transfers",
    "title": "개인 간 송금",
    "subtitle": "빠르고 저렴하게, 한국과 베트남을 연결하는 개인 간(P2P) 글로벌 송금 서비스",
    "googlePlay": "Google Play",
    "appStore": "Apple Store",
    "exchangeFrom": "KRW",
    "exchangeTo": "VND",
    "exchangeFromAmount": "1,000,000",
    "exchangeToAmount": "18,060,000"
  },
  "services": {
    "sectionTitle": "해외송금",
    "sectionSubtitle": "글로벌 파트너 네트워크 기반의 실시간 송금",
    "items": [
      {
        "tag": "P2P",
        "title": "P2P 국내·해외송금",
        "subtitle": "빠른 처리, 낮은 수수료, 시스템 안정성"
      },
      {
        "tag": "B2B",
        "title": "B2B 결제/송금",
        "subtitle": "빠른 처리, 낮은 수수료, 시스템 안정성"
      },
      {
        "tag": "API",
        "title": "실시간 환전",
        "subtitle": "빠른 처리, 낮은 수수료, 시스템 안정성"
      },
      {
        "tag": "WALLET",
        "title": "디지털 지갑",
        "subtitle": "빠른 처리, 낮은 수수료, 시스템 안정성"
      }
    ]
  },
  "testimonials": {
    "items": [
      {
        "quote": "본국에 있는 아이들과 아내에게 빠르게 돈을 송금할 수 있어서 너무 안심이에요",
        "role": "한국 거주",
        "tags": ["V판 송금 수수료", "다국어"]
      },
      {
        "quote": "본국에 있는 아이들과 아내에게 빠르게 돈을 송금할 수 있어서 너무 안심이에요",
        "role": "재외교포",
        "tags": ["실시간 투명한 환율", "초고속 송금"]
      },
      {
        "quote": "본국에 있는 아이들과 아내에게 빠르게 돈을 송금할 수 있어서 너무 안심이에요",
        "role": "프리랜서 / 기업",
        "tags": ["대량 송금", "빠른 지급"]
      }
    ]
  },
  "whyVpay": {
    "sectionTitle": "당신에게 V Pay가 적합한 이유",
    "items": [
      {
        "title": "자금 풀링 (Pooling)",
        "description": "여러 송금을 하나로 묶어 한 번에 처리하는 기능"
      },
      {
        "title": "사전 예치 자금 (Pre-funding)",
        "description": "현지 예치금을 활용한 즉시 지급"
      },
      {
        "title": "스마트 라우팅 (Smart Routing)",
        "description": "자동으로 가장 빠르고 저렴한 경로를 선택"
      },
      {
        "title": "규제 및 위험 관리",
        "description": "자동화된 KYC/AML/FDS 및 종단간 암호화"
      }
    ]
  },
  "remittanceProcess": {
    "sectionTitle": "송금 프로세스",
    "sectionTag": "V 프로세스",
    "cta": "앱다운로드",
    "steps": [
      {
        "title": "정보 입력",
        "items": ["금액 입력", "환율 확인", "수취인 선정", "결제방법/카드이체"]
      },
      {
        "title": "송금하기",
        "items": ["Smart Routing 최적 경로 선택", "Pre-funding 예치금에서 즉시 지급"]
      },
      {
        "title": "알림 안내",
        "items": ["수취인 계좌 송금 완료 알림"]
      }
    ]
  },
  "faq": {
    "sectionTitle": "FAQ",
    "items": [
      { "question": "수수료는 얼마인가요?", "answer": "" },
      { "question": "한도가 따로 있나요?", "answer": "" },
      { "question": "왜 수수료를 낮추었나요?", "answer": "" },
      { "question": "송금 완료까지 얼마나 걸리나요?", "answer": "" }
    ]
  },
  "footer": {
    "company": "브이페이 주식회사",
    "links": {
      "terms": "서비스 약관",
      "privacy": "개인정보 보호정책"
    },
    "copyright": "Copyright © 2025 V Pay. All rights reserved."
  }
}
```

### Full messages/en.json content
```json
{
  "common": {
    "ctaDownload": "Get Started",
    "ctaStarted": "Get Started",
    "langKo": "한국어",
    "langEn": "ENG"
  },
  "nav": {
    "brand": "V Pay",
    "services": "Service",
    "fees": "Fees",
    "news": "News",
    "policy": "Policy",
    "contact": "Contact"
  },
  "hero": {
    "tag": "P2P Remittance",
    "title": "Personal overseas remittance",
    "subtitle": "A fast and affordable global remittance service connecting individuals (P2P) between Korea and abroad.",
    "googlePlay": "Google Play",
    "appStore": "Apple Store",
    "exchangeFrom": "KRW",
    "exchangeTo": "VND",
    "exchangeFromAmount": "1,000,000",
    "exchangeToAmount": "18,060,000"
  },
  "services": {
    "sectionTitle": "International Remittance",
    "sectionSubtitle": "Global Real-time Remittance based on a Global Partner Network",
    "items": [
      {
        "tag": "P2P",
        "title": "P2P Domestic and International Remittance, Real-time Exchange Rate Provision",
        "subtitle": "Fast Processing, Low Fees, System Stability"
      },
      {
        "tag": "B2B",
        "title": "B2B Payment / Remittance",
        "subtitle": "Fast Processing, Low Fees, System Stability"
      },
      {
        "tag": "API",
        "title": "Real-time Exchange",
        "subtitle": "Fast Processing, Low Fees, System Stability"
      },
      {
        "tag": "WALLET",
        "title": "Digital Wallet",
        "subtitle": "Fast Processing, Low Fees, System Stability"
      }
    ]
  },
  "testimonials": {
    "items": [
      {
        "quote": "I'm so relieved that I can quickly send money to my children and wife back home.",
        "role": "Parents of international students",
        "tags": ["Low fees", "Multilingual support"]
      },
      {
        "quote": "I'm so relieved that I can quickly send money to my children and wife back home.",
        "role": "Parents of international students",
        "tags": ["Transparent exchange rates", "Super-fast remittance"]
      },
      {
        "quote": "I'm so relieved that I can quickly send money to my children and wife back home.",
        "role": "Freelancers / Businesses",
        "tags": ["Bulk remittance", "Quick payment"]
      }
    ]
  },
  "whyVpay": {
    "sectionTitle": "Why V Pay Is Right For You",
    "items": [
      {
        "title": "Pooling",
        "description": "Combining multiple remittances into one for processing at once"
      },
      {
        "title": "Pre-funding",
        "description": "Instant payments using local deposits"
      },
      {
        "title": "Smart Routing",
        "description": "Automatically selects the fastest, cheapest, and most successful route"
      },
      {
        "title": "KYC/AML/FDS",
        "description": "Automated KYC/AML/FDS with end-to-end encryption"
      }
    ]
  },
  "remittanceProcess": {
    "sectionTitle": "Remittance\n Process",
    "sectionTag": "V Process",
    "cta": "App Download",
    "steps": [
      {
        "title": "Enter Information",
        "items": ["Enter Recipient", "Check Exchange Rate and Fees in Real Time", "Select Recipient", "Payment (Card/Bank Transfer)"]
      },
      {
        "title": "Send Money",
        "items": ["Smart Routing Selects Optimal Path", "Immediate Payment from Pre-funding Account"]
      },
      {
        "title": "Notification Guide",
        "items": ["Notification of Completion of Remittance to Recipient's Account"]
      }
    ]
  },
  "faq": {
    "sectionTitle": "FAQ",
    "items": [
      { "question": "What is the fee?", "answer": "" },
      { "question": "Is there a limit?", "answer": "" },
      { "question": "Why is the fee low?", "answer": "" },
      { "question": "How long does it take to transfer?", "answer": "" }
    ]
  },
  "footer": {
    "company": "V Pay Corporation",
    "links": {
      "terms": "Terms of Service",
      "privacy": "Privacy Policy"
    },
    "copyright": "Copyright © 2025 V Pay. All rights reserved."
  }
}
```

---

## Project Structure
```
src/
  app/
    [locale]/
      layout.tsx          # Locale layout — NextIntlClientProvider
      page.tsx            # Homepage — assembles all sections
    globals.css           # Tailwind import + CSS variables only
    layout.tsx            # Root layout (html/body only, no locale logic)
  components/
    ui/                   # Reusable primitives (Button, Container, SectionHeading, Badge...)
    layout/               # Header, Footer
    sections/             # One file per page section
  i18n/
    routing.ts
    navigation.ts
    request.ts
  messages/
    ko.json
    en.json
  lib/
    utils.ts              # cn() utility only
  types/
    index.ts              # Shared TypeScript interfaces
  middleware.ts           # next-intl middleware for locale routing
```

---

## Design Tokens (always use these exact values)

```css
/* Colors */
--color-primary: #1A2530        /* Dark navy background */
--color-primary-dark: #0A2540  /* Darker navy (hero gradient start) */
--color-cta: #FF7A21            /* Orange — primary CTA button */
--color-accent: #FFD600         /* Yellow — highlights, badges */
--color-surface: #FFFFFF        /* Card backgrounds */
--color-text-primary: #FFFFFF   /* Text on dark bg */
--color-text-dark: #1A2530      /* Text on light bg */
--color-text-muted: #8A9BB0     /* Muted/secondary text */
--color-border: #2A3F54         /* Subtle borders */
```

```
/* Typography — Inter font */
H1: 48px / font-weight 700 / leading-tight
H2: 36px / font-weight 700 / leading-tight
H3: 24px / font-weight 600
H4: 20px / font-weight 600
Body: 16px / font-weight 400 / leading-relaxed
Small: 14px / font-weight 400
```

---

## Coding Rules

### 1. Components
- Every component uses `export default function ComponentName()`
- Props always typed with explicit interface: `interface Props { ... }`
- Use `forwardRef` only for UI primitives (Button, Input)
- No `any`, no `!` non-null assertions
- Client components (`'use client'`) only when using hooks or browser events

### 2. Imports
- **NEVER** barrel imports: ❌ `import { X, Y, Z } from 'lucide-react'`
- **ALWAYS** direct imports: ✅ `import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right'`
- Group imports: 1) React/Next, 2) Third-party, 3) Internal `@/`

### 3. Content
- **ALL** user-facing strings live in `messages/ko.json` and `messages/en.json`
- Components NEVER hardcode strings — always use `t('key')` from next-intl
- Use Korean/Vietnamese context (KRW→VND, 한국, 베트남, etc.)

### 4. Styling
- Use Tailwind utility classes only
- Color classes must match design tokens (configure in `globals.css` as CSS vars, reference via Tailwind)
- Responsive: mobile-first (`base` → `md:` → `lg:`)
- Breakpoints: mobile <768px, tablet 768-1024px, desktop >1024px
- No inline `style={{}}` unless for dynamic values (e.g., progress bars)

### 5. Performance (React Best Practices)
- `'use client'` components: minimize, isolate interactivity
- Dynamic import heavy components: `import dynamic from 'next/dynamic'`
- Static JSX (icons, decorators) hoisted outside render when possible
- No `useEffect` for data that can be static

### 6. File naming
- Components: `PascalCase.tsx`
- Utilities/constants: `camelCase.ts`
- One component per file (except tiny sub-components used only within that file)

---

## What to do when spec is unclear
1. Follow existing patterns in the codebase
2. Use the most common/standard approach
3. Leave a `// TODO: confirm with designer` comment
4. **Never** ask — just implement the most reasonable interpretation

---

## Output expectations
After completing each task:
- Confirm file paths modified/created
- Note any deviation from spec with reason
- Flag any missing assets (images, icons) that need to be provided

---

## V-Pay Product Context
- **Product**: P2P remittance app — Korea ↔ Vietnam money transfers
- **Target users**: Korean residents sending money to Vietnam
- **Key selling points**: Fast transfer, low fees, real-time exchange rate, licensed & secure
- **Tone**: Professional, trustworthy, modern fintech
- **Language on page**: Korean (KOR version of landing page)
