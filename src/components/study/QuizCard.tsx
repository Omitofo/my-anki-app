'use client'

// src/components/study/QuizCard.tsx

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { formatDifficulty } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { CardWithOptions, QuizOption } from '@/types'

// ─────────────────────────────────────────────────────────────
// Confetti — full-screen, cancellable via ref
// ─────────────────────────────────────────────────────────────
const COLORS = [
  '#e8621a', '#4a7c59', '#f0c040',
  '#6366f1', '#ec4899', '#06b6d4',
  '#f97316', '#84cc16', '#f43f5e',
]

interface Particle {
  cx: number; cy: number
  vx: number; vy: number
  rot: number; rotV: number
  scale: number; color: string
  shape: 'rect' | 'circle' | 'strip'
}

function rnd(a: number, b: number) { return a + Math.random() * (b - a) }

// cancelRef lets the parent kill the animation before it naturally ends
function FullScreenConfetti({
  onDone,
  cancelRef,
}: {
  onDone: () => void
  cancelRef: React.MutableRefObject<(() => void) | null>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      cx:    rnd(0.15, 0.85) * W,
      cy:    rnd(-0.05, 0.15) * H,
      vx:    rnd(-160, 160),
      vy:    rnd(-60, 240),
      rot:   rnd(0, 360),
      rotV:  rnd(-6, 6),
      scale: rnd(0.6, 1.5),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: (['rect', 'circle', 'strip'] as const)[Math.floor(Math.random() * 3)],
    }))

    let start: number | null = null
    let raf: number
    let cancelled = false
    const DURATION = 2.6

    // Expose cancel function to parent via ref
    cancelRef.current = () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ctx.clearRect(0, 0, W, H)
      onDone()
    }

    const draw = (ts: number) => {
      if (cancelled) return
      if (!start) start = ts
      const elapsed = (ts - start) / 1000

      if (elapsed > DURATION) {
        ctx.clearRect(0, 0, W, H)
        onDone()
        return
      }

      ctx.clearRect(0, 0, W, H)
      const DT    = 1 / 60
      const alpha = Math.max(0, 1 - elapsed / DURATION)

      for (const p of particles) {
        p.cx  += p.vx * DT
        p.cy  += p.vy * DT
        p.vy  += 320 * DT
        p.vx  *= 0.988
        p.rot += p.rotV

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(p.cx, p.cy)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.fillStyle = p.color

        const s = p.scale
        switch (p.shape) {
          case 'rect':
            ctx.fillRect(-5 * s, -5 * s, 10 * s, 10 * s); break
          case 'circle':
            ctx.beginPath(); ctx.arc(0, 0, 5 * s, 0, Math.PI * 2); ctx.fill(); break
          case 'strip':
            ctx.fillRect(-2 * s, -10 * s, 4 * s, 20 * s); break
        }
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      cancelRef.current = null
    }
  }, [onDone, cancelRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 9999,
      }}
      aria-hidden
    />
  )
}

// ─────────────────────────────────────────────────────────────
// QuizCard
// ─────────────────────────────────────────────────────────────
interface QuizCardProps {
  card: CardWithOptions
  onNext: () => void
  onPrev: () => void
  canGoPrev: boolean    // first card  → false → Prev disabled
  isLastCard: boolean   // last card   → true  → Next disabled
  isTransitioning: boolean
  sessionCount: number
  seenCount: number
  totalCards: number
  progress: number
}

type AnswerState = 'idle' | 'correct' | 'wrong'

