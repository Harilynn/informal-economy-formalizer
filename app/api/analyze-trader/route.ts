import { NextRequest, NextResponse } from 'next/server'
import { analyzeTraderComprehensive } from '@/lib/ai-analysis'
import { getTraderById } from '@/lib/mock-data'

export async function POST(request: NextRequest) {
  try {
    const { traderId } = await request.json()

    if (!traderId) {
      return NextResponse.json(
        { error: 'traderId is required' },
        { status: 400 }
      )
    }

    const trader = getTraderById(traderId)
    if (!trader) {
      return NextResponse.json(
        { error: 'Trader not found' },
        { status: 404 }
      )
    }

    // Get comprehensive AI analysis
    const analysis = await analyzeTraderComprehensive(trader)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('[API] Trader analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze trader' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const traderId = request.nextUrl.searchParams.get('traderId')

  if (!traderId) {
    return NextResponse.json(
      { error: 'traderId query parameter is required' },
      { status: 400 }
    )
  }

  try {
    const trader = getTraderById(traderId)
    if (!trader) {
      return NextResponse.json(
        { error: 'Trader not found' },
        { status: 404 }
      )
    }

    const analysis = await analyzeTraderComprehensive(trader)
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('[API] Trader analysis GET error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze trader' },
      { status: 500 }
    )
  }
}
