# VPAY Landing Page

Locale-aware marketing site for VPAY, built with Next.js App Router, React 19, Tailwind CSS v4, and `next-intl`.

The project currently supports Korean and English and includes the main landing page, subpages, news listing and detail pages, and four service detail screens.

## Stack

- Next.js 16.2.1
- React 19
- TypeScript
- Tailwind CSS v4
- `next-intl` for locale routing and copy management
- Playwright for browser testing

## Locales

- `ko` default locale
- `en` secondary locale

Locale routing is defined in `src/i18n/routing.ts`.

## Available Routes

- `/[locale]`
- `/[locale]/about`
- `/[locale]/contact`
- `/[locale]/fees`
- `/[locale]/news`
- `/[locale]/news/[slug]`
- `/[locale]/policy`
- `/[locale]/services`
- `/[locale]/services/[slug]`

Current service slugs:

- `personal-transfer`
- `business-transfer`
- `real-time-fx`
- `digital-wallet`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/ko](http://localhost:3000/ko) or [http://localhost:3000/en](http://localhost:3000/en).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/
  app/
    [locale]/              Locale-aware routes
  components/
    layout/                Header, footer, shared scaffolds
    sections/              Page-level and section-level UI
    ui/                    Reusable UI primitives
  i18n/                    Locale routing and request config
  lib/                     Shared helpers and metadata factory
  messages/                ko/en translation content
public/
  images/                  PNG/JPG assets
  icons/                   SVG assets
tests/                     Playwright tests
```

## Content and Assets

- Locale copy lives in:
  - `src/messages/ko.json`
  - `src/messages/en.json`
- Images should go in `public/images`
- Icons should go in `public/icons`
- Missing assets are handled through `src/components/ui/AssetOrPlaceholder.tsx`

## Testing

Production build:

```bash
npx next build
```

Playwright is configured in `playwright.config.ts`.

Note:
- the current Playwright spec in `tests/example.spec.ts` is still the default sample and should be replaced with project-specific tests

## Deployment

This project is structured for Vercel deployment and currently builds successfully with `next build`.

Current deployment notes:

- no runtime environment variables are required at the moment
- no `vercel.json` is required for the current setup
- commit and push the current repo state before using Vercel Git integration
- pinning the Node version is recommended for consistency across local and CI environments

## Development Notes

- Header and footer are injected from `src/app/[locale]/layout.tsx`
- Shared metadata generation is handled by `src/lib/metadata.ts`
- Service route lookup is handled in `src/app/[locale]/services/[slug]/page.tsx`
- News slug generation and related item helpers live in `src/lib/news.ts`
