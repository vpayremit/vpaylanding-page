import { cn } from '@/lib/utils'

type BadgeVariant = 'orange' | 'gray'

interface Props {
  label: string
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  orange: 'bg-cta text-white',
  gray: 'bg-slate-100 text-primary',
}

export default function Badge({ label, variant = 'orange', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
