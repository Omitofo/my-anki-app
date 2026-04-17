import { db } from '@/db/client'
import type { Deck, ApiResponse } from '@/types'

export async function getDecksByCategory(categoryId: string): Promise<ApiResponse<Deck[]>> {
  const { data, error } = await db
    .from('decks')
    .select('*')
    .eq('category_id', categoryId)
    .order('name')

  return {
    data: data ?? null,
    error: error?.message ?? null,
  }
}

export async function getDeckById(id: string): Promise<ApiResponse<Deck>> {
  const { data, error } = await db
    .from('decks')
    .select('*')
    .eq('id', id)
    .single()

  return {
    data: data ?? null,
    error: error?.message ?? null,
  }
}