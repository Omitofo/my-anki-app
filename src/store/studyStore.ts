import { create } from 'zustand'
import type { Card, Domain, Language, Category, Deck, NavLevel } from '@/types'
import { pickRandom } from '@/lib/utils'

interface NavState {
  domain: Domain | null
  language: Language | null
  category: Category | null
  deck: Deck | null
  level: NavLevel
}

interface StudyState {
  // Navigation
  nav: NavState

  // Session
  cards: Card[]
  seenIds: Set<string>
  currentCard: Card | null
  isFlipped: boolean
  sessionCount: number
  isTransitioning: boolean

  // Navigation actions
  setDomain: (domain: Domain) => void
  setLanguage: (language: Language) => void
  setCategory: (category: Category) => void
  setDeck: (deck: Deck) => void
  goBack: () => void
  resetNav: () => void

  // Study actions
  loadCards: (cards: Card[]) => void
  flipCard: () => void
  nextCard: () => void
  resetSession: () => void
}

const initialNav: NavState = {
  domain: null,
  language: null,
  category: null,
  deck: null,
  level: 'domain',
}

export const useStudyStore = create<StudyState>((set, get) => ({
  nav: initialNav,
  cards: [],
  seenIds: new Set(),
  currentCard: null,
  isFlipped: false,
  sessionCount: 0,
  isTransitioning: false,

  // ── Navigation ──────────────────────────────────────────────
  setDomain: (domain) =>
    set({ nav: { ...initialNav, domain, level: 'language' } }),

  setLanguage: (language) =>
    set((s) => ({ nav: { ...s.nav, language, level: 'category' } })),

  setCategory: (category) =>
    set((s) => ({ nav: { ...s.nav, category, level: 'deck' } })),

  setDeck: (deck) =>
    set((s) => ({ nav: { ...s.nav, deck, level: 'study' } })),

  goBack: () => {
    const { nav } = get()
    if (nav.level === 'study')   return set({ nav: { ...nav, deck: null, level: 'deck' }, cards: [], currentCard: null, seenIds: new Set(), isFlipped: false })
    if (nav.level === 'deck')    return set({ nav: { ...nav, category: null, level: 'category' } })
    if (nav.level === 'category') return set({ nav: { ...nav, language: null, level: 'language' } })
    if (nav.level === 'language') return set({ nav: { ...nav, domain: null, level: 'domain' } })
  },

  resetNav: () => set({ nav: initialNav, cards: [], currentCard: null, seenIds: new Set(), isFlipped: false, sessionCount: 0 }),

  // ── Study ────────────────────────────────────────────────────
  loadCards: (cards) => {
    if (!cards.length) {
      set({ cards, currentCard: null })
      return
    }
    const first = pickRandom(cards)
    set({ cards, seenIds: new Set([first.id]), currentCard: first, isFlipped: false, sessionCount: 0 })
  },

  flipCard: () => set((s) => ({ isFlipped: !s.isFlipped })),

  nextCard: () => {
    const { cards, seenIds, sessionCount } = get()
    if (!cards.length) return

    set({ isTransitioning: true })

    setTimeout(() => {
      const available = cards.filter((c) => !seenIds.has(c.id))
      const pool = available.length > 0 ? available : cards

      if (available.length === 0) {
        seenIds.clear()
      }

      const next = pickRandom(pool)
      seenIds.add(next.id)

      set({
        currentCard: next,
        isFlipped: false,
        seenIds: new Set(seenIds),
        sessionCount: sessionCount + 1,
        isTransitioning: false,
      })
    }, 200)
  },

  resetSession: () => {
    const { cards } = get()
    if (!cards.length) return
    const first = pickRandom(cards)
    set({ seenIds: new Set([first.id]), currentCard: first, isFlipped: false, sessionCount: 0 })
  },
}))