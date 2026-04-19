// src/store/studyStore.ts
import { create } from 'zustand'
import type { Card, Domain, Section, Category, Deck, NavLevel } from '@/types'
import { pickRandom } from '@/lib/utils'

interface NavState {
  domain: Domain | null
  section: Section | null
  category: Category | null
  deck: Deck | null
  level: NavLevel
}

interface StudyState {
  nav: NavState
  cards: Card[]
  history: Card[]
  historyIndex: number
  seenIds: Set<string>
  currentCard: Card | null
  isFlipped: boolean
  sessionCount: number
  isTransitioning: boolean

  // Nav
  setDomain: (domain: Domain) => void
  setSection: (section: Section) => void
  setCategory: (category: Category) => void
  setDeck: (deck: Deck) => void
  goBack: () => void
  resetNav: () => void

  // Study
  loadCards: (cards: Card[]) => void
  flipCard: () => void
  nextCard: () => void
  prevCard: () => void
  resetSession: () => void
}

const initialNav: NavState = {
  domain: null,
  section: null,
  category: null,
  deck: null,
  level: 'domain',
}

const initialStudy = {
  cards: [] as Card[],
  history: [] as Card[],
  historyIndex: -1,
  seenIds: new Set<string>(),
  currentCard: null as Card | null,
  isFlipped: false,
  sessionCount: 0,
  isTransitioning: false,
}

export const useStudyStore = create<StudyState>((set, get) => ({
  nav: initialNav,
  ...initialStudy,

  // ── Navigation ──────────────────────────────────────────────
  setDomain: (domain) =>
    set({ nav: { ...initialNav, domain, level: 'section' } }),

  setSection: (section) =>
    set((s) => ({ nav: { ...s.nav, section, level: 'category' } })),

  setCategory: (category) =>
    set((s) => ({ nav: { ...s.nav, category, level: 'deck' } })),

  setDeck: (deck) =>
    set((s) => ({ nav: { ...s.nav, deck, level: 'study' } })),

  goBack: () => {
    const { nav } = get()
    const resetStudy = { ...initialStudy, seenIds: new Set<string>() }
    if (nav.level === 'study')
      return set({ nav: { ...nav, deck: null, level: 'deck' }, ...resetStudy })
    if (nav.level === 'deck')
      return set({ nav: { ...nav, category: null, level: 'category' } })
    if (nav.level === 'category')
      return set({ nav: { ...nav, section: null, level: 'section' } })
    if (nav.level === 'section')
      return set({ nav: { ...nav, domain: null, level: 'domain' } })
  },

  resetNav: () =>
    set({ nav: initialNav, ...initialStudy, seenIds: new Set<string>() }),

  // ── Study ────────────────────────────────────────────────────
  loadCards: (cards) => {
    if (!cards.length) {
      set({ cards, currentCard: null, history: [], historyIndex: -1 })
      return
    }
    const first = pickRandom(cards)
    set({
      cards,
      seenIds: new Set([first.id]),
      currentCard: first,
      history: [first],
      historyIndex: 0,
      isFlipped: false,
      sessionCount: 0,
    })
  },

  flipCard: () => set((s) => ({ isFlipped: !s.isFlipped })),

  nextCard: () => {
    const { cards, seenIds, sessionCount, history, historyIndex } = get()
    if (!cards.length) return

    // Navigate forward through existing history first
    if (historyIndex < history.length - 1) {
      set({
        currentCard: history[historyIndex + 1],
        historyIndex: historyIndex + 1,
        isFlipped: false,
      })
      return
    }

    set({ isTransitioning: true })
    setTimeout(() => {
      const available = cards.filter((c) => !seenIds.has(c.id))
      const pool = available.length > 0 ? available : cards
      if (available.length === 0) seenIds.clear()

      const next = pickRandom(pool)
      seenIds.add(next.id)
      const newHistory = [...history, next]

      set({
        currentCard: next,
        isFlipped: false,
        seenIds: new Set(seenIds),
        sessionCount: sessionCount + 1,
        isTransitioning: false,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      })
    }, 200)
  },

  prevCard: () => {
    const { history, historyIndex } = get()
    if (historyIndex <= 0) return
    set({ isTransitioning: true })
    setTimeout(() => {
      set({
        currentCard: history[historyIndex - 1],
        historyIndex: historyIndex - 1,
        isFlipped: false,
        isTransitioning: false,
      })
    }, 200)
  },

  resetSession: () => {
    const { cards } = get()
    if (!cards.length) return
    const first = pickRandom(cards)
    set({
      seenIds: new Set([first.id]),
      currentCard: first,
      history: [first],
      historyIndex: 0,
      isFlipped: false,
      sessionCount: 0,
    })
  },
}))