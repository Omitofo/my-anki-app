'use client'

import { useStudyStore } from '@/store/studyStore'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface StudyControlsProps {
  totalCards: number
  seenCount: number
  sessionCount: number
  progress: number
  isTransitioning: boolean
}

export function StudyControls({
  totalCards,
  seenCount,
  sessionCount,
  progress,
  isTransitioning,
}: StudyControlsProps) {
  const { isFlipped, flipCard, nextCard, resetSession } = useStudyStore()

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Progress */}
      <div className="flex items-center gap-4">
        <ProgressBar value={progress} showLabel className="flex-1" />
        <span className="text-xs text-mist font-mono whitespace-nowrap tabular-nums">
          {seenCount} / {totalCards}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Button
          variant="secondary"
          size="md"
          onClick={flipCard}
          className="min-w-[120px]"
          aria-label="Flip card"
        >
          <span>{isFlipped ? '👁️ Front' : '👁️ Reveal'}</span>
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={nextCard}
          disabled={isTransitioning}
          className="min-w-[120px]"
          aria-label="Next card"
        >
          Next →
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={resetSession}
          aria-label="Reset session"
          title="Reset session"
        >
          ↺
        </Button>
      </div>

      {/* Session counter */}
      {sessionCount > 0 && (
        <p className="text-center text-xs text-mist/50 font-mono">
          {sessionCount} card{sessionCount !== 1 ? 's' : ''} reviewed this session
        </p>
      )}
    </div>
  )
}