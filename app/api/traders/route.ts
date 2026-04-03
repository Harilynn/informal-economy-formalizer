import { NextRequest, NextResponse } from 'next/server'
import { mockTraders, getTraderById, generateCreditProfile } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const traderId = searchParams.get('id')
    const country = searchParams.get('country')
    const search = searchParams.get('search')

    if (traderId) {
      const trader = getTraderById(traderId)
      if (!trader) {
        return NextResponse.json(
          { success: false, error: 'Trader not found' },
          { status: 404 }
        )
      }
      const creditProfile = generateCreditProfile(trader)
      return NextResponse.json({
        success: true,
        data: { ...trader, creditProfile }
      })
    }

    let filteredTraders = mockTraders

    if (country) {
      filteredTraders = filteredTraders.filter(t => t.country === country)
    }

    if (search) {
      const term = search.toLowerCase()
      filteredTraders = filteredTraders.filter(t =>
        t.name.toLowerCase().includes(term) ||
        t.businessType.toLowerCase().includes(term) ||
        t.city.toLowerCase().includes(term)
      )
    }

    // Add credit profiles to response
    const tradersWithProfiles = filteredTraders.map(trader => ({
      ...trader,
      creditProfile: generateCreditProfile(trader)
    }))

    return NextResponse.json({
      success: true,
      data: tradersWithProfiles,
      count: tradersWithProfiles.length
    })
  } catch (error) {
    console.error('[API] Traders GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch traders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === 'search') {
      const { query } = body
      const results = mockTraders.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.businessType.toLowerCase().includes(query.toLowerCase()) ||
        t.city.toLowerCase().includes(query.toLowerCase())
      )
      return NextResponse.json({
        success: true,
        data: results,
        count: results.length
      })
    }

    if (action === 'get-credit-profile') {
      const { traderId } = body
      const trader = getTraderById(traderId)
      if (!trader) {
        return NextResponse.json(
          { success: false, error: 'Trader not found' },
          { status: 404 }
        )
      }
      const creditProfile = generateCreditProfile(trader)
      return NextResponse.json({
        success: true,
        data: creditProfile
      })
    }

    return NextResponse.json(
      { success: false, error: 'Unknown action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('[API] Traders POST error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
