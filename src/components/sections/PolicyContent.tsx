import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { hasPublicAsset } from '@/components/ui/AssetOrPlaceholder'
import type { PolicyBulletSection, PolicyStatusSection } from '@/types'

import Button from '../ui/Button'
import Container from '../ui/Container'

const heroImageFilename = 'policy-hero-badge.png'
const helpBannerFilename = 'policy-help-banner.png'

const heroImagePath = `/images/${heroImageFilename}`
const helpBannerPath = `/images/${helpBannerFilename}`

function BulletItem({ text }: { text: string }) {
  return (
    <div className="flex w-full items-start gap-3 pl-4">
      <div className="mt-[0.45em] h-2 w-2 shrink-0 bg-cta" />
      <p
        className="flex-1 text-[14px] leading-[1.6] text-[#1c1c1e] md:text-[15px] desktop:text-[16px] font-noto"
      >
        {text}
      </p>
    </div>
  )
}

function StatusSectionTitle({ title }: { title: string }) {
  return (
    <div className="inline-flex items-center gap-3 md:gap-4">
      <span className="h-[28px] w-[6px] bg-accent md:h-[33px] md:w-[7px]" />
      <h3
        className="text-[24px] font-medium leading-none text-primary md:text-[28px] desktop:text-[32px] font-noto"
      >
        {title}
      </h3>
    </div>
  )
}

