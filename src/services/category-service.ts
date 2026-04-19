// src/services/category-service.ts
import { db } from '@/db/client'
import type { Category, ApiResponse } from '@/types'

export async function getCategoriesBySection(sectionId: string): Promise<ApiResponse<Category[]>> {
  const { data, error } = await db
    .from('categories')
    .select('*')
    .eq('section_id', sectionId)
    .order('name')
  return { data: data ?? null, error: error?.message ?? null }
}