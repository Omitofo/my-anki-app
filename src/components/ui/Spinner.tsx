// src/components/ui/Spinner.tsx

import { cn } from '@/lib/utils'

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'w-4 h-4 border-[1.5px]',
  md: 'w-7 h-7 border-2',
  lg: 'w-10 h-10 border-2',
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'rounded-full border-ink/15 border-t-ink animate-spin',
        sizes[size],
        className
      )}
    />
  )
}

export function PageSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 animate-fade-in">
      <Spinner size="md" />
      <span className="text-xs text-mist/50 font-mono uppercase tracking-widest">Loading…</span>
    </div>
  )
}