export function QuizCard({
  card, onNext, onPrev,
  canGoPrev, isLastCard,
  isTransitioning, sessionCount, seenCount, totalCards, progress,
}: QuizCardProps) {
  const [selected, setSelected]         = useState<string | null>(null)
  const [state, setState]               = useState<AnswerState>('idle')
  const [showConfetti, setShowConfetti] = useState(false)

  // Ref to cancel in-progress confetti when the user navigates
  const confettiCancelRef = useRef<(() => void) | null>(null)

  const stopConfetti = useCallback(() => {
    if (confettiCancelRef.current) {
      confettiCancelRef.current()
      confettiCancelRef.current = null
    }
    setShowConfetti(false)
  }, [])

  // Reset on card change — also kill any running confetti
  useEffect(() => {
    stopConfetti()
    setSelected(null)
    setState('idle')
  }, [card.id, stopConfetti])

  const handleNext = () => { stopConfetti(); onNext() }
  const handlePrev = () => { stopConfetti(); onPrev() }

  const options: QuizOption[] = card.quiz_options ?? []

  const handleSelect = (opt: QuizOption) => {
    if (state !== 'idle') return
    setSelected(opt.id)
    if (opt.is_correct) {
      setState('correct')
      setShowConfetti(true)
    } else {
      setState('wrong')
    }
  }

  const getVariant = (opt: QuizOption): 'idle' | 'correct' | 'wrong' | 'dim' => {
    if (state === 'idle') return 'idle'
    if (opt.is_correct)   return 'correct'
    if (opt.id === selected) return 'wrong'
    return 'dim'
  }

  const optionCls: Record<string, string> = {
    idle:    'border-mist/20 bg-paper-card hover:border-accent/40 hover:bg-paper-warm text-ink cursor-pointer',
    correct: 'border-emerald-400 bg-emerald-50 text-emerald-800 shadow-[0_0_0_3px_rgba(52,211,153,0.25)]',
    wrong:   'border-red-400 bg-red-50 text-red-700 shadow-[0_0_0_3px_rgba(248,113,113,0.25)]',
    dim:     'border-mist/10 bg-paper/60 text-mist/40 cursor-default',
  }

  const badgeCls: Record<string, string> = {
    idle:    'border-mist/30 text-mist bg-transparent',
    correct: 'border-emerald-400 text-emerald-700 bg-emerald-100',
    wrong:   'border-red-400 text-red-600 bg-red-100',
    dim:     'border-mist/15 text-mist/30 bg-transparent',
  }

  const letters = ['A', 'B', 'C', 'D']

  // Button states
  const prevDisabled = !canGoPrev || isTransitioning
  const nextDisabled = isLastCard || isTransitioning

  return (
    <>
      {/* Full-screen confetti portal */}
      {showConfetti && typeof document !== 'undefined' &&
        createPortal(
          <FullScreenConfetti
            onDone={() => setShowConfetti(false)}
            cancelRef={confettiCancelRef}
          />,
          document.body
        )
      }

      <div className="w-full flex flex-col gap-3">

        {/* ── Question card ── */}
        <div className="relative w-full bg-paper-card border border-mist/10 rounded-2xl shadow-lg overflow-hidden">
          <div className="h-0.5 bg-gradient-to-r from-accent via-accent-light to-amber-400" />
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-mist/50 mt-0.5">
                Question
              </span>
              <Badge variant={card.difficulty <= 2 ? 'sage' : card.difficulty >= 4 ? 'accent' : 'mist'}>
                {formatDifficulty(card.difficulty)}
              </Badge>
            </div>
            <p className="font-display text-xl sm:text-2xl text-ink leading-snug">{card.front}</p>
            {card.translation && (
              <p className="text-xs text-mist/70 italic mt-2">{card.translation}</p>
            )}
          </div>
        </div>

        {/* ── Options ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {options.map((opt, idx) => {
            const v      = getVariant(opt)
            const letter = letters[idx] ?? String(idx + 1)
            const icon   =
              state !== 'idle'
                ? opt.is_correct ? '✓' : opt.id === selected ? '✗' : null
                : null

            return (
              <motion.button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                disabled={state !== 'idle'}
                whileTap={state === 'idle' ? { scale: 0.97 } : {}}
                animate={
                  v === 'correct'
                    ? { scale: [1, 1.04, 1],             transition: { duration: 0.28 } }
                    : v === 'wrong'
                    ? { x: [0, -8, 8, -5, 5, -3, 3, 0], transition: { duration: 0.40 } }
                    : {}
                }
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm font-body transition-all duration-200',
                  optionCls[v]
                )}
              >
                <span className={cn(
                  'shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-medium border transition-all duration-200',
                  badgeCls[v]
                )}>
                  {icon ?? letter}
                </span>
                <span className="flex-1 leading-snug">{opt.text}</span>
              </motion.button>
            )
          })}
        </div>

        {/* ── Feedback banner ── */}
        <AnimatePresence>
          {state !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className={cn(
                'rounded-xl px-4 py-3 text-sm font-body font-medium',
                state === 'correct'
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                  : 'bg-red-50 border border-red-300 text-red-700'
              )}
            >
              {state === 'correct' ? (
                <span>
                  ✓ Correct!
                  {card.notes && <span className="font-normal text-emerald-700/80 ml-1.5">— {card.notes}</span>}
                </span>
              ) : (
                <span>
                  ✗ Correct answer: <strong>{card.back}</strong>
                  {card.notes && <span className="font-normal text-red-600/80 ml-1.5">— {card.notes}</span>}
                </span>
              )}
              {card.example && (
                <p className="mt-1 text-xs font-normal opacity-75 italic">{card.example}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Progress ── */}
        <div className="flex items-center gap-3 pt-1">
          <ProgressBar value={progress} className="flex-1" />
          <span className="text-xs text-mist font-mono whitespace-nowrap tabular-nums">
            {seenCount} / {totalCards}
          </span>
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center justify-between gap-3">

          {/* Prev — disabled on first card */}
          <button
            onClick={handlePrev}
            disabled={prevDisabled}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-body font-medium border transition-all duration-200',
              !prevDisabled
                ? 'border-mist/30 text-ink hover:border-mist hover:bg-paper-warm active:scale-[0.97]'
                : 'border-mist/10 text-mist/20 cursor-not-allowed bg-paper/40'
            )}
            aria-label="Previous question"
          >
            ← Prev
          </button>

          {sessionCount > 0 && (
            <span className="text-xs text-mist/40 font-mono">{sessionCount} answered</span>
          )}

          {/* Next — disabled on last card */}
          <button
            onClick={handleNext}
            disabled={nextDisabled}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-body font-medium transition-all duration-200',
              !nextDisabled
                ? 'bg-ink text-paper hover:bg-ink-soft active:scale-[0.97] shadow-sm'
                : 'bg-ink/20 text-paper/40 cursor-not-allowed'
            )}
            aria-label="Next question"
          >
            Next →
          </button>

        </div>

      </div>
    </>
  )
}