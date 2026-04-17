import { db } from '@/db/client'
import type { Category, ApiResponse } from '@/types'

export async function getCategoriesByLanguage(languageId: string): Promise<ApiResponse<Category[]>> {
  const { data, error } = await db
    .from('categories')
    .select('*')
    .eq('language_id', languageId)
    .order('name')

  return {
    data: data ?? null,
    error: error?.message ?? null,
  }
}