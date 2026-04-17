export interface Domain {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Language {
  id: string
  domain_id: string
  name: string
  slug: string
  flag?: string
  created_at: string
}

export interface Category {
  id: string
  language_id: string
  name: string
  slug: string
  created_at: string
}

export interface Deck {
  id: string
  category_id: string
  name: string
  description?: string
  created_at: string
}

export interface Card {
  id: string
  deck_id: string
  front: string
  back: string
  translation?: string
  example?: string
  /** Translation of the example sentence */
  example_translation?: string
  notes?: string
  difficulty: number
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
}

export interface CardWithTags extends Card {
  tags?: Tag[]
}

// Navigation breadcrumb types
export type NavLevel = 'domain' | 'language' | 'category' | 'deck' | 'study'

export interface NavState {
  domain?: Domain
  language?: Language
  category?: Category
  deck?: Deck
  level: NavLevel
}

// Study session types
export interface StudySession {
  deckId: string
  cards: Card[]
  seenIds: Set<string>
  currentCard: Card | null
  isFlipped: boolean
  sessionCount: number
}

// API response types
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