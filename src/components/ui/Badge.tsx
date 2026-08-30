import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent' | 'secondary'
  className?: string
}

const variants = {
  default: 'bg-bg-hover text-text border-border',
  success: 'bg-accent-success/10 text-accent-success border-accent-success/30',
  warning: 'bg-accent-warning/10 text-accent-warning border-accent-warning/30',
  danger: 'bg-accent-danger/10 text-accent-danger border-accent-danger/30',
  accent: 'bg-accent/10 text-accent border-accent/30',
  secondary: 'bg-accent-secondary/10 text-accent-secondary border-accent-secondary/30',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
