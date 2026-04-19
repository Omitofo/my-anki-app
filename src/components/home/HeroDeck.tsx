'use client'

// src/components/home/HeroDeck.tsx

import { useEffect, useState } from 'react'

interface HeroTheme {
  front: string
  back: string
  sub: string
}

const THEMES: HeroTheme[] = [
  { front: 'こんにちは', back: 'Hello',             sub: 'Japanese · Vocabulary'    },
  { front: '1789',        back: 'French Revolution', sub: 'History · Key Events'     },
  { front: 'GDP',         back: 'Total output value',sub: 'Economics · Fundamentals' },
]

const INTERVAL_MS   = 4000
const TRANSITION_MS = 380

export function HeroDeck() {
  const [index, setIndex]     = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % THEMES.length)
        setVisible(true)
      }, TRANSITION_MS)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  const theme = THEMES[index]

  return (
    <div className="relative w-64 h-48 sm:w-80 sm:h-56 mb-4" aria-hidden>
      {/* Stacked back cards */}
      <div className="absolute left-4 top-6 w-44 sm:w-52 h-32 sm:h-36 bg-paper-card rounded-2xl border border-mist/20 shadow-md rotate-[-8deg] opacity-40" />
      <div className="absolute left-8 top-3 w-44 sm:w-52 h-32 sm:h-36 bg-paper-card rounded-2xl border border-mist/20 shadow-md rotate-[-4deg] opacity-70" />

      {/* Front card — no accent stripe, clean white */}
      <div
        className="absolute left-6 top-0 w-44 sm:w-52 h-32 sm:h-36 bg-paper-card rounded-2xl border border-mist/15 shadow-xl flex flex-col items-center justify-center gap-1.5 animate-float overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
        }}
      >
        {/* Domain sub-label */}
        <span className="text-[9px] font-mono uppercase tracking-widest text-mist/50 px-2 text-center">
          {theme.sub}
        </span>

        {/* Front text */}
        <p
          className="font-display text-ink text-center leading-tight px-3"
          style={{ fontSize: theme.front.length > 6 ? '1.25rem' : '1.625rem' }}
        >
          {theme.front}
        </p>

        {/* Back / translation */}
        <p className="text-xs text-mist text-center px-3 leading-snug">{theme.back}</p>

        {/* Progress dots */}
        <div className="flex items-center gap-1 mt-1">
          {THEMES.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === index ? 14 : 4,
                height:     4,
                background: i === index ? 'var(--accent)' : 'var(--mist-light)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}