export default async function PolicyContent() {
  const t = await getTranslations('policyPage')
  const complianceSections = t.raw('complianceSections') as PolicyBulletSection[]
  const statusSections = t.raw('statusTables') as PolicyStatusSection[]
  const tableHeaders = t.raw('tableHeaders') as {
    code: string
    status: string
    description: string
  }
  const hasHeroImage = hasPublicAsset('images', heroImageFilename)
  const hasHelpBanner = hasPublicAsset('images', helpBannerFilename)

  return (
    <main className="bg-[#f8f5ee] pb-20">
      <section className="relative overflow-hidden bg-cta">
        <div className="absolute inset-y-0 right-[-12%] hidden w-[58%] bg-[radial-gradient(circle_at_center,rgba(255,181,71,0.28)_0%,rgba(255,255,255,0.08)_32%,transparent_68%)] desktop:block" />
        <div className="absolute inset-y-0 right-[12%] hidden w-[32%] bg-[radial-gradient(circle_at_center,rgba(255,210,70,0.2)_0%,transparent_68%)] desktop:block" />

        <div className="mx-auto w-full max-w-[1440px] px-4 py-12 md:px-6 md:py-16 desktop:relative desktop:h-[455px] desktop:px-[120px] desktop:py-0">
          <div className="relative z-10 flex h-full flex-col justify-center">
            <div className="max-w-[760px] text-white">
              <h1
                className="text-[34px] font-medium leading-[1.15] md:text-[44px] desktop:text-[56px] font-noto"
              >
                {t('heroTitle')}
              </h1>
              <p
                className="mt-4 max-w-[760px] text-[18px] font-normal leading-[1.5] text-white/95 md:text-[24px] md:leading-[1.6] desktop:text-[32px] desktop:leading-[44px] font-noto"
              >
                {t('heroSubtitle')}
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8 flex justify-center desktop:absolute desktop:top-1/2 desktop:right-[96px] desktop:mt-0 desktop:-translate-y-1/2">
            {hasHeroImage ? (
              <Image
                src={heroImagePath}
                alt=""
                width={537}
                height={546}
                className="h-auto w-[180px] md:w-[240px] desktop:w-[290px]"
                sizes="(max-width: 767px) 180px, (max-width: 1199px) 240px, 290px"
                priority
              />
            ) : null}
          </div>
        </div>
      </section>

      <section className="pt-12 pb-12 md:pt-16 md:pb-16 desktop:pt-[80px] desktop:pb-[80px]">
        <Container>
          <div className="mx-auto flex max-w-[1220px] flex-col gap-8 desktop:gap-10">
            {complianceSections.map((section) => (
              <article
                key={section.title}
                className="rounded-[16px] bg-white px-5 py-6 md:px-8 md:py-8 desktop:px-8 desktop:py-8"
              >
                <h2
                  className="text-[28px] font-bold leading-none text-primary md:text-[32px] desktop:text-[36px] font-noto"
                >
                  {section.title}
                </h2>
                <p
                  className="mt-6 whitespace-pre-line text-[16px] leading-[1.65] text-[#1c1c1e] md:text-[18px] desktop:max-w-[1040px] desktop:text-[20px] font-noto"
                >
                  {section.description}
                </p>
                <ul className="mt-6 flex flex-col gap-3 desktop:gap-4">
                  {section.bullets.map((item, index) => (
                    <li key={`${section.title}-${index}`}>
                      <BulletItem text={item} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white pt-16 pb-16 md:pt-20 md:pb-20 desktop:pt-[120px] desktop:pb-[120px]">
        <Container>
          <div className="mx-auto max-w-[1220px]">
            <div className="max-w-[820px]">
              <h2
                className="text-[34px] font-bold leading-tight text-[#1c1c1e] md:text-[40px] desktop:text-[48px] font-noto"
              >
                {t('statusTitle')}
              </h2>
              <p
                className="mt-3 max-w-[651px] text-[18px] leading-[1.65] text-[#1c1c1e] md:text-[22px] desktop:text-[28px] desktop:leading-[44px] font-noto"
              >
                {t('statusSubtitle')}
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-10 md:mt-12 md:gap-12 desktop:mt-[72px] desktop:gap-[72px]">
              {statusSections.map((section) => (
                <div key={section.title}>
                  <div className="mb-6 md:mb-8">
                    <StatusSectionTitle title={section.title} />
                  </div>

                  <div className="overflow-x-auto rounded-[8px] bg-white">
                    <table
                      className="min-w-[860px] w-full border-collapse border border-[#e0e0e0]"
                      style={{ borderSpacing: 0 }}
                    >
                      <thead>
                        <tr className="bg-[#ffd400] text-left">
                          <th
                            className="w-[35%] border border-[#e0e0e0] px-4 py-4 text-[15px] font-medium text-[#1c1c1e] md:px-6 md:text-[18px] font-noto"
                          >
                            {tableHeaders.code}
                          </th>
                          <th
                            className="w-[25%] border border-[#e0e0e0] px-4 py-4 text-[15px] font-medium text-[#1c1c1e] md:px-6 md:text-[18px] font-noto"
                          >
                            {tableHeaders.status}
                          </th>
                          <th
                            className="w-[40%] border border-[#e0e0e0] px-4 py-4 text-[15px] font-medium text-[#1c1c1e] md:px-6 md:text-[18px] font-noto"
                          >
                            {tableHeaders.description}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row) => (
                          <tr key={row.code} className="bg-white">
                            <td
                              className="border border-[#e0e0e0] px-4 py-4 text-[15px] font-normal text-[#1c1c1e] md:px-6 md:text-[18px] font-inter"
                            >
                              {row.code}
                            </td>
                            <td
                              className="border border-[#e0e0e0] px-4 py-4 text-[15px] font-normal text-[#1c1c1e] md:px-6 md:text-[18px] font-noto"
                            >
                              {row.status}
                            </td>
                            <td
                              className="border border-[#e0e0e0] px-4 py-4 text-[15px] font-normal text-[#1c1c1e] md:px-6 md:text-[18px] font-noto"
                            >
                              {row.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white pt-10 pb-16 md:pb-20 desktop:pb-[100px]">
        <Container>
          <div className="mx-auto max-w-[1460px]">
            <div className="relative isolate overflow-hidden rounded-[32px] bg-primary px-6 py-10 md:px-10 md:py-12 desktop:px-[100px] desktop:py-[64px]">
              {hasHelpBanner ? (
                <Image
                  src={helpBannerPath}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1519px) 100vw, 1460px"
                />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]" />
              <div className="absolute inset-y-0 right-[-18%] hidden w-[75%] bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.1)_0%,transparent_62%)] desktop:block" />

              <div className="relative z-10 inline-flex flex-col items-start gap-8">
                <div className="flex max-w-[1004px] flex-col items-start gap-4 desktop:gap-6">
                  <h2
                    className="text-[34px] font-bold leading-tight text-white md:text-[40px] desktop:text-[48px] font-noto"
                  >
                    {t('helpTitle')}
                  </h2>
                  <p
                    className="max-w-[1004px] text-[18px] leading-[1.65] text-white/92 md:text-[22px] desktop:text-[28px] desktop:leading-[44px] font-noto"
                  >
                    {t('helpSubtitle')}
                  </p>
                </div>

                <Button
                  className="h-12 rounded-[500px] px-[26px] text-sm font-bold leading-5 shadow-none font-inter"
                >
                  {t('helpCta')}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
