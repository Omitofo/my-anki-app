// src/components/navigation/SectionSelector.tsx
'use client'

import { useSections } from '@/hooks/useNavData'
import { useStudyStore } from '@/store/studyStore'
import { GridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Section } from '@/types'

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
          className="group bg-paper-card rounded-2xl p-5 text-center border border-mist/10 hover:border-accent/30 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 animate-slide-up"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <span className="text-4xl block mb-3">{section.icon ?? '📂'}</span>
          <h3 className="font-display text-base text-ink group-hover:text-accent transition-colors duration-200">
            {section.name}
          </h3>
        </button>
      ))}
    </div>
  )
}