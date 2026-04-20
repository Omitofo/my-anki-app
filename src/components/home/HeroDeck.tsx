'use client'

// src/components/home/HeroDeck.tsx

import { useEffect, useState } from 'react'

interface HeroTheme {
  front: string
  back: string
  sub: string
}

const THEMES: HeroTheme[] = [
  { front: 'こんにちは', back: 'Hello',              sub: 'Japanese · Vocabulary'    },
  { front: '1789',        back: 'French Revolution',  sub: 'History · Key Events'     },
  { front: 'GDP',         back: 'Total output value', sub: 'Economics · Fundamentals' },
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
    /*
     * Outer container is tall enough to give the rotated back-cards
     * room WITHOUT overlapping the front card's text content.
     * Back cards are shifted left so their borders stay inside
     * the container — not floating over the hero headline below.
     */
    <div
      className="relative mb-6"
      style={{ width: 280, height: 220 }}
      aria-hidden
    >
      {/* ── Furthest back card (most rotated, faintest) ── */}
      <div
        className="absolute bg-paper-card rounded-2xl border border-mist/20 shadow-sm"
        style={{
          width: 260, height: 180,
          top: 18, left: 8,
          transform: 'rotate(-7deg)',
          opacity: 0.35,
        }}
      />

      {/* ── Middle back card ── */}
      <div
        className="absolute bg-paper-card rounded-2xl border border-mist/20 shadow-md"
        style={{
          width: 260, height: 180,
          top: 10, left: 16,
          transform: 'rotate(-3.5deg)',
          opacity: 0.65,
        }}
      />

      {/* ── Front card — content fades between themes ── */}
      <div
        className="absolute bg-paper-card rounded-2xl border border-mist/15 shadow-xl
                   flex flex-col items-center justify-center gap-2 overflow-hidden animate-float"
        style={{
          width: 260, height: 180,
          top: 0, left: 20,
          opacity: visible ? 1 : 0,
          transition: `opacity ${TRANSITION_MS}ms ease-in-out`,
        }}
      >
        {/* Sub-label */}
        <span className="text-[9px] font-mono uppercase tracking-widest text-mist/50 px-3 text-center">
          {theme.sub}
        </span>

        {/* Front word / number */}
        <p
          className="font-display text-ink text-center leading-tight px-4"
          style={{
            fontSize: theme.front.length > 6
              ? '1.35rem'
              : theme.front.length > 3
              ? '1.75rem'
              : '2rem',
          }}
        >
          {theme.front}
        </p>

        {/* Back / translation */}
        <p className="text-xs text-mist text-center px-4 leading-snug">{theme.back}</p>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 mt-0.5">
          {THEMES.map((_, i) => (
            <span
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === index ? 16 : 4,
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