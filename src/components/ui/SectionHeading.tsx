import { cn } from '@/lib/utils'

type SectionHeadingAlign = 'left' | 'center'

interface Props {
  title: string
  subtitle?: string
  align?: SectionHeadingAlign
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className,
  titleClassName,
  subtitleClassName,
}: Props) {
  return (
    <div className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      <h2 className={cn('text-4xl font-bold leading-tight text-primary', titleClassName)}>
        {title}
      </h2>
      {subtitle ? (
        <p className={cn('mt-4 text-base leading-relaxed text-text-muted', subtitleClassName)}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
