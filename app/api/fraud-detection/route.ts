import { NextRequest, NextResponse } from 'next/server'
import { getTraderById } from '@/lib/mock-data'
import { assessFraudRisk, analyzeSignalSpoofing } from '@/lib/fraud-detection'

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

    const fraudIndicators = assessFraudRisk(trader)
    const spoofingAnalysis = analyzeSignalSpoofing(trader)

    // Calculate overall fraud risk
    const highRiskCount = fraudIndicators.filter(i => i.riskLevel === 'high').length
    const overallFraudRisk = highRiskCount > 0 ? 'HIGH' : fraudIndicators.length > 0 ? 'MEDIUM' : 'LOW'

    return NextResponse.json({
      traderId,
      overallFraudRisk,
      fraudIndicators,
      spoofingAnalysis,
      recommendation: spoofingAnalysis.isSpoof
        ? 'Recommend enhanced verification before proceeding'
        : 'Trader appears legitimate, proceed with standard KYC',
    })
  } catch (error) {
    console.error('[API] Fraud detection error:', error)
    return NextResponse.json(
      { error: 'Failed to detect fraud' },
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

    const fraudIndicators = assessFraudRisk(trader)
    const spoofingAnalysis = analyzeSignalSpoofing(trader)

    const highRiskCount = fraudIndicators.filter(i => i.riskLevel === 'high').length
    const overallFraudRisk = highRiskCount > 0 ? 'HIGH' : fraudIndicators.length > 0 ? 'MEDIUM' : 'LOW'

    return NextResponse.json({
      traderId,
      overallFraudRisk,
      fraudIndicators,
      spoofingAnalysis,
      recommendation: spoofingAnalysis.isSpoof
        ? 'Recommend enhanced verification before proceeding'
        : 'Trader appears legitimate, proceed with standard KYC',
    })
  } catch (error) {
    console.error('[API] Fraud detection GET error:', error)
    return NextResponse.json(
      { error: 'Failed to detect fraud' },
      { status: 500 }
    )
  }
}
