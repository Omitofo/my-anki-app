// src/services/section-service.ts
import { db } from '@/db/client'
import type { Section, ApiResponse } from '@/types'

export async function getSectionsByDomain(domainId: string): Promise<ApiResponse<Section[]>> {
  const { data, error } = await db
    .from('sections')
    .select('*')
    .eq('domain_id', domainId)
    .order('name')
  return { data: data ?? null, error: error?.message ?? null }
}