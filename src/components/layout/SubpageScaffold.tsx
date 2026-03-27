interface Props {
  title: string
}

export default function SubpageScaffold({ title }: Props) {
  return (
    <div className="min-h-[60vh] bg-[#f8f5ee] px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-center">
        <div className="rounded-[32px] border border-black/5 bg-white/70 px-8 py-16 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:px-12 lg:min-w-[420px] lg:px-16">
          <h1
            className="text-center text-[32px] font-bold leading-none text-primary sm:text-[40px] lg:text-[48px] font-noto"
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  )
}
