import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right'

import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import type { NewsArticleCardItem, NewsDetailSection } from '@/types'

interface NewsDetailContentProps {
  breadcrumbLabel: string
  detailDate: string
  detailTitle: string
  moreLabel: string
  relatedItems: NewsArticleCardItem[]
  sections: NewsDetailSection[]
}

export default function NewsDetailContent({
  breadcrumbLabel,
  detailDate,
  detailTitle,
  moreLabel,
  relatedItems,
  sections,
}: NewsDetailContentProps) {
  return (
    <main className="bg-white">
      <section className="w-full">
        <div className="relative aspect-[1924/476] w-full overflow-hidden bg-[#d7d2cb]">
          <Image
            src="/images/news-detail-hero.png"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
            <div className="flex max-w-[1120px] items-center gap-2 text-white md:gap-4">
              <span
                className="shrink-0 text-sm font-normal leading-6 opacity-60 md:text-lg md:leading-8 desktop:text-[30px] desktop:leading-10 font-noto"
              >
                {breadcrumbLabel}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-white md:h-5 md:w-5 desktop:h-6 desktop:w-6" />
              <p
                className="line-clamp-1 min-w-0 text-sm font-medium leading-6 md:text-lg md:leading-8 desktop:text-[30px] desktop:leading-10 font-noto"
              >
                {detailTitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-14 desktop:px-60 desktop:py-20">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-3 px-4 md:px-8 desktop:px-0">
          <h1
            className="text-[26px] font-medium leading-[1.3] text-primary md:text-[34px] desktop:text-[48px] font-noto"
          >
            {detailTitle}
          </h1>
          <p
            className="text-sm font-medium text-[#8e8e93] md:text-base desktop:text-2xl font-noto"
          >
            {detailDate}
          </p>
        </div>
      </section>

      <section className="bg-white pb-12 md:pb-16 desktop:px-56 desktop:pb-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-4 md:px-8 desktop:gap-14 desktop:px-0">
          {sections.map((section) => (
            <div className="flex flex-col gap-5" key={section.heading}>
              <h2
                className="text-[22px] font-medium leading-8 text-[#1c1c1e] md:text-[24px] font-noto"
              >
                {section.heading}
              </h2>
              <div className="flex flex-col gap-5">
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    className="whitespace-pre-line text-[15px] font-normal leading-7 text-[#1c1c1e] md:text-[17px] desktop:text-[20px] desktop:leading-8 font-noto"
                    key={`${section.heading}-${index}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white desktop:px-60">
        <div className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-4 pb-16 pt-8 md:px-8 desktop:px-0 desktop:pb-20 desktop:pt-10">
          <h2
            className="text-[28px] font-bold leading-tight text-primary md:text-[32px] desktop:text-[36px] font-noto"
          >
            {moreLabel}
          </h2>

          <div className="flex flex-col">
            {relatedItems.map((item) => (
              <Link
                className="group flex cursor-pointer flex-col gap-2 border-b border-[#e5e7eb] py-5 transition hover:bg-[#faf7f1] md:flex-row md:items-center md:justify-between md:gap-6 md:px-2"
                href={`/news/${item.slug}`}
                key={item.slug}
              >
                <span
                  className="text-[17px] font-medium leading-7 text-[#1c1c1e] transition group-hover:text-cta md:max-w-[800px] md:text-[20px] font-noto"
                >
                  {item.title}
                </span>
                <span
                  className="shrink-0 text-sm font-medium leading-8 text-[#8e8e93] md:text-base font-inter"
                >
                  {item.date}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
