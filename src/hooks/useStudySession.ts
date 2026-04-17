import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useStudyStore } from '@/store/studyStore'
import { getAllCardsByDeck } from '@/services/card-service'

export function useStudySession(deckId: string | null) {
  const { loadCards, currentCard, isFlipped, isTransitioning, sessionCount, seenIds, cards } =
    useStudyStore()

  const query = useQuery({
    queryKey: ['cards', deckId],
    queryFn: async () => {
      if (!deckId) return []
      const res = await getAllCardsByDeck(deckId)
      if (res.error) throw new Error(res.error)
      return res.data ?? []
    },
    enabled: !!deckId,
    staleTime: 5 * 60 * 1000, // 5 min
  })

  useEffect(() => {
    if (query.data) {
      loadCards(query.data)
    }
  }, [query.data, loadCards])

  const progress = cards.length > 0 ? seenIds.size / cards.length : 0

  return {
    currentCard,
    isFlipped,
    isTransitioning,
    sessionCount,
    totalCards: cards.length,
    seenCount: seenIds.size,
    progress,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}