'use client'

import { useStudyStore } from '@/store/studyStore'
import { cn } from '@/lib/utils'

export function Breadcrumb() {
  const { nav, goBack, resetNav } = useStudyStore()

  const crumbs = [
    { label: 'Home', active: nav.level === 'domain', onClick: resetNav },
    nav.domain && { label: nav.domain.name, active: nav.level === 'language', onClick: () => useStudyStore.getState().setDomain(nav.domain!) },
    nav.language && { label: nav.language.flag ? `${nav.language.flag} ${nav.language.name}` : nav.language.name, active: nav.level === 'category', onClick: () => useStudyStore.getState().setLanguage(nav.language!) },
    nav.category && { label: nav.category.name, active: nav.level === 'deck', onClick: () => useStudyStore.getState().setCategory(nav.category!) },
    nav.deck && { label: nav.deck.name, active: nav.level === 'study', onClick: () => {} },
  ].filter(Boolean) as { label: string; active: boolean; onClick: () => void }[]

  if (crumbs.length <= 1) return null

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-mist/50 text-xs">›</span>}
          <button
            onClick={crumb.active ? undefined : crumb.onClick}
            className={cn(
              'text-sm transition-colors duration-150 font-body',
              crumb.active
                ? 'text-ink font-medium pointer-events-none'
                : 'text-mist hover:text-accent'
            )}
          >
            {crumb.label}
          </button>
        </span>
      ))}
    </nav>
  )
}