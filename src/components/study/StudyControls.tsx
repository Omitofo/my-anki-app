'use client'

// src/components/study/StudyControls.tsx

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
  const historyIndex = useStudyStore((s) => s.historyIndex)
  const prevCard     = useStudyStore((s) => s.prevCard)
  const nextCard     = useStudyStore((s) => s.nextCard)
  const resetSession = useStudyStore((s) => s.resetSession)

  const canGoPrev = historyIndex > 0

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <ProgressBar value={progress} showLabel className="flex-1" />
        <span className="text-xs text-mist font-mono whitespace-nowrap tabular-nums">
          {seenCount} / {totalCards}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={prevCard}
          disabled={!canGoPrev || isTransitioning}
          className="min-w-[84px]"
          aria-label="Previous card"
        >
          ← Prev
        </Button>

        <Button
          variant="primary"
          size="sm"
          onClick={nextCard}
          disabled={isTransitioning}
          className="min-w-[84px]"
          aria-label="Next card"
        >
          Next →
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={resetSession}
          aria-label="Restart session"
          title="Restart from beginning"
          className="px-2.5"
        >
          ↺
        </Button>
      </div>

      {sessionCount > 0 && (
        <p className="text-center text-xs text-mist/50 font-mono">
          {sessionCount} card{sessionCount !== 1 ? 's' : ''} reviewed this session
        </p>
      )}
    </div>
  )
}