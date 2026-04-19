// src/services/quiz-service.ts
import { db } from '@/db/client'
import type { CardWithOptions, ApiResponse } from '@/types'

/**
 * Fetches all cards for a quiz deck, each with their quiz_options joined.
 * Options are sorted by position for consistent display order.
 */
export async function getQuizCardsByDeck(
  deckId: string
): Promise<ApiResponse<CardWithOptions[]>> {
  const { data, error } = await db
    .from('cards')
    .select(`
      *,
      quiz_options (
        id,
        card_id,
        text,
        is_correct,
        position
      )
    `)
    .eq('deck_id', deckId)
    .order('created_at')

  if (error) return { data: null, error: error.message }

  // Sort options by position client-side (Supabase nested select doesn't support order on relations)
  const sorted = (data ?? []).map((card) => ({
    ...card,
    quiz_options: (card.quiz_options ?? []).sort(
      (a: { position: number }, b: { position: number }) => a.position - b.position
    ),
  }))

  return { data: sorted, error: null }
}