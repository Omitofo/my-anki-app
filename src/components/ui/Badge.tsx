import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'sage' | 'mist'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full font-body',
        variant === 'default' && 'bg-paper-warm text-ink-muted border border-mist/20',
        variant === 'accent' && 'bg-accent/10 text-accent border border-accent/20',
        variant === 'sage' && 'bg-sage/10 text-sage border border-sage/20',
        variant === 'mist' && 'bg-mist/10 text-mist border border-mist/20',
        className
      )}
    >
      {children}
    </span>
  )
}