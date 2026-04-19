// src/components/navigation/CategorySelector.tsx
'use client'

import { useCategories } from '@/hooks/useNavData'
import { useStudyStore } from '@/store/studyStore'
import { GridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Category } from '@/types'

const CATEGORY_ICONS: Record<string, string> = {
  vocabulary:    '📖',
  grammar:       '✏️',
  phrases:       '💬',
  scenarios:     '🎭',
  kanji:         '字',
  hiragana:      'あ',
  katakana:      'ア',
  numbers:       '🔢',
  'key-events':  '📅',
  people:        '👤',
  economics:     '📊',
  fundamentals:  '🔑',
  formulas:      '🧮',
  default:       '📚',
}

export function CategorySelector() {
  const section = useStudyStore((s) => s.nav.section)
  const setCategory = useStudyStore((s) => s.setCategory)
  const { data: categories, isLoading } = useCategories(section?.id ?? null)

  if (isLoading) return <GridSkeleton count={4} />

  if (!categories?.length) {
    return (
      <EmptyState
        icon="📂"
        title="No categories yet"
        description="Add categories under this section in Supabase."
      />
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((cat: Category, i: number) => {
        const icon = CATEGORY_ICONS[cat.slug.toLowerCase()] ?? CATEGORY_ICONS.default
        return (
          <button
            key={cat.id}
            onClick={() => setCategory(cat)}
            className="group bg-paper-card rounded-2xl p-5 text-left border border-mist/10 hover:border-sage/40 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 animate-slide-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="text-3xl block mb-3 font-display">{icon}</span>
            <h3 className="font-body font-medium text-sm text-ink capitalize group-hover:text-sage transition-colors duration-200">
              {cat.name}
            </h3>
          </button>
        )
      })}
    </div>
  )
}