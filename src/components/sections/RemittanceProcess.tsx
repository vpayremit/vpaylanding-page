import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import type { ProcessStep } from '@/types'
import { cn } from '@/lib/utils'

import Container from '../ui/Container'

export default async function RemittanceProcess() {
  const t = await getTranslations('remittanceProcess')
  const steps = t.raw('steps') as ProcessStep[]

  return (
    <section className="bg-white py-20 md:py-24 desktop:py-[150px]" id="fees">
      <Container>
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="flex flex-col gap-10 desktop:flex-row desktop:items-start desktop:justify-between">
            <div className="desktop:w-[368px] desktop:flex-none">
              <div className="flex h-full items-center justify-center desktop:items-start desktop:justify-start">
                <div className="w-full max-w-[320px] space-y-6 text-center md:max-w-none desktop:max-w-[368px] desktop:space-y-[60px] desktop:text-left">
                  <h2
                    className="whitespace-nowrap text-[40px] font-bold leading-[0.95] text-[#1A2530] md:text-[48px] desktop:text-[64px] font-noto"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {t('sectionTitle')}
                  </h2>
                  <button
                    className="inline-flex h-[52px] cursor-pointer items-center justify-center rounded-[500px] bg-[#FF7A21] px-6 text-[18px] font-bold leading-[1] text-white shadow-[inset_0_0_0_1px_#FFD500] transition duration-200 hover:bg-[#ef6f18] md:h-[56px] md:px-7 md:text-[20px] desktop:h-[64px] desktop:px-[38px] desktop:text-[24px] desktop:leading-[30px] font-noto"
                    type="button"
                  >
                    {t('cta')}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full space-y-5 desktop:max-w-[829px] desktop:flex-1 desktop:space-y-[24px]">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className={cn(
                    'grid grid-cols-[42px_minmax(0,1fr)] gap-3 md:grid-cols-[46px_minmax(0,1fr)] md:gap-4 desktop:grid-cols-[60px_minmax(0,1fr)] desktop:gap-[32px]',
                    index < steps.length - 1 && 'pb-3 md:pb-4 desktop:pb-6'
                  )}
                >
                  <div className="relative flex justify-center">
                    <div
                      className={cn(
                        'relative z-10 flex h-[32px] w-[32px] items-center justify-center rounded-full text-[14px] font-bold font-inter md:h-[36px] md:w-[36px] md:text-[15px] desktop:h-[60px] desktop:w-[60px] desktop:text-[24px]',
                        index === 0
                          ? 'border border-[#FFD500] bg-[#FF7A21] text-white shadow-[inset_0_0_24.444px_#FFD600]'
                          : 'bg-[#F5F5F5] text-black'
                      )}
                    >
                      {index + 1}
                    </div>

                    {index < steps.length - 1 ? (
                      <div
                        className={cn(
                          'absolute left-1/2 top-[36px] bottom-[-14px] -translate-x-1/2 md:top-[40px] md:bottom-[-18px] desktop:top-[60px] desktop:bottom-[-24px]',
                          index === 0 ? 'w-px bg-gradient-to-b from-[#FD7B2A] to-transparent' : 'w-px bg-[#E8E3DA]'
                        )}
                      />
                    ) : null}
                  </div>

                  <article
                    className={cn(
                      'overflow-hidden rounded-[16px] md:rounded-[18px] desktop:rounded-[24px]',
                      index === 0 ? '' : 'bg-[rgba(247,245,239,0.5)]'
                    )}
                    style={
                      index === 0
                        ? {
                            background:
                              'linear-gradient(180deg, rgba(253, 123, 42, 0.15) 0%, rgba(255, 213, 0, 0.15) 169.55%)',
                          }
                        : undefined
                    }
                  >
                    <div
                      className={cn(
                        'flex flex-col gap-4 px-4 py-4 md:px-5 md:py-5 desktop:rounded-[24px]',
                        index === 0
                          ? 'flex-row items-center gap-3 sm:min-h-[180px] sm:gap-6 desktop:min-h-[256px] desktop:gap-[40px] desktop:px-[40px] desktop:py-[40px]'
                          : index === 1
                            ? 'min-h-[118px] md:min-h-[146px] desktop:min-h-[196px] desktop:justify-center desktop:px-[40px] desktop:py-[40px]'
                            : 'min-h-[104px] md:min-h-[126px] desktop:min-h-[166px] desktop:justify-center desktop:px-[40px] desktop:py-[40px]'
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <h3
                          className="text-[18px] font-bold leading-[1.2] text-[#1A2530] md:text-[22px] desktop:text-[28px] desktop:leading-[40px] font-noto"
                        >
                          {step.title}
                        </h3>

                        <ul className="mt-3 list-disc space-y-1 pl-5 md:mt-4 md:pl-6 desktop:mt-4 desktop:space-y-0 desktop:pl-[30px]">
                          {step.items.map((item) => (
                            <li
                              key={item}
                              className="text-[12px] leading-[1.5] text-[#666563] marker:text-[#666563] md:text-[14px] desktop:text-[20px] desktop:leading-[30px] font-noto"
                              style={{ fontWeight: 400 }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {index === 0 ? (
                        <div className="flex shrink-0 justify-end">
                          <Image
                            src={`/images/process-step-${index + 1}.png`}
                            alt=""
                            width={1024}
                            height={1024}
                            sizes="(max-width: 639px) 72px, (max-width: 1199px) 120px, 120px"
                            className="h-auto w-[72px] object-contain sm:w-[120px]"
                            unoptimized
                          />
                        </div>
                      ) : null}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
