import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-50',
          variant === 'primary' && 'bg-accent text-bg hover:bg-cyan-300 shadow-lg shadow-accent/20',
          variant === 'secondary' && 'bg-accent-secondary text-white hover:bg-violet-400 shadow-lg shadow-accent-secondary/20',
          variant === 'outline' && 'border border-border-strong text-text-heading hover:bg-bg-hover',
          variant === 'ghost' && 'text-text hover:bg-bg-hover hover:text-text-heading',
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4',
          size === 'lg' && 'h-12 px-6 text-lg',
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
