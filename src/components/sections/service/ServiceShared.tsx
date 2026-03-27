import Image from 'next/image'

import AssetOrPlaceholder, { hasPublicAsset } from '@/components/ui/AssetOrPlaceholder'
import Button from '@/components/ui/Button'
import type { ServiceKeyItem, ServiceReviewItem, ServiceTechItem } from '@/types'

export { AssetOrPlaceholder, hasPublicAsset }

export function ServiceHeroSection({
  badge,
  title,
  subtitle,
  image,
}: {
  badge: string
  title: string
  subtitle: string
  image: string
}) {
  const hasHeroImage = hasPublicAsset('images', image)

  return (
    <section className="relative overflow-hidden">
      {hasHeroImage ? (
        <Image
          src={`/images/${image}`}
          alt={title}
          fill
          className="absolute inset-0 object-cover object-center"
          loading="eager"
          sizes="100vw"
        />
      ) : (
        <AssetOrPlaceholder
          folder="images"
          filename={image}
          alt={title}
          width={1920}
          height={676}
          className="absolute inset-0 h-full w-full object-cover object-center"
          sizes="100vw"
          dark
        />
      )}
      <div className="relative mx-auto flex w-full max-w-[1920px] px-6 py-12 md:px-10 desktop:min-h-[676px] desktop:pl-14 desktop:pr-0 desktop:py-24">
        <div className="flex w-full max-w-[746px] flex-col justify-center gap-8 text-white desktop:gap-14">
          <div className="inline-flex w-fit items-center justify-center rounded-[500px] border border-[#ffd13e] px-8 py-3 shadow-[inset_0_0_24px_rgba(255,214,0,1)]">
            <span className="text-2xl font-bold text-[#fff4b5] desktop:text-3xl font-noto">
              {badge}
            </span>
          </div>
          <div className="flex max-w-[651px] flex-col gap-6">
            <h1 className="text-[38px] font-bold leading-none md:text-[48px] desktop:text-6xl font-noto">
              {title}
            </h1>
            <p className="text-lg leading-8 md:text-2xl md:leading-10 desktop:text-3xl font-noto">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServiceProcessSection({
  title,
  cta,
  image,
}: {
  title: string
  cta: string
  image: string
}) {
  return (
    <section className="px-4 py-14 desktop:px-56 desktop:py-28">
      <div className="mx-auto flex max-w-[1460px] flex-col gap-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold text-primary md:text-5xl desktop:text-6xl font-noto">
            {title}
          </h2>
          <Button className="self-start px-6 text-lg desktop:self-auto desktop:text-2xl" size="md">
            {cta}
          </Button>
        </div>
        <div className="overflow-hidden rounded-[24px] bg-primary desktop:rounded-[32px]">
          <AssetOrPlaceholder
            folder="images"
            filename={image}
            alt={title}
            width={1460}
            height={640}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1199px) 100vw, 1460px"
            dark
          />
        </div>
      </div>
    </section>
  )
}

export function ServiceCoreTechnologySection({
  title,
  cta,
  items,
}: {
  title: string
  cta: string
  items: ServiceTechItem[]
}) {
  return (
    <section className="bg-stone-100 px-4 py-16 desktop:px-56 desktop:py-36">
      <div className="mx-auto flex max-w-[1460px] flex-col gap-12 desktop:gap-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold text-primary md:text-5xl desktop:text-6xl font-noto">
            {title}
          </h2>
          <Button className="self-start px-6 text-lg desktop:self-auto desktop:text-2xl" size="md">
            {cta}
          </Button>
        </div>
        <div className="grid gap-8 desktop:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="flex flex-col gap-8 rounded-[24px] bg-white px-8 py-10 shadow-[0_14px_30px_rgba(15,23,42,0.06)] desktop:rounded-[32px]">
              <div className="flex justify-center rounded-[24px] px-4 py-8">
                <AssetOrPlaceholder
                  folder="images"
                  filename={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="h-40 w-40 object-contain desktop:h-48 desktop:w-48"
                  sizes="200px"
                />
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                <h3 className="text-2xl font-bold text-[#1c1c1e] desktop:text-3xl font-noto">
                  {item.title}
                </h3>
                <p className="whitespace-pre-line text-base leading-7 text-[#666563] desktop:text-xl desktop:leading-8 font-noto">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServiceTargetReviewsSection({
  title,
  reviews,
  reviewAvatars,
  cardMaxWidth = '560px',
  avatarSizeClass = 'h-20 w-20 md:h-28 md:w-28 desktop:h-48 desktop:w-48',
  backgroundClassName = 'bg-[#666563]',
  backgroundImage = 'service-p2p-reviews-bg.png',
  cardWrapClassName = 'w-full',
  alternateSides = false,
}: {
  title: string
  reviews: ServiceReviewItem[]
  reviewAvatars: string[]
  cardMaxWidth?: string
  avatarSizeClass?: string
  backgroundClassName?: string
  backgroundImage?: string
  cardWrapClassName?: string
  alternateSides?: boolean
}) {
  return (
    <section className="px-4 py-10 desktop:px-10">
      <div className="mx-auto max-w-[1920px]">
        <div
          className={`relative overflow-hidden rounded-[32px] px-4 py-10 md:px-8 desktop:px-14 desktop:py-14 ${backgroundClassName}`}
        >
          <AssetOrPlaceholder
            folder="images"
            filename={backgroundImage}
            alt={title}
            width={1460}
            height={900}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            sizes="100vw"
            dark
          />
          <div className="relative flex flex-col items-center gap-10">
            <h2
              className="text-center text-3xl font-bold text-white md:text-5xl desktop:text-6xl font-noto"
            >
              {title}
            </h2>
            <div
              className={`overflow-hidden rounded-[32px] bg-white px-5 py-8 shadow-[0_30px_70px_rgba(0,0,0,0.12)] md:px-8 desktop:px-14 desktop:py-14 ${cardWrapClassName}`}
            >
              <div className="flex flex-col gap-10">
                {reviews.map((review, index) => {
                  const alignRight = alternateSides ? index % 2 === 0 : index === 0
                  const avatarFilename = reviewAvatars[index] ?? reviewAvatars[0]

                  return (
                    <div
                      key={`${review.role}-${index}`}
                      className={`flex flex-col gap-4 ${alignRight ? 'items-end' : 'items-start'} md:flex-row md:items-start ${alignRight ? 'md:justify-end' : 'md:justify-start'} md:gap-6`}
                    >
                      {!alignRight && (
                        <AssetOrPlaceholder
                          folder="images"
                          filename={avatarFilename}
                          alt={review.role}
                          width={200}
                          height={200}
                          className={`shrink-0 rounded-full object-cover ${avatarSizeClass}`}
                          sizes="(max-width: 767px) 80px, (max-width: 1199px) 112px, 192px"
                        />
                      )}
                      <div
                        className={`flex flex-col gap-3 ${alignRight ? 'items-end' : 'items-start'}`}
                        style={{ maxWidth: cardMaxWidth }}
                      >
                        <p
                          className={`px-2 text-xl font-bold text-cta desktop:text-2xl font-noto ${alignRight ? 'md:pr-6' : 'md:pl-8'}`}
                        >
                          {review.role}
                        </p>
                        <div className={`flex items-stretch ${alignRight ? 'flex-row' : 'flex-row-reverse'}`}>
                          <div className="bg-[#efefef] px-5 py-5 text-lg leading-8 text-[#1c1c1e] shadow-[0_8px_24px_rgba(15,23,42,0.08)] desktop:px-6 desktop:text-[26px] desktop:leading-9">
                            {review.quote}
                          </div>
                        </div>
                      </div>
                      {alignRight && (
                        <AssetOrPlaceholder
                          folder="images"
                          filename={avatarFilename}
                          alt={review.role}
                          width={200}
                          height={200}
                          className={`shrink-0 rounded-full object-cover ${avatarSizeClass}`}
                          sizes="(max-width: 767px) 80px, (max-width: 1199px) 112px, 192px"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ServiceKeyContentSection({
  title,
  items,
  columnsClassName = 'md:grid-cols-2 desktop:grid-cols-4',
  itemClassName = 'flex items-center gap-5 rounded-[24px] p-4 desktop:p-6',
  textClassName = 'text-xl font-medium text-[#1c1c1e] desktop:text-2xl',
}: {
  title: string
  items: ServiceKeyItem[]
  columnsClassName?: string
  itemClassName?: string
  textClassName?: string
}) {
  return (
    <section className="px-4 pb-16 pt-8 desktop:px-56 desktop:pb-28 desktop:pt-16">
      <div className="mx-auto flex max-w-[1460px] flex-col items-center gap-10 desktop:gap-16">
        <h2
          className="text-3xl font-bold text-primary md:text-5xl desktop:text-6xl font-noto"
        >
          {title}
        </h2>
        <div className={`grid w-full gap-8 desktop:gap-12 ${columnsClassName}`}>
          {items.map((item) => (
            <div key={item.title} className={itemClassName}>
              <AssetOrPlaceholder
                folder="icons"
                filename={item.icon}
                alt={item.title}
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 object-contain"
                sizes="56px"
              />
              <p className={`${textClassName} font-noto`}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServiceCtaImageSection({
  image,
  alt,
}: {
  image: string
  alt: string
}) {
  return (
    <section className="px-4 py-12 desktop:px-56 desktop:py-24">
      <div className="mx-auto max-w-[1460px] overflow-hidden rounded-[24px] desktop:rounded-[32px]">
        <AssetOrPlaceholder
          folder="images"
          filename={image}
          alt={alt}
          width={1460}
          height={481}
          className="h-auto w-full object-cover"
          sizes="(max-width: 1199px) 100vw, 1460px"
          dark
        />
      </div>
    </section>
  )
}

export function ServiceFaqSection({
  title,
  items,
}: {
  title: string
  items: Array<{ question: string }>
}) {
  return (
    <section className="bg-white px-4 pb-20 pt-8 desktop:px-10 desktop:pb-28 desktop:pt-16">
      <div className="mx-auto flex max-w-[1460px] flex-col items-center rounded-[32px] px-0">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary md:text-5xl desktop:mb-20 desktop:text-6xl font-noto">
          {title}
        </h2>
        <div className="flex w-full max-w-[850px] flex-col gap-6">
          {items.map((item, index) => (
            <button
              key={`${item.question}-${index}`}
              className="flex w-full cursor-pointer items-center gap-4 rounded-[20px] bg-[#f7f5ef80] px-6 py-[22px] text-left desktop:px-8 desktop:py-[26px]"
              type="button"
            >
              <div className="flex min-w-0 flex-1 items-start gap-[17px]">
                <span className="shrink-0 text-2xl font-bold leading-8 text-cta desktop:text-3xl">Q.</span>
                <div className="min-w-0 flex-1">
                  <span className="block text-lg leading-8 text-[#1c1c1e] desktop:text-[32px] desktop:leading-8 font-noto">
                    {item.question}
                  </span>
                </div>
              </div>
              <span aria-hidden="true" className="relative block h-4 w-4 shrink-0 rotate-45 border-b-[3px] border-r-[3px] border-[#1a2530] desktop:h-5 desktop:w-5" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
