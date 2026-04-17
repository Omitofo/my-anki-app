import { db } from '@/db/client'
import type { Card, ApiResponse, PaginatedResponse } from '@/types'

const DEFAULT_LIMIT = 50

export async function getCardsByDeck(
  deckId: string,
  page = 1,
  limit = DEFAULT_LIMIT
): Promise<PaginatedResponse<Card>> {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await db
    .from('cards')
    .select('*', { count: 'exact' })
    .eq('deck_id', deckId)
    .range(from, to)
    .order('created_at')

  if (error) {
    return { data: [], count: 0, page, limit, hasMore: false }
  }

  const total = count ?? 0

  return {
    data: data ?? [],
    count: total,
    page,
    limit,
    hasMore: to < total - 1,
  }
}

export async function getAllCardsByDeck(deckId: string): Promise<ApiResponse<Card[]>> {
  const { data, error } = await db
    .from('cards')
    .select('*')
    .eq('deck_id', deckId)
    .order('created_at')

  return {
    data: data ?? null,
    error: error?.message ?? null,
  }
}

export async function getCardById(id: string): Promise<ApiResponse<Card>> {
  const { data, error } = await db
    .from('cards')
    .select('*')
    .eq('id', id)
    .single()

  return {
    data: data ?? null,
    error: error?.message ?? null,
  }
}