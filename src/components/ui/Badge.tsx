import type { ReactNode } from 'react'

interface BadgeProps {
  variant?: 'pass' | 'fail' | 'review' | 'neutral'
  children: ReactNode
  className?: string
}

const variantStyles: Record<string, string> = {
  pass: 'bg-status-pass text-white',
  fail: 'bg-status-fail text-white',
  review: 'bg-status-review text-white',
  neutral: 'bg-secondary-muted text-white',
}

export default function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
