
// src/components/ui/Skeleton.tsx
// Uses CSS variables from globals.css so shimmer works on both light and dark backgrounds.
'use client'

import * as React from "react"
import { cn } from '@/lib/utils'

// ─── Componente Base Skeleton ─────────────────────────────────────────
// Usamos forwardRef y extendemos de HTMLAttributes para que sea 
// compatible con cualquier propiedad de un div (style, onClick, etc.)
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        // Base: warm paper tone
        'rounded-lg',
        // Shimmer: gradient sweeps left→right
        'bg-gradient-to-r from-paper-warm via-paper-card to-paper-warm',
        'bg-[length:200%_100%]',
        'animate-shimmer',
        className
      )}
      {...props}
    />
  )
})
Skeleton.displayName = "Skeleton"

export { Skeleton }

// ─── Card skeleton — usado mientras carga el flashcard/quiz ───────────
export function CardSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 animate-fade-in">
      <Skeleton className="h-[240px] sm:h-[300px] w-full rounded-2xl" />
      <Skeleton className="h-2 w-full rounded-full" />
      <div className="flex justify-center gap-3">
        <Skeleton className="h-10 w-28 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  )
}

// ─── Grid skeleton — para Domain / Section / Category / Decks ────────
export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      aria-busy="true"
      aria-label="Loading content"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-28 rounded-2xl"
          // Ahora 'style' funciona perfectamente gracias a HTMLAttributes
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  )
}

// ─── List skeleton — para decks/categories con grid de 2 columnas ────
export function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-24 rounded-2xl"
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  )
}
