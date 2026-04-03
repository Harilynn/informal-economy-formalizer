import { NextRequest, NextResponse } from 'next/server'
import { getTraderById } from '@/lib/mock-data'
import { generateComplianceReport } from '@/lib/regulatory-compliance'

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

    const complianceReport = generateComplianceReport(trader)

    return NextResponse.json(complianceReport)
  } catch (error) {
    console.error('[API] Compliance error:', error)
    return NextResponse.json(
      { error: 'Failed to generate compliance report' },
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

    const complianceReport = generateComplianceReport(trader)
    return NextResponse.json(complianceReport)
  } catch (error) {
    console.error('[API] Compliance GET error:', error)
    return NextResponse.json(
      { error: 'Failed to generate compliance report' },
      { status: 500 }
    )
  }
}
