'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number // 0–1
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ value, className, showLabel }: ProgressBarProps) {
  const pct = Math.round(Math.min(Math.max(value, 0), 1) * 100)

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex-1 h-1.5 bg-paper-warm rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-mist font-mono tabular-nums w-8 text-right">{pct}%</span>
      )}
    </div>
  )
}