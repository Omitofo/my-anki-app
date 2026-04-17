'use client'

import { useDomains } from '@/hooks/useNavData'
import { useStudyStore } from '@/store/studyStore'
import { GridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Domain } from '@/types'

export function DomainSelector() {
  const { data: domains, isLoading } = useDomains()
  const setDomain = useStudyStore((s) => s.setDomain)

  if (isLoading) return <GridSkeleton count={3} />

  if (!domains?.length) {
    return (
      <EmptyState
        icon="🌐"
        title="No domains yet"
        description="Add your first domain in Supabase to get started."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {domains.map((domain: Domain, i: number) => (
        <button
          key={domain.id}
          onClick={() => setDomain(domain)}
          className="group relative bg-paper-card rounded-2xl p-6 text-left border border-mist/10 hover:border-accent/30 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 animate-slide-up"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center text-paper text-lg mb-4 group-hover:bg-accent transition-colors duration-200">
            🌐
          </div>
          <h3 className="font-display text-lg text-ink mb-1">{domain.name}</h3>
          <p className="text-xs text-mist font-mono uppercase tracking-widest">
            {domain.slug}
          </p>
          <div className="absolute bottom-5 right-5 text-mist/30 group-hover:text-accent/50 transition-colors duration-200 text-xl">
            →
          </div>
        </button>
      ))}
    </div>
  )
}