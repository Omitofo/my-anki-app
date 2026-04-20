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
  deckType, totalCards, seenCount,
  sessionCount, progress, isTransitioning,
}: StudyRouterProps) {
  const currentCard  = useStudyStore((s) => s.currentCard)
  const historyIndex = useStudyStore((s) => s.historyIndex)
  const history      = useStudyStore((s) => s.history)
  const nextCard     = useStudyStore((s) => s.nextCard)
  const prevCard     = useStudyStore((s) => s.prevCard)

  if (!currentCard) return null

  const canGoPrev  = historyIndex > 0
  // Last card: at end of history AND have seen every card at least once
  const isLastCard = historyIndex === history.length - 1 && seenCount >= totalCards

  if (deckType === 'quiz') {
    return (
      <QuizCard
        card={currentCard as CardWithOptions}
        onNext={nextCard}
        onPrev={prevCard}
        canGoPrev={canGoPrev}
        isLastCard={isLastCard}
        isTransitioning={isTransitioning}
        sessionCount={sessionCount}
        seenCount={seenCount}
        totalCards={totalCards}
        progress={progress}
      />
    )
  }

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