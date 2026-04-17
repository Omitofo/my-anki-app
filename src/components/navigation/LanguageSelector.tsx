'use client'

import { useLanguages } from '@/hooks/useNavData'
import { useStudyStore } from '@/store/studyStore'
import { GridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { getLanguageFlag } from '@/lib/utils'
import type { Language } from '@/types'

export function LanguageSelector() {
  const domain = useStudyStore((s) => s.nav.domain)
  const setLanguage = useStudyStore((s) => s.setLanguage)
  const { data: languages, isLoading } = useLanguages(domain?.id ?? null)

  if (isLoading) return <GridSkeleton count={4} />

  if (!languages?.length) {
    return (
      <EmptyState
        icon="🗣️"
        title="No languages yet"
        description="Add languages under this domain in Supabase."
      />
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {languages.map((lang: Language, i: number) => {
        const flag = lang.flag ?? getLanguageFlag(lang.slug)
        return (
          <button
            key={lang.id}
            onClick={() => setLanguage(lang)}
            className="group bg-paper-card rounded-2xl p-5 text-center border border-mist/10 hover:border-accent/30 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="text-4xl block mb-3">{flag}</span>
            <h3 className="font-display text-base text-ink group-hover:text-accent transition-colors duration-200">
              {lang.name}
            </h3>
          </button>
        )
      })}
    </div>
  )
}