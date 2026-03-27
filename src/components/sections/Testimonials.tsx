import { Fragment } from 'react'

import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import type { TestimonialItem } from '@/types'
import { cn } from '@/lib/utils'

import Container from '../ui/Container'

const testimonialImages = [
  '/images/testimonial-1.png',
  '/images/testimonial-2.png',
  '/images/testimonial-3.png',
] as const

function renderQuote(quote: string, keyPrefix: string) {
  const lines = quote.split('\n')

  return lines.map((line, lineIndex) => (
    <Fragment key={`${keyPrefix}-${lineIndex}`}>
      {line}
      {lineIndex < lines.length - 1 ? (
        <>
          <br className="hidden desktop:block" />
          <span className="desktop:hidden"> </span>
        </>
      ) : null}
    </Fragment>
  ))
}

export default async function Testimonials() {
  const t = await getTranslations('testimonials')
  const items = t.raw('items') as TestimonialItem[]

  return (
    <section className="bg-white py-20" id="news">
      <Container>
        <div className="rounded-[32px] bg-[#F7F5EF]/40 px-6 py-10 sm:px-8 md:px-12 md:py-16 desktop:px-[128px] desktop:py-[120px]">
          <div className="space-y-14 md:space-y-20 desktop:space-y-[120px]">
            {items.map((item, index) => {
              const isImageLast = index % 2 === 0

              return (
                <article
                  key={`${item.role}-${index}`}
                  className={cn(
                    'flex flex-col gap-8 md:gap-10 desktop:grid desktop:items-center desktop:gap-x-[106px]',
                    isImageLast
                      ? 'desktop:grid-cols-[minmax(0,1fr)_482px]'
                      : 'desktop:grid-cols-[482px_minmax(0,1fr)]'
                  )}
                >
                  <div
                    className={cn(
                      'w-full max-w-[560px] text-left',
                      isImageLast ? 'desktop:order-1' : 'desktop:order-2'
                    )}
                  >
                    <div className="flex flex-col gap-8 desktop:gap-[54px]">
                      <div className="flex flex-col gap-4 desktop:gap-6">
                        <p
                          className="w-full text-[28px] leading-[1.35] text-[#1A2530] md:text-[34px] desktop:text-[40px] desktop:leading-[54px] font-noto"
                          style={{ fontWeight: 500 }}
                        >
                          {'“'}
                          {renderQuote(item.quote, `${item.role}-${index}`)}
                          {'”'}
                        </p>
                        <p
                          className="text-[18px] text-[#FF7A21] md:text-[20px] desktop:text-[24px] font-noto"
                          style={{ fontWeight: 500 }}
                        >
                          {item.role}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 desktop:gap-4">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={`${tag}-${tagIndex}`}
                            className="inline-flex items-center justify-center rounded-full bg-[rgba(26,37,48,0.1)] px-5 py-3 text-[15px] text-[#1A2530] md:px-6 md:text-[18px] desktop:px-[30px] desktop:py-4 desktop:text-[24px] font-noto"
                            style={{
                              fontWeight: 400,
                              lineHeight: '1.333',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'mx-auto w-[240px] shrink-0 md:w-[320px] desktop:w-[482px]',
                      isImageLast ? 'desktop:order-2' : 'desktop:order-1'
                    )}
                  >
                    <Image
                      src={testimonialImages[index] ?? testimonialImages[0]}
                      alt={item.role}
                      width={482}
                      height={482}
                      sizes="(max-width: 767px) 240px, (max-width: 1199px) 320px, 482px"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
