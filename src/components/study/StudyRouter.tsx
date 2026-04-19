'use client'

// src/components/study/StudyRouter.tsx

import { useStudyStore } from '@/store/studyStore'
import { FlashCard } from '@/components/study/FlashCard'
import { QuizCard } from '@/components/study/QuizCard'
import { StudyControls } from '@/components/study/StudyControls'
import { KeyboardHint } from '@/components/study/KeyboardHint'
import type { CardWithOptions, DeckType } from '@/types'

interface StudyRouterProps {
  deckType: DeckType
  totalCards: number
  seenCount: number
  sessionCount: number
  progress: number
  isTransitioning: boolean
}

export function StudyRouter({
  deckType,
  totalCards,
  seenCount,
  sessionCount,
  progress,
  isTransitioning,
}: StudyRouterProps) {
  const currentCard   = useStudyStore((s) => s.currentCard)
  const historyIndex  = useStudyStore((s) => s.historyIndex)
  const nextCard      = useStudyStore((s) => s.nextCard)
  const prevCard      = useStudyStore((s) => s.prevCard)

  if (!currentCard) return null

  // ── Quiz ────────────────────────────────────────────────────
  if (deckType === 'quiz') {
    // currentCard is CardWithOptions when deck is quiz type
    return (
      <QuizCard
        card={currentCard as CardWithOptions}
        onNext={nextCard}
        onPrev={prevCard}
        canGoPrev={historyIndex > 0}
        isTransitioning={isTransitioning}
        sessionCount={sessionCount}
        seenCount={seenCount}
        totalCards={totalCards}
        progress={progress}
      />
    )
  }

  // ── Flashcard (default) ─────────────────────────────────────
  return (
    <>
      <FlashCard card={currentCard} />
      <StudyControls
        totalCards={totalCards}
        seenCount={seenCount}
        sessionCount={sessionCount}
        progress={progress}
        isTransitioning={isTransitioning}
      />
      <KeyboardHint />
    </>
  )
}