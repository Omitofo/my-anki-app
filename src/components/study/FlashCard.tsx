'use client'

// src/components/study/FlashCard.tsx
//
// Design principles applied:
// ─ Card height is fluid: min-height anchors the "card feel", flex
//   allows it to grow for longer content. No content ever clips.
// ─ Typography scales with content length: long text → smaller size.
//   Uses a helper to pick the right Tailwind class.
// ─ Whitespace is generous and consistent via padding scale.
// ─ Front/Back label always anchored to top.
// ─ Content centred in remaining space with min vertical padding.

import { useStudyStore } from '@/store/studyStore'
import { Badge } from '@/components/ui/Badge'
import { formatDifficulty } from '@/lib/utils'
import type { Card } from '@/types'

interface FlashCardProps {
  card: Card
}

/**
 * Returns a Tailwind font-size class based on string length.
 * Thresholds tuned for 280 px card width (max-w-2xl on mobile).
 */
function frontFontSize(text: string): string {
  const len = text.length
  if (len <= 12)  return 'text-3xl sm:text-4xl'
  if (len <= 30)  return 'text-2xl sm:text-3xl'
  if (len <= 60)  return 'text-xl sm:text-2xl'
  if (len <= 120) return 'text-lg sm:text-xl'
  return 'text-base sm:text-lg'
}

function backFontSize(text: string): string {
  const len = text.length
  if (len <= 20)  return 'text-2xl sm:text-3xl'
  if (len <= 60)  return 'text-xl sm:text-2xl'
  if (len <= 120) return 'text-lg sm:text-xl'
  if (len <= 220) return 'text-base sm:text-lg'
  return 'text-sm sm:text-base'
}

export function FlashCard({ card }: FlashCardProps) {
  const isFlipped = useStudyStore((s) => s.isFlipped)
  const flipCard  = useStudyStore((s) => s.flipCard)

  return (
    /*
     * perspective wrapper — gives the 3-D flip depth.
     * cursor-pointer signals interactivity; select-none prevents
     * accidental text selection on fast taps.
     */
    <div
      className="perspective w-full cursor-pointer select-none"
      onClick={flipCard}
      role="button"
      aria-label={isFlipped ? 'Card back — tap to see front' : 'Card front — tap to reveal'}
    >
      {/*
       * Fluid height container:
       *   min-h-[220px]  → preserves "card feel" for very short content
       *   sm:min-h-[260px] → slightly taller on wider screens
       * The card faces use h-full so they fill whatever height the
       * outer container settles at.
       */}
      <div className="relative w-full min-h-[220px] sm:min-h-[260px]">
        <div className={`card-inner w-full h-full ${isFlipped ? 'flipped' : ''}`}>

          {/* ══════════════ FRONT FACE ══════════════ */}
          <div className="card-face">
            <div className="h-full min-h-[220px] sm:min-h-[260px] bg-paper-card border border-mist/10 rounded-2xl shadow-lg overflow-hidden noise-overlay flex flex-col">

              {/* Accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-accent via-accent-light to-amber-400 shrink-0" />

              {/* ── Top: label + badge ── */}
              <div className="flex items-center justify-between px-5 pt-4 pb-0 shrink-0">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-mist/45 leading-none">
                  Front
                </span>
                <Badge
                  variant={
                    card.difficulty <= 2 ? 'sage'
                    : card.difficulty >= 4 ? 'accent'
                    : 'mist'
                  }
                >
                  {formatDifficulty(card.difficulty)}
                </Badge>
              </div>

              {/* ── Centre: primary content ── */}
              <div className="flex-1 flex flex-col items-center justify-center px-7 py-5 gap-2.5 text-center">
                <p className={`font-display text-ink leading-snug ${frontFontSize(card.front)}`}>
                  {card.front}
                </p>
                {card.translation && (
                  <p className="text-xs text-mist/70 italic leading-relaxed max-w-[90%]">
                    {card.translation}
                  </p>
                )}
              </div>

              {/* ── Bottom: hint ── */}
              <div className="flex items-center justify-end px-5 pb-4 shrink-0">
                <span className="text-[10px] text-mist/35 italic font-body">
                  tap to reveal
                </span>
              </div>
            </div>
          </div>

          {/* ══════════════ BACK FACE ══════════════ */}
          <div className="card-face card-back-face">
            <div className="h-full min-h-[220px] sm:min-h-[260px] bg-ink border border-ink-soft rounded-2xl shadow-lg overflow-hidden flex flex-col">

              {/* Accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-sage via-sage-light to-emerald-400 shrink-0" />

              {/* ── Top: label ── */}
              <div className="px-5 pt-4 pb-0 shrink-0">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-mist/35 leading-none">
                  Back
                </span>
              </div>

              {/* ── Centre: primary content ── */}
              <div className="flex-1 flex flex-col items-center justify-center px-7 py-5 gap-3 text-center">
                <p className={`font-display text-paper leading-snug ${backFontSize(card.back)}`}>
                  {card.back}
                </p>

                {/* Example sentence block */}
                {card.example && (
                  <div className="mt-1 bg-ink-soft rounded-xl px-4 py-3 w-full max-w-sm">
                    <p className="text-[9px] text-mist/50 uppercase tracking-[0.2em] mb-1.5 font-mono text-center">
                      Example
                    </p>
                    <p className="text-xs text-mist leading-relaxed text-center">
                      {card.example}
                    </p>
                    {card.example_translation && (
                      <p className="text-[10px] text-mist/45 italic text-center mt-1.5 leading-relaxed">
                        {card.example_translation}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* ── Bottom: notes ── */}
              {card.notes && (
                <div className="px-5 pb-4 shrink-0">
                  <p className="text-[10px] text-mist/35 italic text-center leading-relaxed">
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