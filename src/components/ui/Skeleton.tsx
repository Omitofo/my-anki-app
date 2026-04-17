import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-gradient-to-r from-paper-warm via-paper to-paper-warm bg-[length:200%_100%] animate-shimmer',
        className
      )}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Skeleton className="h-72 w-full rounded-3xl mb-6" />
      <div className="flex justify-center gap-4">
        <Skeleton className="h-12 w-32 rounded-xl" />
        <Skeleton className="h-12 w-32 rounded-xl" />
      </div>
    </div>
  )
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-2xl" />
      ))}
    </div>
  )
}