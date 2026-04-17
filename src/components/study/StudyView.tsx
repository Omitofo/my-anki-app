'use client'

import { useStudyStore } from '@/store/studyStore'
import { useStudySession } from '@/hooks/useStudySession'
import { FlashCard } from '@/components/study/FlashCard'
import { StudyControls } from '@/components/study/StudyControls'
import { KeyboardHint } from '@/components/study/KeyboardHint'
import { CardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'

export function StudyView() {
  const deck = useStudyStore((s) => s.nav.deck)
  const goBack = useStudyStore((s) => s.goBack)

  const {
    currentCard,
    isFlipped,
    isTransitioning,
    sessionCount,
    totalCards,
    seenCount,
    progress,
    isLoading,
    isError,
  } = useStudySession(deck?.id ?? null)

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
      className="w-full max-w-2xl mx-auto flex flex-col gap-6"
      style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.15s ease' }}
    >
      <FlashCard card={currentCard} />

      <StudyControls
        totalCards={totalCards}
        seenCount={seenCount}
        sessionCount={sessionCount}
        progress={progress}
        isTransitioning={isTransitioning}
      />

      <KeyboardHint />
    </div>
  )
}