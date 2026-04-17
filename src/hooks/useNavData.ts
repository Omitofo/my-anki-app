import { useQuery } from '@tanstack/react-query'
import { getDomains } from '@/services/domain-service'
import { getLanguagesByDomain } from '@/services/language-service'
import { getCategoriesByLanguage } from '@/services/category-service'
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

export function useLanguages(domainId: string | null) {
  return useQuery({
    queryKey: ['languages', domainId],
    queryFn: async () => {
      const res = await getLanguagesByDomain(domainId!)
      if (res.error) throw new Error(res.error)
      return res.data ?? []
    },
    enabled: !!domainId,
    staleTime: 10 * 60 * 1000,
  })
}

export function useCategories(languageId: string | null) {
  return useQuery({
    queryKey: ['categories', languageId],
    queryFn: async () => {
      const res = await getCategoriesByLanguage(languageId!)
      if (res.error) throw new Error(res.error)
      return res.data ?? []
    },
    enabled: !!languageId,
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