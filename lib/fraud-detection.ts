import { Trader } from './mock-data'

export interface FraudIndicator {
  category: string
  indicator: string
  riskLevel: 'low' | 'medium' | 'high'
  score: number
  evidence: string
}

export interface SignalSpoofingAnalysis {
  isSpoof: boolean
  confidence: number
  indicators: string[]
  recommendation: string
}

/**
 * Detects potential signal spoofing patterns using graph analysis
 * Hard Problem #1: Signal Spoofing Detection
 */
export function analyzeSignalSpoofing(trader: Trader): SignalSpoofingAnalysis {
  const indicators: string[] = []
  let spoofScore = 0

  // Pattern 1: Inconsistent transaction timing
  const mobilePaymentSignal = trader.signals.find(s => s.type === 'mobile_payment')
  const whatsappSignal = trader.signals.find(s => s.type === 'whatsapp_business')
  
  if (mobilePaymentSignal && whatsappSignal) {
    const timeDiff = new Date(whatsappSignal.timestamp).getTime() - 
                     new Date(mobilePaymentSignal.timestamp).getTime()
    if (timeDiff > 86400000) { // More than 1 day difference
      indicators.push('Unusual signal acquisition timing')
      spoofScore += 15
    }
  }

  // Pattern 2: Misaligned revenue and transaction counts
  const expectedTransactions = (trader.monthlyRevenue / trader.averageTransactionSize) * 0.8
  const anomaly = Math.abs(trader.mobilePaymentTransactions - expectedTransactions) / expectedTransactions
  if (anomaly > 0.3) {
    indicators.push('Transaction-revenue mismatch detected')
    spoofScore += 20
  }

  // Pattern 3: Community reputation vs document score gap
  const reputationDocGap = trader.communityReputation - trader.documentScore
  if (reputationDocGap > 45) {
    indicators.push('High reputation-documentation gap')
    spoofScore += 25
  }

  // Pattern 4: WhatsApp followers vs transaction ratio
  if (whatsappSignal) {
    const followersEstimate = trader.mobilePaymentTransactions * 1.5 // Estimated from engagement
    const whatsappStrength = whatsappSignal.strength
    if (whatsappStrength > 85 && trader.mobilePaymentTransactions < 200) {
      indicators.push('Unusually high WhatsApp engagement with low transaction volume')
      spoofScore += 20
    }
  }

  // Pattern 5: Years in business consistency
  if (trader.yearsInBusiness < 2 && trader.communityReputation > 85) {
    indicators.push('High community reputation for new business')
    spoofScore += 15
  }

  const confidence = Math.min(spoofScore / 100, 1)
  const isSpoof = spoofScore > 60

  return {
    isSpoof,
    confidence,
    indicators,
    recommendation: isSpoof 
      ? 'Recommend enhanced KYC verification and transactional audits'
      : 'Trader signals appear consistent and authentic',
  }
}

/**
 * Comprehensive fraud risk assessment
 */
export function assessFraudRisk(trader: Trader): FraudIndicator[] {
  const indicators: FraudIndicator[] = []

  // High-risk indicators
  if (trader.riskScore > 40) {
    indicators.push({
      category: 'Risk Assessment',
      indicator: 'Overall risk score exceeds threshold',
      riskLevel: 'high',
      score: trader.riskScore,
      evidence: `Risk score of ${trader.riskScore} exceeds safe threshold of 40`,
    })
  }

  // Transaction pattern anomalies
  const avgMonthlyTxn = trader.mobilePaymentTransactions
  const expectedTxn = trader.monthlyRevenue / trader.averageTransactionSize
  const variance = Math.abs(avgMonthlyTxn - expectedTxn) / expectedTxn

  if (variance > 0.25) {
    indicators.push({
      category: 'Transaction Patterns',
      indicator: 'Unusual transaction volume variance',
      riskLevel: variance > 0.4 ? 'high' : 'medium',
      score: Math.min(variance * 100, 95),
      evidence: `Expected ${expectedTxn.toFixed(0)} transactions, got ${avgMonthlyTxn}`,
    })
  }

  // Document verification gaps
  if (trader.documentScore < 30) {
    indicators.push({
      category: 'Documentation',
      indicator: 'Insufficient document verification',
      riskLevel: 'high',
      score: 100 - trader.documentScore,
      evidence: `Document score of ${trader.documentScore} indicates missing critical KYC documents`,
    })
  }

  // Community reputation vs document score mismatch
  const repDocGap = trader.communityReputation - trader.documentScore
  if (repDocGap > 40) {
    indicators.push({
      category: 'Consistency',
      indicator: 'Reputation-documentation gap',
      riskLevel: 'medium',
      score: repDocGap,
      evidence: `Community reputation (${trader.communityReputation}) significantly exceeds documentation (${trader.documentScore})`,
    })
  }

  // Mobile payment concentration
  const largeTransactionCount = Math.floor(trader.mobilePaymentTransactions * 0.15) // Estimate 15% large
  if (largeTransactionCount > trader.mobilePaymentTransactions * 0.2) {
    indicators.push({
      category: 'Transaction Size',
      indicator: 'High concentration of large transactions',
      riskLevel: 'medium',
      score: 45,
      evidence: `Estimated ${largeTransactionCount} large transactions out of ${trader.mobilePaymentTransactions} total`,
    })
  }

  // WhatsApp activity concentration
  const whatsappSignal = trader.signals.find(s => s.type === 'whatsapp_business')
  if (whatsappSignal && whatsappSignal.strength > 90 && trader.documentScore < 40) {
    indicators.push({
      category: 'Digital Presence',
      indicator: 'High social engagement with low formal documentation',
      riskLevel: 'medium',
      score: 55,
      evidence: `WhatsApp strength ${whatsappSignal.strength} but only ${trader.documentScore} document verification`,
    })
  }

  return indicators
}

/**
 * Cold-start solution for new traders with minimal history
 * Hard Problem #2: Cold Start Learning
 */
export function coldStartAssessment(trader: Trader) {
  if (trader.yearsInBusiness > 2) {
    return null // Not a cold-start case
  }

  const signals = [
    {
      weight: 0.3,
      score: trader.communityReputation,
      name: 'Community Validation',
    },
    {
      weight: 0.25,
      score: trader.mobilePaymentTransactions * 0.15,
      name: 'Transaction History',
    },
    {
      weight: 0.2,
      score: trader.documentScore,
      name: 'Documentation',
    },
    {
      weight: 0.15,
      score: (trader.yearsInBusiness / 2) * 100,
      name: 'Time in Market',
    },
    {
      weight: 0.1,
      score: trader.signals.filter(s => s.strength > 75).length * 20,
      name: 'Signal Quality',
    },
  ]

  const assessmentScore = signals.reduce((sum, signal) => 
    sum + (Math.min(signal.score, 100) * signal.weight), 0
  )

  return {
    isColdStart: true,
    assessmentScore: Math.round(assessmentScore),
    signalBreakdown: signals,
    confidence: Math.round((trader.signals.length / 5) * 100),
    recommendation: assessmentScore > 65
      ? 'Approve with enhanced monitoring during first 6 months'
      : 'Require additional verification before proceeding',
  }
}
