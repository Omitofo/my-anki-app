'use client'

// src/components/ui/Spinner.tsx

import { cn } from '@/lib/utils'

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  /** Use 'light' on dark backgrounds (e.g. inside ink-coloured cards) */
  variant?: 'default' | 'light'
}

const sizes = {
  sm: 'w-4 h-4 border-[1.5px]',
  md: 'w-6 h-6 border-2',
  lg: 'w-9 h-9 border-[2.5px]',
}

const variants = {
  // On light backgrounds — track is ink at low opacity, active sector is ink
  default: 'border-ink/10 border-t-ink/70',
  // On dark backgrounds — track is paper at low opacity, active sector is paper
  light: 'border-paper/20 border-t-paper/80',
}

export function Spinner({ className, size = 'md', variant = 'default' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'rounded-full animate-spin shrink-0',
        sizes[size],
        variants[variant],
        className
      )}
    />
  )
}

// ─── Full-page loading state ──────────────────────────────────
// Used in StudyView and any page-level suspense.
export function PageSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-24 animate-fade-in">
      {/* Layered spinner: outer ring + inner pulse for visual richness */}
      <div className="relative">
        <Spinner size="lg" variant="default" />
        <div className="absolute inset-0 rounded-full bg-accent/8 animate-ping" />
      </div>
      <span className="text-[11px] text-mist/40 font-mono uppercase tracking-[0.2em]">
        Loading…
      </span>
    </div>
  )
}

// ─── Inline card-level loading state ─────────────────────────
// Use inside cards or panels where space is constrained.
export function InlineSpinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2.5 text-mist/50">
      <Spinner size="sm" variant="default" />
      <span className="text-xs font-mono">{label}</span>
    </div>
  )
}