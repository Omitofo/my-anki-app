// src/hooks/useStudySession.ts
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useStudyStore } from '@/store/studyStore'
import { getAllCardsByDeck } from '@/services/card-service'
import { getQuizCardsByDeck } from '@/services/quiz-service'
import type { DeckType } from '@/types'

export function useStudySession(deckId: string | null, deckType: DeckType = 'flashcard') {
  const {
    loadCards,
    currentCard,
    isFlipped,
    isTransitioning,
    sessionCount,
    seenIds,
    cards,
    historyIndex,
  } = useStudyStore()

  const isQuiz = deckType === 'quiz'

  const query = useQuery({
    queryKey: ['cards', deckId, deckType],
    queryFn: async () => {
      if (!deckId) return []
      if (isQuiz) {
        const res = await getQuizCardsByDeck(deckId)
        if (res.error) throw new Error(res.error)
        return res.data ?? []
      }
      const res = await getAllCardsByDeck(deckId)
      if (res.error) throw new Error(res.error)
      return res.data ?? []
    },
    enabled: !!deckId,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (query.data) loadCards(query.data)
  }, [query.data, loadCards])

  const progress = cards.length > 0 ? seenIds.size / cards.length : 0

  return {
    currentCard,
    isFlipped,
    isTransitioning,
    sessionCount,
    totalCards: cards.length,
    seenCount: seenIds.size,
    historyIndex,
    progress,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}