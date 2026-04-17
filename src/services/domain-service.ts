import { db } from '@/db/client'
import type { Domain, ApiResponse } from '@/types'

export async function getDomains(): Promise<ApiResponse<Domain[]>> {
  const { data, error } = await db
    .from('domains')
    .select('*')
    .order('name')

  return {
    data: data ?? null,
    error: error?.message ?? null,
  }
}

export async function getDomainBySlug(slug: string): Promise<ApiResponse<Domain>> {
  const { data, error } = await db
    .from('domains')
    .select('*')
    .eq('slug', slug)
    .single()

  return {
    data: data ?? null,
    error: error?.message ?? null,
  }
}