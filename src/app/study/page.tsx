'use client'

import { useStudyStore } from '@/store/studyStore'
import { Breadcrumb } from '@/components/navigation/BreadCrumb'
import { DomainSelector } from '@/components/navigation/DomainSelector'
import { LanguageSelector } from '@/components/navigation/LanguageSelector'
import { CategorySelector } from '@/components/navigation/CategorySelector'
import { DeckSelector } from '@/components/navigation/DeckSelector'
import { StudyView } from '@/components/study/StudyView'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const LEVEL_TITLES: Record<string, { heading: string; sub: string }> = {
  domain:   { heading: 'What would you like to study?', sub: 'Choose a domain to begin' },
  language: { heading: 'Pick a language', sub: 'Select the language you want to practice' },
  category: { heading: 'Choose a category', sub: 'What aspect would you like to focus on?' },
  deck:     { heading: 'Select a deck', sub: 'Each deck is a curated set of flashcards' },
  study:    { heading: '', sub: '' },
}

export default function StudyPage() {
  const { nav, goBack } = useStudyStore()
  const { level } = nav

  const meta = LEVEL_TITLES[level]
  const isStudying = level === 'study'

  return (
    <div className="min-h-dvh bg-paper flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-paper/90 backdrop-blur-sm border-b border-mist/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {level !== 'domain' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="text-mist hover:text-ink -ml-1"
                aria-label="Go back"
              >
                ← Back
              </Button>
            )}
            <Breadcrumb />
          </div>

{/* Logo */}
<Link
  href="/"
  className="font-display text-xl text-ink tracking-tight shrink-0 hover:text-accent transition-colors"
>
  Kardu<span className="text-accent">.</span>
</Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page heading */}
        {!isStudying && (
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-2xl sm:text-3xl text-ink mb-1">{meta.heading}</h1>
            <p className="text-sm text-mist">{meta.sub}</p>
          </div>
        )}

        {/* Deck name when studying */}
        {isStudying && nav.deck && (
          <div className="mb-6 animate-fade-in">
            <p className="text-xs font-mono uppercase tracking-widest text-mist/60 mb-1">
              {nav.language?.flag} {nav.language?.name} · {nav.category?.name}
            </p>
            <h1 className="font-display text-xl sm:text-2xl text-ink">{nav.deck.name}</h1>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {level === 'domain'   && <DomainSelector />}
          {level === 'language' && <LanguageSelector />}
          {level === 'category' && <CategorySelector />}
          {level === 'deck'     && <DeckSelector />}
          {level === 'study'    && <StudyView />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-mist/10 py-4">
        <p className="text-center text-xs text-mist/40 font-mono">
          Kardu · built with Next.js + Supabase
        </p>
      </footer>
    </div>
  )
}