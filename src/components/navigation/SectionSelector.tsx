'use client'

// src/components/navigation/SectionSelector.tsx

import { useSections } from '@/hooks/useNavData'
import { useStudyStore } from '@/store/studyStore'
import { GridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Section } from '@/types'

// ─── SVG icon library ────────────────────────────────────────
// Each key maps to a section slug (lowercased).
// Language sections keep their flag emoji from the DB — detected below.
const SECTION_SVG_ICONS: Record<string, React.ReactNode> = {

  // ── Economics ──────────────────────────────────────────────
  macroeconomics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
      <circle cx="19" cy="9" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  microeconomics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
    </svg>
  ),
  markets: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M2 20h20M5 20V8l7-6 7 6v12"/>
      <path d="M9 20v-5h6v5"/>
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v2m0 8v2m-4-6h8M9.5 9.5C10 8.5 11 8 12 8c1.5 0 2.5 1 2.5 2.5 0 2-2.5 3-2.5 5"/>
    </svg>
  ),

  // ── History ────────────────────────────────────────────────
  'world-war': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'world-wars': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'ancient-world': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 21h18M3 18h18M5 18V9l7-6 7 6v9"/>
      <rect x="9" y="13" width="6" height="5" rx="0.5"/>
    </svg>
  ),
  'ancient': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 21h18M3 18h18M5 18V9l7-6 7 6v9"/>
      <rect x="9" y="13" width="6" height="5" rx="0.5"/>
    </svg>
  ),
  'medieval': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 21V7a2 2 0 0 1 2-2h3V3h8v2h3a2 2 0 0 1 2 2v14"/>
      <path d="M9 21v-6h6v6M3 10h18"/>
    </svg>
  ),
  'modern': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 3H8M12 3v4"/>
    </svg>
  ),
  'important-figures': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  'revolutions': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
      <path d="M16 16h5v5"/>
    </svg>
  ),

  // ── Books ──────────────────────────────────────────────────
  'philosophy': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  'classic-fiction': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  'fiction': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  'non-fiction': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  ),
  'science': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M6 2v6l-2 4h16l-2-4V2M6 2h12"/>
      <path d="M5 14c0 3.87 3.13 7 7 7s7-3.13 7-7"/>
    </svg>
  ),
  'biography': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  'history-biography': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  'science-ideas': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  ),
  'self-help': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
      <path d="M12 8v4l3 3"/>
    </svg>
  ),

  // ── Generic fallback ──────────────────────────────────────
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
}

/** Returns true when the icon field is a flag or emoji (language sections). */
function isFlagOrEmoji(icon?: string): boolean {
  if (!icon) return false
  // Matches emoji presentation characters — flags, symbols, etc.
  return /\p{Emoji_Presentation}|\p{Extended_Pictographic}/u.test(icon)
}

function SectionIcon({ section }: { section: Section }) {
  // Language sections: keep the DB flag emoji
  if (isFlagOrEmoji(section.icon)) {
    return (
      <span className="text-3xl block mb-3 leading-none" aria-hidden>
        {section.icon}
      </span>
    )
  }

  // All other sections: use SVG, keyed by slug
  const svgIcon =
    SECTION_SVG_ICONS[section.slug.toLowerCase()] ?? SECTION_SVG_ICONS.default

  return (
    <div className="w-10 h-10 rounded-xl bg-ink/5 border border-mist/15 flex items-center justify-center text-ink-muted mb-3 group-hover:bg-accent/10 group-hover:border-accent/20 group-hover:text-accent transition-all duration-200">
      {svgIcon}
    </div>
  )
}

export function SectionSelector() {
  const domain = useStudyStore((s) => s.nav.domain)
  const setSection = useStudyStore((s) => s.setSection)
  const { data: sections, isLoading } = useSections(domain?.id ?? null)

  if (isLoading) return <GridSkeleton count={4} />

  if (!sections?.length) {
    return (
      <EmptyState
        icon="🗂️"
        title="No sections yet"
        description="Add sections under this domain in Supabase."
      />
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {sections.map((section: Section, i: number) => (
        <button
          key={section.id}
          onClick={() => setSection(section)}
          className="group bg-paper-card rounded-2xl p-5 text-center border border-mist/10 hover:border-accent/30 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 animate-slide-up flex flex-col items-center"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <SectionIcon section={section} />
          <h3 className="font-display text-base text-ink group-hover:text-accent transition-colors duration-200">
            {section.name}
          </h3>
        </button>
      ))}
    </div>
  )
}