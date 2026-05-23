import { Link } from '@/i18n/navigation'
import { TERMS_MANIFEST, TERMS_SLUGS, type TermsSlug } from '@/data/terms'

interface Props {
  slug: TermsSlug
  locale: 'ko' | 'en'
  title: string
  html: string
  navLabel: string
}

export default function TermsPageContent({ slug, locale, title, html, navLabel }: Props) {
  return (
    <main className="bg-white">
      <section className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-10 md:px-8 md:pb-20 md:pt-14 desktop:px-20 desktop:pb-24 desktop:pt-16">
        <div className="grid gap-10 desktop:grid-cols-[260px_minmax(0,1fr)] desktop:gap-14">
          <aside className="desktop:sticky desktop:top-24 desktop:self-start">
            <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#8e8e93] font-inter">
              {navLabel}
            </p>
            <ul className="mt-4 flex flex-col gap-1">
              {TERMS_SLUGS.map((s) => {
                const isActive = s === slug
                return (
                  <li key={s}>
                    <Link
                      href={`/terms/${s}`}
                      className={`block rounded-lg px-3 py-2 text-[14px] leading-[1.45] transition md:text-[15px] font-noto ${
                        isActive
                          ? 'bg-[#f7f4ef] font-bold text-cta'
                          : 'text-[#1c1c1e] hover:bg-[#f9f7f3] hover:text-cta'
                      }`}
                    >
                      {TERMS_MANIFEST[s].label[locale]}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </aside>

          <div>
            <h1 className="text-[28px] font-bold leading-tight text-primary md:text-[36px] desktop:text-[44px] font-noto">
              {title}
            </h1>
            <article
              className="mt-8 text-[14px] leading-[1.7] text-[#333333] md:text-[15px] desktop:mt-10 desktop:text-[16px] font-noto [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-primary [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-cta/30 [&_blockquote]:pl-6 [&_blockquote_p]:my-2 [&_blockquote_p]:text-[#555555] [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_a]:text-cta [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
