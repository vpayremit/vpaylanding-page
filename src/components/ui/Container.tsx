import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export default function Container({ children, className, ...props }: Props) {
  return (
    <div
      className={cn('mx-auto w-full px-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}
