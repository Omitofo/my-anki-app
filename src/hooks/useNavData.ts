// src/hooks/useNavData.ts
import { useQuery } from '@tanstack/react-query'
import { getDomains } from '@/services/domain-service'
import { getSectionsByDomain } from '@/services/section-service'
import { getCategoriesBySection } from '@/services/category-service'
import { getDecksByCategory } from '@/services/deck-service'

export function useDomains() {
  return useQuery({
    queryKey: ['domains'],
    queryFn: async () => {
      const res = await getDomains()
      if (res.error) throw new Error(res.error)
      return res.data ?? []
    },
    staleTime: 10 * 60 * 1000,
  })
}

export function useSections(domainId: string | null) {
  return useQuery({
    queryKey: ['sections', domainId],
    queryFn: async () => {
      const res = await getSectionsByDomain(domainId!)
      if (res.error) throw new Error(res.error)
      return res.data ?? []
    },
    enabled: !!domainId,
    staleTime: 10 * 60 * 1000,
  })
}

export function useCategories(sectionId: string | null) {
  return useQuery({
    queryKey: ['categories', sectionId],
    queryFn: async () => {
      const res = await getCategoriesBySection(sectionId!)
      if (res.error) throw new Error(res.error)
      return res.data ?? []
    },
    enabled: !!sectionId,
    staleTime: 10 * 60 * 1000,
  })
}

export function useDecks(categoryId: string | null) {
  return useQuery({
    queryKey: ['decks', categoryId],
    queryFn: async () => {
      const res = await getDecksByCategory(categoryId!)
      if (res.error) throw new Error(res.error)
      return res.data ?? []
    },
    enabled: !!categoryId,
    staleTime: 10 * 60 * 1000,
  })
}