'use client'

// src/components/study/StudyControls.tsx

import { useStudyStore } from '@/store/studyStore'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { cn } from '@/lib/utils'

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
  const history      = useStudyStore((s) => s.history)
  const prevCard     = useStudyStore((s) => s.prevCard)
  const nextCard     = useStudyStore((s) => s.nextCard)
  const resetSession = useStudyStore((s) => s.resetSession)

  const canGoPrev = historyIndex > 0
  const canGoNext = !(historyIndex === history.length - 1 && seenCount >= totalCards)

  const prevDisabled = !canGoPrev || isTransitioning
  const nextDisabled = !canGoNext || isTransitioning

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
        <button
          onClick={prevCard}
          disabled={prevDisabled}
          aria-label="Previous card"
          className={cn(
            'min-w-[84px] px-4 py-2 rounded-xl text-sm font-body font-medium border transition-all duration-200',
            prevDisabled
              ? 'border-mist/10 bg-paper/40 text-mist/25 cursor-not-allowed opacity-50'
              : 'border-mist/30 bg-paper-card text-ink hover:border-mist hover:bg-paper-warm active:scale-[0.97] cursor-pointer'
          )}
        >
          ← Prev
        </button>

        <button
          onClick={nextCard}
          disabled={nextDisabled}
          aria-label="Next card"
          className={cn(
            'min-w-[84px] px-4 py-2 rounded-xl text-sm font-body font-medium transition-all duration-200',
            nextDisabled
              ? 'bg-ink/15 text-paper/30 cursor-not-allowed opacity-50'
              : 'bg-ink text-paper hover:bg-ink-soft active:scale-[0.97] shadow-sm hover:shadow-md cursor-pointer'
          )}
        >
          Next →
        </button>

        <button
          onClick={resetSession}
          aria-label="Restart session"
          title="Restart from beginning"
          className="px-3 py-2 rounded-xl text-sm font-body font-medium text-mist hover:text-ink hover:bg-paper-warm active:scale-[0.97] transition-all duration-200 cursor-pointer"
        >
          ↺
        </button>
      </div>

      {sessionCount > 0 && (
        <p className="text-center text-xs text-mist/50 font-mono">
          {sessionCount} card{sessionCount !== 1 ? 's' : ''} reviewed this session
        </p>
      )}
    </div>
  )
}