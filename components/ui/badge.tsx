import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-lg border-[2px] px-3 py-1 text-[12px] font-extrabold uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'border-[#2e2692] bg-[#22c55e] text-[#120f3a] shadow-[2px_2px_0px_0px_#2e2692]',
        secondary: 'border-[#2e2692] bg-white text-[#2e2692] shadow-[2px_2px_0px_0px_rgba(46,38,146,0.2)]',
        destructive: 'border-[#dc2626] bg-[#fee2e2] text-[#991b1b] shadow-[2px_2px_0px_0px_#dc2626]',
        outline: 'border-[#2e2692] text-[#2e2692]',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }