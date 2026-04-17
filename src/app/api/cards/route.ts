import { NextRequest, NextResponse } from 'next/server'
import { getCardsByDeck } from '@/services/card-service'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deckId = searchParams.get('deck')
  const page = parseInt(searchParams.get('page') ?? '1', 10)
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 100)

  if (!deckId) {
    return NextResponse.json({ error: 'Missing deck parameter' }, { status: 400 })
  }

  // Basic sanitation
  if (typeof deckId !== 'string' || deckId.length > 100) {
    return NextResponse.json({ error: 'Invalid deck parameter' }, { status: 400 })
  }

  try {
    const result = await getCardsByDeck(deckId, page, limit)
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (err) {
    console.error('[API /cards] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}