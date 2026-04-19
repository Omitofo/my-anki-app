'use client'

// src/components/study/FlashCard.tsx

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
      role="button"
      aria-label={isFlipped ? 'Card back — tap to see front' : 'Card front — tap to reveal'}
    >
      {/* Smaller fixed height */}
      <div className="relative w-full h-[240px] sm:h-[300px]">
        <div className={`card-inner w-full h-full ${isFlipped ? 'flipped' : ''}`}>

          {/* ── FRONT ── */}
          <div className="card-face">
            <div className="h-full bg-paper-card border border-mist/10 rounded-2xl shadow-lg overflow-hidden noise-overlay flex flex-col">
              <div className="h-0.5 bg-gradient-to-r from-accent via-accent-light to-amber-400" />

              <div className="flex-1 flex flex-col items-center justify-center px-6 py-5 gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-mist/50">
                  Front
                </span>
                <p className="font-display text-2xl sm:text-3xl text-ink text-center leading-snug">
                  {card.front}
                </p>
                {card.translation && (
                  <p className="text-xs text-mist italic text-center">{card.translation}</p>
                )}
              </div>

              <div className="flex items-center justify-between px-5 pb-4">
                <Badge
                  variant={card.difficulty <= 2 ? 'sage' : card.difficulty >= 4 ? 'accent' : 'mist'}
                >
                  {formatDifficulty(card.difficulty)}
                </Badge>
                <span className="text-[10px] text-mist/40 italic">tap to reveal</span>
              </div>
            </div>
          </div>

          {/* ── BACK ── */}
          <div className="card-face card-back-face">
            <div className="h-full bg-ink border border-ink-soft rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <div className="h-0.5 bg-gradient-to-r from-sage via-sage-light to-emerald-400" />

              <div className="flex-1 flex flex-col items-center justify-center px-6 py-5 gap-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-mist/40">
                  Back
                </span>
                <p className="font-display text-2xl sm:text-3xl text-paper text-center leading-snug">
                  {card.back}
                </p>

                {card.example && (
                  <div className="mt-2 bg-ink-soft rounded-xl px-4 py-2.5 max-w-xs w-full">
                    <p className="text-[10px] text-mist/60 uppercase tracking-widest mb-1 font-mono text-center">
                      Example
                    </p>
                    <p className="text-xs text-mist text-center">{card.example}</p>
                    {card.example_translation && (
                      <p className="text-[10px] text-mist/50 italic text-center mt-1">
                        {card.example_translation}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {card.notes && (
                <div className="px-5 pb-4">
                  <p className="text-[10px] text-mist/40 italic text-center">💡 {card.notes}</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}