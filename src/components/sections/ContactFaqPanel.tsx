'use client'

import { useState } from 'react'

import Search from 'lucide-react/dist/esm/icons/search'

import type { ContactFaqItem } from '@/types'
import { cn } from '@/lib/utils'

interface ContactFaqPanelProps {
  title: string
  searchPlaceholder: string
  tabs: Array<{
    key: string
    label: string
  }>
  items: ContactFaqItem[]
  moreLabel: string
}

export default function ContactFaqPanel({
  title,
  searchPlaceholder,
  tabs,
  items,
  moreLabel,
}: ContactFaqPanelProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? '')
  const [searchValue, setSearchValue] = useState('')

  return (
    <section className="bg-white pt-12 pb-16 md:pt-16 md:pb-20 desktop:pt-[80px] desktop:pb-[80px]">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-8 desktop:px-[230px]">
        <div className="flex flex-col gap-6 desktop:gap-8">
          <div className="flex flex-col gap-6 desktop:flex-row desktop:items-start desktop:justify-between">
            <div className="flex flex-col gap-6">
              <h2
                className="text-[34px] font-bold leading-tight text-primary md:text-[42px] desktop:text-[56px] desktop:leading-[70px] font-noto"
              >
                {title}
              </h2>

              <div className="flex flex-wrap items-center gap-6 md:gap-9 desktop:gap-[45px]">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    className="group relative inline-flex cursor-pointer items-center justify-center pb-4 pt-2.5"
                    onClick={() => setActiveTab(tab.key)}
                    type="button"
                  >
                    <span
                      className={cn(
                        'text-[18px] leading-[28px] transition-all duration-300 md:text-[22px] md:leading-[34px] desktop:text-[28px] desktop:leading-[44px] font-noto',
                        activeTab === tab.key
                          ? 'font-bold text-primary'
                          : 'font-medium text-[#666563]'
                      )}
                    >
                      {tab.label}
                    </span>
                    <span
                      className={cn(
                        'absolute inset-x-0 bottom-0 h-1 origin-left rounded-full bg-cta transition-transform duration-300',
                        activeTab === tab.key ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-60'
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-[300px] desktop:mt-4">
              <input
                className="h-[52px] w-full rounded-[12px] bg-[#f5f5f5] px-4 pr-12 text-[14px] leading-none text-[#1c1c1e] placeholder:text-[#8e8e93] desktop:h-[56px] desktop:px-6 desktop:pr-14 desktop:text-base font-noto"
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder={searchPlaceholder}
                value={searchValue}
                type="text"
              />
              <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#666563] desktop:right-6 desktop:h-6 desktop:w-6" />
            </div>
          </div>

          <div className="border-t border-[#d1d1d6]">
            {items.map((item) => (
              <div
                key={item.question}
                className="border-b border-[#d1d1d6] py-5 md:py-6 desktop:py-[26px]"
              >
                <p
                  className="text-[16px] font-medium leading-[1.5] text-[#1c1c1e] md:text-[18px] desktop:text-[20px] font-noto"
                >
                  {item.question}
                </p>
                {item.answer && (
                  <p className="mt-3 text-[15px] leading-[1.6] text-[#666563] md:text-[17px] desktop:text-[20px] font-noto">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* TODO: Connect to paginated FAQ list or CMS */}
          <div className="flex justify-center">
            <button
              className="inline-flex h-[54px] items-center justify-center rounded-[500px] border border-[#b5b5bc] bg-white px-[26px] text-base font-bold leading-6 text-primary font-inter opacity-50"
              type="button"
              disabled
            >
              {moreLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
