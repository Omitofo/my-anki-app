import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function EmptyState({ icon = '📭', title, description, className, children }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 py-16 px-6 text-center',
        className
      )}
    >
      <span className="text-5xl animate-float">{icon}</span>
      <h3 className="font-display text-xl text-ink-soft">{title}</h3>
      {description && (
        <p className="text-sm text-mist max-w-xs leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  )
}