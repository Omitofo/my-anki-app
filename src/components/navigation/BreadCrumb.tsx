'use client'

import { useStudyStore } from '@/store/studyStore'
import { cn } from '@/lib/utils'

export function Breadcrumb() {
  const { nav, resetNav } = useStudyStore()

  const crumbs = [
    { label: 'Home', active: nav.level === 'domain', onClick: resetNav },
    nav.domain && {
      label: nav.domain.name,
      active: nav.level === 'language',
      onClick: () => useStudyStore.getState().setDomain(nav.domain!),
    },
    nav.language && {
      label: nav.language.flag
        ? `${nav.language.flag} ${nav.language.name}`
        : nav.language.name,
      active: nav.level === 'category',
      onClick: () => useStudyStore.getState().setLanguage(nav.language!),
    },
    nav.category && {
      label: nav.category.name,
      active: nav.level === 'deck',
      onClick: () => useStudyStore.getState().setCategory(nav.category!),
    },
    nav.deck && {
      label: nav.deck.name,
      active: nav.level === 'study',
      onClick: () => {},
    },
  ].filter(Boolean) as { label: string; active: boolean; onClick: () => void }[]

  if (crumbs.length <= 1) return null

  // On mobile: show only last 2 crumbs with a leading ellipsis if deeper
  // On desktop: show all
  const visibleCrumbs = crumbs
  const mobileStart = Math.max(0, crumbs.length - 2)
  const mobileCrumbs = crumbs.slice(mobileStart)
  const hasHidden = mobileStart > 0

  return (
    <nav aria-label="Breadcrumb" className="flex items-center min-w-0 max-w-full">
      {/* Desktop: full breadcrumb */}
      <ol className="hidden sm:flex items-center gap-1.5 flex-wrap">
        {visibleCrumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-mist/50 text-xs select-none">›</span>}
            <button
              onClick={crumb.active ? undefined : crumb.onClick}
              className={cn(
                'text-sm transition-colors duration-150 font-body whitespace-nowrap',
                crumb.active
                  ? 'text-ink font-medium pointer-events-none'
                  : 'text-mist hover:text-accent'
              )}
            >
              {crumb.label}
            </button>
          </li>
        ))}
      </ol>

      {/* Mobile: truncated — show ellipsis + last 2 */}
      <ol className="flex sm:hidden items-center gap-1 min-w-0 max-w-full">
        {hasHidden && (
          <li className="flex items-center gap-1 shrink-0">
            <span className="text-mist/50 text-xs">…</span>
            <span className="text-mist/50 text-xs">›</span>
          </li>
        )}
        {mobileCrumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1 min-w-0">
            {(i > 0 || hasHidden) && i > 0 && (
              <span className="text-mist/50 text-xs shrink-0">›</span>
            )}
            <button
              onClick={crumb.active ? undefined : crumb.onClick}
              className={cn(
                'text-xs transition-colors duration-150 font-body truncate max-w-[80px]',
                crumb.active
                  ? 'text-ink font-medium pointer-events-none'
                  : 'text-mist hover:text-accent'
              )}
            >
              {crumb.label}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}