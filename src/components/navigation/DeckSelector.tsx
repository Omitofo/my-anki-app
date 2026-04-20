'use client'

// src/components/navigation/DeckSelector.tsx

import { useDecks } from '@/hooks/useNavData'
import { useStudyStore } from '@/store/studyStore'
import { GridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import type { Deck } from '@/types'

// Minimalist SVG icon for flashcard deck
function FlashcardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  )
}

// Minimalist SVG icon for quiz deck
function QuizIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  )
}

export function DeckSelector() {
  const category = useStudyStore((s) => s.nav.category)
  const setDeck = useStudyStore((s) => s.setDeck)
  const { data: decks, isLoading } = useDecks(category?.id ?? null)

  if (isLoading) return <GridSkeleton count={3} />

  if (!decks?.length) {
    return (
      <EmptyState
        icon="📦"
        title="No decks yet"
        description="Add decks under this category in Supabase."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {decks.map((deck: Deck, i: number) => (
        <button
          key={deck.id}
          onClick={() => setDeck(deck)}
          className="group bg-paper-card rounded-2xl p-5 text-left border border-mist/10 hover:border-accent/30 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 animate-slide-up"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          {/* Stacked card visual with SVG icon */}
          <div className="relative mb-4 h-10">
            <div className="absolute inset-0 bg-paper-warm rounded-xl rotate-2 border border-mist/20" />
            <div className="absolute inset-0 bg-paper-warm rounded-xl -rotate-1 border border-mist/20" />
            <div className="absolute inset-0 bg-paper-card rounded-xl border border-mist/20 flex items-center justify-center text-ink-muted group-hover:text-accent transition-colors duration-200">
              {deck.deck_type === 'quiz' ? <QuizIcon /> : <FlashcardIcon />}
            </div>
          </div>

          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-display text-base text-ink group-hover:text-accent transition-colors duration-200 leading-snug">
              {deck.name}
            </h3>
            <Badge variant={deck.deck_type === 'quiz' ? 'accent' : 'mist'} className="shrink-0 mt-0.5">
              {deck.deck_type === 'quiz' ? 'Quiz' : 'Cards'}
            </Badge>
          </div>

          {deck.description && (
            <p className="text-xs text-mist line-clamp-2 leading-relaxed">{deck.description}</p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-mist/60 font-mono uppercase tracking-widest">
              {deck.deck_type === 'quiz' ? 'Take quiz' : 'Study cards'}
            </span>
            <span className="text-accent/40 group-hover:text-accent transition-colors duration-200">→</span>
          </div>
        </button>
      ))}
    </div>
  )
}