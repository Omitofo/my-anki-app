'use client'

// src/components/study/KeyboardHint.tsx

import { useEffect } from 'react'
import { useStudyStore } from '@/store/studyStore'

const BLOCKED_KEYS = new Set([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'])

export function KeyboardHint() {
  const flipCard = useStudyStore((s) => s.flipCard)
  const nextCard = useStudyStore((s) => s.nextCard)
  const prevCard = useStudyStore((s) => s.prevCard)

  useEffect(() => {
    // Debounce state — separate from the handler so preventDefault fires immediately
    let lastFire = 0
    const DEBOUNCE_MS = 60

    const handleKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLButtonElement
      ) return

      if (!BLOCKED_KEYS.has(e.key)) return

      // Always prevent default FIRST — before any debounce check.
      // This stops the browser scroll that happens when Space/ArrowDown
      // fires before our debounced handler would have run.
      e.preventDefault()

      const now = Date.now()
      if (now - lastFire < DEBOUNCE_MS) return
      lastFire = now

      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        flipCard()
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        nextCard()
      } else if (e.key === 'ArrowLeft') {
        prevCard()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [flipCard, nextCard, prevCard])

  return (
    <div className="hidden sm:flex items-center justify-center gap-5 text-xs text-mist/40 font-mono">
      <span>
        <kbd className="px-1.5 py-0.5 rounded bg-paper-warm border border-mist/20 text-[10px]">←</kbd>
        {' '}prev
      </span>
      <span>
        <kbd className="px-1.5 py-0.5 rounded bg-paper-warm border border-mist/20 text-[10px]">Space</kbd>
        {' '}flip
      </span>
      <span>
        <kbd className="px-1.5 py-0.5 rounded bg-paper-warm border border-mist/20 text-[10px]">→</kbd>
        {' '}next
      </span>
    </div>
  )
}