// src/services/domain-service.ts
import { db } from '@/db/client'
import type { Domain, ApiResponse } from '@/types'

export async function getDomains(): Promise<ApiResponse<Domain[]>> {
  const { data, error } = await db.from('domains').select('*').order('name')
  return { data: data ?? null, error: error?.message ?? null }
}