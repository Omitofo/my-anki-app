'use client'

import { useEffect } from 'react'
import { useStudyStore } from '@/store/studyStore'
import { debounce } from '@/lib/utils'

export function KeyboardHint() {
  const { flipCard, nextCard } = useStudyStore()

  useEffect(() => {
    const handleKey = debounce((e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        flipCard()
      }
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        nextCard()
      }
    }, 50)

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [flipCard, nextCard])

  return (
    <div className="hidden sm:flex items-center justify-center gap-4 text-xs text-mist/40 font-mono">
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