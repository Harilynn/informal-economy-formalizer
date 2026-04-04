import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/analytics
 * Returns comprehensive platform analytics
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period') || 'month' // day, week, month, year

    // Simulate data based on period
    const analytics = {
      period,
      summary: {
        totalTraders: 1248,
        completedFormalizations: 913,
        completionRate: 73.2,
        totalCreditUnlocked: 42500000,
        averageCreditScore: 642,
      },
      growth: {
        newTraders: calculateGrowth(period),
        formalizedThisMonth: 167,
        creditGrowthPercent: 12.5,
      },
      byCountry: [
        { country: 'Nigeria', traders: 340, completed: 248, rate: 73, credit: 8900000 },
        { country: 'Kenya', traders: 320, completed: 249, rate: 78, credit: 8500000 },
        { country: 'India', traders: 245, completed: 176, rate: 72, credit: 6200000 },
        { country: 'Philippines', traders: 198, completed: 135, rate: 68, credit: 5100000 },
        { country: 'Ghana', traders: 145, completed: 94, rate: 65, credit: 3800000 },
      ],
      byBusinessType: [
        { type: 'Retail Trade', count: 320 },
        { type: 'Services', count: 245 },
        { type: 'Manufacturing', count: 180 },
        { type: 'Agriculture', count: 156 },
        { type: 'Transport', count: 127 },
        { type: 'Hospitality', count: 100 },
      ],
      creditScoreDistribution: {
        excellent: 145,    // 800+
        good: 230,         // 700-799
        fair: 310,         // 600-699
        poor: 185,         // 500-599
        veryPoor: 48,      // <500
      },
      signalQuality: {
        mobileData: 92,
        businessPattern: 85,
        communityReputation: 78,
        physical: 65,
      },
      risks: {
        potentialFraud: 12,
        dataQualityIssues: 34,
        incompleteFormalizations: 98,
      },
      timestamps: {
        lastUpdated: new Date().toISOString(),
        nextUpdate: new Date(Date.now() + 3600000).toISOString(),
      }
    }

    return NextResponse.json({
      success: true,
      data: analytics
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

function calculateGrowth(period: string): number {
  const baseValues: Record<string, number> = {
    day: 8,
    week: 45,
    month: 167,
    year: 1248,
  }
  return baseValues[period] || 167
}
