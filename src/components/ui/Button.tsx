'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-200 rounded-xl select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          'disabled:opacity-40 disabled:pointer-events-none',
          // Variants
          variant === 'primary' && [
            'bg-ink text-paper',
            'hover:bg-ink-soft active:scale-[0.97]',
            'shadow-sm hover:shadow-md',
          ],
          variant === 'secondary' && [
            'bg-paper-warm text-ink border border-mist/30',
            'hover:border-mist hover:bg-paper active:scale-[0.97]',
          ],
          variant === 'ghost' && [
            'text-ink-muted',
            'hover:text-ink hover:bg-paper-warm active:scale-[0.97]',
          ],
          variant === 'danger' && [
            'bg-red-50 text-red-700 border border-red-200',
            'hover:bg-red-100 active:scale-[0.97]',
          ],
          // Sizes
          size === 'sm' && 'text-sm px-3 py-1.5 rounded-lg',
          size === 'md' && 'text-sm px-5 py-2.5',
          size === 'lg' && 'text-base px-7 py-3.5',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading…
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'