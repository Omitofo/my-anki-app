'use client'

// src/app/study/page.tsx

import { useStudyStore } from '@/store/studyStore'
import { Breadcrumb } from '@/components/navigation/BreadCrumb'
import { DomainSelector } from '@/components/navigation/DomainSelector'
import { SectionSelector } from '@/components/navigation/SectionSelector'
import { CategorySelector } from '@/components/navigation/CategorySelector'
import { DeckSelector } from '@/components/navigation/DeckSelector'
import { StudyView } from '@/components/study/StudyView'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const LEVEL_META: Record<string, { heading: string; sub: string }> = {
  domain:   { heading: 'What would you like to study?', sub: 'Choose a subject domain' },
  section:  { heading: 'Pick a section',                sub: 'Select the area you want to explore' },
  category: { heading: 'Choose a category',             sub: 'What aspect would you like to focus on?' },
  deck:     { heading: 'Select a deck',                 sub: 'Each deck is a curated set of cards' },
  study:    { heading: '',                              sub: '' },
}

export default function StudyPage() {
  const { nav, goBack, resetNav } = useStudyStore()
  const { level } = nav
  const meta       = LEVEL_META[level]
  const isStudying = level === 'study'

  return (
    <div className="min-h-dvh bg-paper flex flex-col">

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-paper/90 backdrop-blur-sm border-b border-mist/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 grid grid-cols-[auto_1fr_auto] items-center gap-2">

          {/* Left: back button */}
          <div className="flex items-center min-w-[40px]">
            {level !== 'domain' ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="text-mist hover:text-ink -ml-1 shrink-0"
                aria-label="Go back"
              >
                <span>←</span>
                <span className="hidden sm:inline ml-1">Back</span>
              </Button>
            ) : (
              <span />
            )}
          </div>

          {/* Centre: breadcrumb */}
          <div className="flex items-center justify-center overflow-hidden">
            <Breadcrumb />
          </div>

          {/* Right: logo — resets nav state THEN navigates home */}
          <div className="flex items-center justify-end min-w-[40px]">
            <Link
              href="/"
              onClick={resetNav}          // ← clears all nav/study state
              className="font-display text-xl text-ink tracking-tight shrink-0 hover:text-accent transition-colors"
            >
              Kardu<span className="text-accent">.</span>
            </Link>
          </div>

        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Page heading */}
        {!isStudying && (
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-2xl sm:text-3xl text-ink mb-1">{meta.heading}</h1>
            <p className="text-sm text-mist">{meta.sub}</p>
          </div>
        )}

        {/* Deck context header while studying */}
        {isStudying && nav.deck && (
          <div className="mb-6 animate-fade-in">
            <p className="text-xs font-mono uppercase tracking-widest text-mist/60 mb-1">
              {nav.section?.icon} {nav.section?.name}
              {nav.category ? ` · ${nav.category.name}` : ''}
            </p>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-xl sm:text-2xl text-ink">{nav.deck.name}</h1>
              <span className={`text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                nav.deck.deck_type === 'quiz'
                  ? 'border-accent/30 text-accent bg-accent/5'
                  : 'border-mist/20 text-mist bg-paper-warm'
              }`}>
                {nav.deck.deck_type === 'quiz' ? 'Quiz' : 'Flashcards'}
              </span>
            </div>
          </div>
        )}

        {/* Level content */}
        <div className="flex-1">
          {level === 'domain'   && <DomainSelector />}
          {level === 'section'  && <SectionSelector />}
          {level === 'category' && <CategorySelector />}
          {level === 'deck'     && <DeckSelector />}
          {level === 'study'    && <StudyView />}
        </div>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-mist/10 py-4">
        <p className="text-center text-xs text-mist/40 font-mono">
          Kardu · built with Next.js + Supabase
        </p>
      </footer>

    </div>
  )
}