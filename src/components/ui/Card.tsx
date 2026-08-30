import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: 'none' | 'accent' | 'success'
}

export function Card({ children, className, glow = 'none' }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl p-5 transition-all duration-300 hover:border-border-strong',
        glow === 'accent' && 'glow-accent',
        glow === 'success' && 'glow-success',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-4 flex items-start justify-between gap-4', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-lg font-semibold text-text-heading', className)}>{children}</h3>
}

export function CardSubtitle({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-sm text-text-muted', className)}>{children}</p>
}
