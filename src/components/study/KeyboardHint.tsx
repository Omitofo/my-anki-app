'use client'

// src/components/study/KeyboardHint.tsx

import { useEffect } from 'react'
import { useStudyStore } from '@/store/studyStore'
import { debounce } from '@/lib/utils'

export function KeyboardHint() {
  const flipCard = useStudyStore((s) => s.flipCard)
  const nextCard = useStudyStore((s) => s.nextCard)
  const prevCard = useStudyStore((s) => s.prevCard)

  useEffect(() => {
    const handleKey = debounce((e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLButtonElement
      ) return

      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        flipCard()
      }
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        nextCard()
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevCard()
      }
    }, 50)

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