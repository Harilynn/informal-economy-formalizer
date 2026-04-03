import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/credit-profile
 * Generates a credit profile from trader signals
 * 
 * Request body:
 * {
 *   traderId: string
 *   mobileData: array
 *   businessPatterns: object
 *   communityReputation: array
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { traderId, mobileTransactions, businessAge } = body

    if (!traderId) {
      return NextResponse.json(
        { success: false, error: 'traderId is required' },
        { status: 400 }
      )
    }

    // Simulate AI scoring algorithm
    // In production, this would call ML model, fraud detection, etc.
    const score = Math.min(
      100,
      Math.floor(
        (mobileTransactions?.length || 0) * 0.5 +
        (businessAge || 0) * 10 +
        Math.random() * 20
      )
    )

    // Map score to credit recommendation
    let creditRecommendation = 5000
    if (score >= 80) creditRecommendation = 25000
    else if (score >= 70) creditRecommendation = 15000
    else if (score >= 60) creditRecommendation = 8000
    else if (score >= 50) creditRecommendation = 3000

    // Map score to risk level
    let riskLevel = 'High'
    if (score >= 75) riskLevel = 'Low'
    else if (score >= 60) riskLevel = 'Medium'

    const creditProfile = {
      traderId,
      score,
      recommendedCredit: creditRecommendation,
      riskLevel,
      trustScore: Math.floor(70 + Math.random() * 30),
      verifiedSignals: Math.floor(6 + Math.random() * 6),
      totalSignals: 12,
      generatedAt: new Date().toISOString(),
      narrative: generateNarrative(score, creditRecommendation, businessAge),
    }

    return NextResponse.json({
      success: true,
      data: creditProfile,
      message: 'Credit profile generated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate credit profile' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/credit-profile?traderId=xxx
 * Retrieve existing credit profile
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const traderId = searchParams.get('traderId')

    if (!traderId) {
      return NextResponse.json(
        { success: false, error: 'traderId is required' },
        { status: 400 }
      )
    }

    // In real app, fetch from database
    const creditProfile = {
      traderId,
      score: 85,
      recommendedCredit: 20000,
      riskLevel: 'Low',
      trustScore: 92,
      verifiedSignals: 9,
      totalSignals: 12,
      generatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: creditProfile
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch credit profile' },
      { status: 500 }
    )
  }
}

function generateNarrative(score: number, credit: number, businessAge: number): string {
  const months = businessAge || 12
  const reliability = score >= 75 ? 'excellent' : score >= 60 ? 'good' : 'fair'

  return `Based on M-Pesa transaction analysis, WhatsApp business patterns, and community verification, 
this trader shows ${reliability} credit potential. With ${months} months of business history and consistent 
transaction patterns, they are recommended for a credit line of approximately KES ${credit}. 
The trader demonstrates strong payment discipline with minimal irregular patterns. 
Recommend for microfinance product eligibility.`
}
