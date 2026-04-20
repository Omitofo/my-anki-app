'use client'

// src/components/navigation/DomainSelector.tsx

import { useDomains } from '@/hooks/useNavData'
import { useStudyStore } from '@/store/studyStore'
import { GridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Domain } from '@/types'

// Minimalist line-art SVG icons per domain slug
const DOMAIN_ICONS: Record<string, React.ReactNode> = {
  languages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M12 7v5l4 2"/>
    </svg>
  ),
  science: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2m-6 0h6m0 0V3"/>
      <circle cx="12" cy="17" r="1"/>
    </svg>
  ),
  economics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  books: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  mathematics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  philosophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  ),
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
}

function getDomainIcon(slug: string) {
  return DOMAIN_ICONS[slug.toLowerCase()] ?? DOMAIN_ICONS.default
}

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
          <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center text-paper mb-4 group-hover:bg-accent transition-colors duration-200">
            {getDomainIcon(domain.slug)}
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