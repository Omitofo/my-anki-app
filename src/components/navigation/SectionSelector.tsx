'use client'

// src/components/navigation/SectionSelector.tsx

import { useSections } from '@/hooks/useNavData'
import { useStudyStore } from '@/store/studyStore'
import { GridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Section } from '@/types'

// For language sections we keep the flag emoji from the DB icon field.
// For non-language sections (history sub-sections, etc.) we use minimal SVG icons.
const SECTION_SVG_ICONS: Record<string, React.ReactNode> = {
  // History sections
  'ancient-world': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  'medieval': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 21V7a2 2 0 0 1 2-2h3V3h8v2h3a2 2 0 0 1 2 2v14"/>
      <path d="M9 21v-6h6v6"/>
      <path d="M3 10h18"/>
    </svg>
  ),
  'modern': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 2v20M2 12h20"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  'important-figures': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  // Books sections
  'fiction': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  'non-fiction': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  'philosophy-books': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  // Default fallback
  'default': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
}

/** If the section has a flag emoji (language sections), render it. Otherwise SVG. */
function SectionIcon({ section }: { section: Section }) {
  const isFlagEmoji = section.icon && /\p{Emoji_Presentation}/u.test(section.icon)

  if (isFlagEmoji) {
    return (
      <span className="text-3xl block mb-3 leading-none">{section.icon}</span>
    )
  }

  const svgIcon = SECTION_SVG_ICONS[section.slug.toLowerCase()] ?? SECTION_SVG_ICONS.default

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