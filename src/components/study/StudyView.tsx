'use client'

// src/components/study/StudyView.tsx

import { useStudyStore } from '@/store/studyStore'
import { useStudySession } from '@/hooks/useStudySession'
import { StudyRouter } from '@/components/study/StudyRouter'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'

export function StudyView() {
  const deck   = useStudyStore((s) => s.nav.deck)
  const goBack = useStudyStore((s) => s.goBack)

  const deckType = deck?.deck_type ?? 'flashcard'

  const {
    currentCard,
    isTransitioning,
    sessionCount,
    totalCards,
    seenCount,
    progress,
    isLoading,
    isError,
  } = useStudySession(deck?.id ?? null, deckType)

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-fade-in">
        <CardSkeleton />
      </div>
    )
  }

  if (isError) {
    return (
      <EmptyState
        icon="⚠️"
        title="Couldn't load cards"
        description="There was a problem fetching cards. Check your connection and try again."
      />
    )
  }

  if (!currentCard) {
    return (
      <EmptyState
        icon="📭"
        title="No cards in this deck"
        description="Add some cards to this deck in Supabase to start studying."
      >
        <Button variant="secondary" size="sm" onClick={goBack} className="mt-2">
          ← Back to decks
        </Button>
      </EmptyState>
    )
  }

  return (
    <div
      className="w-full max-w-2xl mx-auto flex flex-col gap-5"
      style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.15s ease' }}
    >
      <StudyRouter
        deckType={deckType}
        totalCards={totalCards}
        seenCount={seenCount}
        sessionCount={sessionCount}
        progress={progress}
        isTransitioning={isTransitioning}
      />
    </div>
  )
}