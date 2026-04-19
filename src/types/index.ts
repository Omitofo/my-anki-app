// src/types/index.ts

export interface Domain {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Section {
  id: string
  domain_id: string
  name: string
  slug: string
  icon?: string
  created_at: string
}

export interface Category {
  id: string
  section_id: string
  name: string
  slug: string
  created_at: string
}

export type DeckType = 'flashcard' | 'quiz'

export interface Deck {
  id: string
  category_id: string
  name: string
  description?: string
  deck_type: DeckType
  created_at: string
}

// Pure content — no behavior encoded here
export interface Card {
  id: string
  deck_id: string
  front: string
  back: string
  translation?: string
  example?: string
  example_translation?: string
  notes?: string
  difficulty: number
  created_at: string
  updated_at: string
}

// Interaction type — separate from Card
export interface QuizOption {
  id: string
  card_id: string
  text: string
  is_correct: boolean
  position: number
}

// Card + its quiz options (used only in quiz decks)
export interface CardWithOptions extends Card {
  quiz_options: QuizOption[]
}

export type NavLevel = 'domain' | 'section' | 'category' | 'deck' | 'study'

export interface NavState {
  domain: Domain | null
  section: Section | null
  category: Category | null
  deck: Deck | null
  level: NavLevel
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  hasMore: boolean
}

export interface HeroTheme {
  domain: string
  front: string
  back: string
  sub: string
  icon: string
  accentClass: string
}