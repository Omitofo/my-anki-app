'use client'

import { useStudyStore } from '@/store/studyStore'
import { Badge } from '@/components/ui/Badge'
import { formatDifficulty } from '@/lib/utils'
import type { Card } from '@/types'

interface FlashCardProps {
  card: Card
}

export function FlashCard({ card }: FlashCardProps) {
  const isFlipped = useStudyStore((s) => s.isFlipped)
  const flipCard = useStudyStore((s) => s.flipCard)

  return (
    <div
      className="perspective w-full cursor-pointer select-none"
      onClick={flipCard}
      // tabIndex removed — keyboard handling is done globally in KeyboardHint
      // This prevents the card from stealing focus and causing the space-key glitch
      role="button"
      aria-label={isFlipped ? 'Card back — click to see front' : 'Card front — click to reveal'}
    >
      {/* FIXED HEIGHT WRAPPER */}
      <div className="relative w-full h-[320px] sm:h-[400px]">

        {/* INNER FLIP CONTAINER */}
        <div className={`card-inner w-full h-full ${isFlipped ? 'flipped' : ''}`}>

          {/* ───────── FRONT ───────── */}
          <div className="card-face">
            <div className="h-full bg-paper-card border border-mist/10 rounded-3xl shadow-xl overflow-hidden noise-overlay flex flex-col">

              {/* Accent */}
              <div className="h-1 bg-gradient-to-r from-accent via-accent-light to-amber-400" />

              <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 gap-4">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-mist/60">
                  Front
                </span>

                <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink text-center leading-tight">
                  {card.front}
                </p>

                {card.translation && (
                  <p className="text-sm text-mist italic text-center">
                    {card.translation}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between px-6 pb-5">
                <Badge
                  variant={
                    card.difficulty <= 2
                      ? 'sage'
                      : card.difficulty >= 4
                      ? 'accent'
                      : 'mist'
                  }
                >
                  {formatDifficulty(card.difficulty)}
                </Badge>

                <span className="text-xs text-mist/40 italic">
                  tap to reveal
                </span>
              </div>

            </div>
          </div>

          {/* ───────── BACK ───────── */}
          <div className="card-face card-back-face">
            <div className="h-full bg-ink border border-ink-soft rounded-3xl shadow-xl overflow-hidden flex flex-col">

              {/* Accent */}
              <div className="h-1 bg-gradient-to-r from-sage via-sage-light to-emerald-400" />

              <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 gap-4">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-mist/40">
                  Back
                </span>

                <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-paper text-center leading-tight">
                  {card.back}
                </p>

                {card.example && (
                  <div className="mt-4 bg-ink-soft rounded-2xl px-5 py-3 max-w-sm w-full">
                    <p className="text-xs text-mist/60 uppercase tracking-widest mb-1 font-mono text-center">
                      Example
                    </p>
                    <p className="text-sm text-mist text-center">
                      {card.example}
                    </p>
                    {card.example_translation && (
                      <p className="text-xs text-mist/50 italic text-center mt-1">
                        {card.example_translation}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {card.notes && (
                <div className="px-6 pb-5">
                  <p className="text-xs text-mist/40 italic text-center">
                    💡 {card.notes}
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}