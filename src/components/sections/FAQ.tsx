'use client'

import { useState } from 'react'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import type { FaqItem } from '@/types'
import { cn } from '@/lib/utils'

import Container from '../ui/Container'

export default function FAQ() {
  const t = useTranslations('faq')
  const items = t.raw('items') as FaqItem[]
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-[#f8f5ee] py-10 md:py-14 desktop:pb-[100px] desktop:pt-0" id="policy">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[32px] bg-cta px-5 py-12 md:px-10 md:py-16 desktop:px-[240px] desktop:py-[120px]">
          <Image
            src="/images/faq-union.svg"
            alt=""
            width={2035}
            height={1263}
            className="pointer-events-none absolute bottom-[-20%] left-1/2 h-auto max-w-none -translate-x-1/2 opacity-95 md:bottom-[-28%] md:w-[1600px] desktop:bottom-[-279px] desktop:left-[calc(50%+51.5px)] desktop:w-[2035px] desktop:-translate-x-1/2"
            sizes="100vw"
            unoptimized
          />

          <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 desktop:gap-[80px]">
            <h2
              className="text-center text-[32px] font-bold leading-none text-white md:text-[40px] desktop:text-[48px] font-inter"
            >
              {t('sectionTitle')}
            </h2>

            <div className="flex w-full flex-col items-center gap-4 md:gap-5 desktop:gap-[24px]">
          {items.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <article
                key={item.question}
                className={cn(
                  'w-full max-w-[850px] rounded-[20px] bg-white px-4 py-4 shadow-[0_8px_24px_rgba(28,28,30,0.08)] transition-[padding] duration-200 md:px-6 md:py-5 desktop:px-[32px] desktop:py-[26px]',
                  isOpen && 'pb-5 md:pb-6'
                )}
              >
                <button
                  className="flex w-full cursor-pointer items-start justify-between gap-4 text-left transition duration-200"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  type="button"
                >
                  <span className="flex min-w-0 items-start gap-3 md:gap-4">
                    <span
                      className="shrink-0 text-[20px] font-bold leading-none text-cta md:text-[28px] desktop:text-[32px] font-inter"
                    >
                      Q.
                    </span>
                    <span
                      className="min-w-0 pt-0.5 text-[18px] font-medium leading-[1.3] text-[#1c1c1e] md:text-[24px] desktop:text-[32px] desktop:leading-none font-noto"
                    >
                      {item.question}
                    </span>
                  </span>

                  <Image
                    src="/icons/faq-chevron.svg"
                    alt=""
                    width={12}
                    height={12}
                    className={cn(
                      'mt-1 h-3 w-3 shrink-0 transition-transform duration-200',
                      isOpen ? 'rotate-0' : '-rotate-90'
                    )}
                    unoptimized
                  />
                </button>

                <div
                  className={cn(
                    'grid overflow-hidden transition-all duration-200',
                    isOpen ? 'grid-rows-[1fr] pt-4' : 'grid-rows-[0fr] pt-0'
                  )}
                >
                  <div className="min-h-0">
                    <p
                      className="border-t border-[#f0ebe4] pt-4 text-sm leading-relaxed text-[#666563] md:pr-6 md:text-base desktop:pl-[48px] font-noto"
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
