import { forwardRef, type ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg' | 'header'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-cta text-white shadow-[0_5px_16px_rgba(255,122,33,0.28)] hover:bg-[#ef6f18]',
  secondary:
    'border border-white/70 bg-transparent text-white hover:border-white hover:bg-white/10',
  ghost: 'bg-transparent text-primary hover:bg-black/5',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 rounded-full px-4 text-sm',
  md: 'h-12 rounded-full px-6 text-sm font-medium',
  lg: 'h-14 rounded-full px-7 text-base font-semibold',
  header: 'h-[52px] min-w-[150px] rounded-[50px] px-3 text-xl font-bold leading-none',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', type, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap transition duration-200 disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      type={type ?? 'button'}
      {...props}
    />
  )
})

export default Button
