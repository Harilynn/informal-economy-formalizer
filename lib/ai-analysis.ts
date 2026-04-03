import { Trader } from './mock-data'
import { generateCreditProfile } from './mock-data'
import { assessFraudRisk, analyzeSignalSpoofing, coldStartAssessment } from './fraud-detection'
import { generateComplianceReport } from './regulatory-compliance'

export interface AIAnalysisResult {
  traderId: string
  summary: string
  recommendations: string[]
  formalizationPlan: {
    phase: string
    description: string
    timeline: string
  }[]
  risks: string[]
  opportunities: string[]
}

/**
 * Comprehensive AI-powered analysis of a trader
 * Uses Claude to reason over multiple signals
 */
export async function analyzeTraderComprehensive(trader: Trader): Promise<AIAnalysisResult> {
  const creditProfile = generateCreditProfile(trader)
  const fraudIndicators = assessFraudRisk(trader)
  const spoofingAnalysis = analyzeSignalSpoofing(trader)
  const coldStart = coldStartAssessment(trader)
  const compliance = generateComplianceReport(trader)

  // Build context for AI
  const analysisContext = {
    trader: {
      name: trader.name,
      country: trader.country,
      businessType: trader.businessType,
      yearsInBusiness: trader.yearsInBusiness,
      monthlyRevenue: trader.monthlyRevenue,
    },
    creditProfile,
    fraudRisk: {
      highRiskIndicators: fraudIndicators.filter(i => i.riskLevel === 'high').length,
      mediumRiskIndicators: fraudIndicators.filter(i => i.riskLevel === 'medium').length,
    },
    spoofingRisk: spoofingAnalysis.isSpoof ? 'HIGH' : 'LOW',
    coldStart: coldStart ? {
      confidence: coldStart.confidence,
      score: coldStart.assessmentScore,
    } : null,
    complianceScore: compliance.overallCompliance,
  }

  // Create the analysis prompt
  const systemPrompt = `You are an expert in informal economy formalization, financial inclusion, and emerging market credit assessment.
You analyze trader data to identify the best path forward for integrating informal economy participants into formal financial systems.
Provide actionable, data-driven insights that balance risk mitigation with financial inclusion goals.`

  const userPrompt = `Analyze this trader profile and provide a comprehensive assessment:

Trader: ${trader.name} from ${trader.country}
Business: ${trader.businessType} (${trader.yearsInBusiness} years)
Monthly Revenue: ${trader.monthlyRevenue} (currency: local)

SIGNALS ANALYSIS:
- Mobile Payment Transactions: ${trader.mobilePaymentTransactions}/month
- Community Reputation: ${trader.communityReputation}/100
- Document Verification: ${trader.documentScore}/100
- Risk Score: ${trader.riskScore}/100

ANALYSIS RESULTS:
- Credit Score: ${creditProfile.creditScore} (recommended limit: ${creditProfile.recommendedCreditLimit})
- Risk Level: ${creditProfile.riskLevel}
- Fraud Risk: ${spoofingAnalysis.isSpoof ? 'Potential spoofing indicators detected' : 'Signals appear authentic'}
- Compliance Readiness: ${compliance.overallCompliance}%
${coldStart ? `- Cold-Start Assessment: Score ${coldStart.assessmentScore}/100` : ''}

Please provide:
1. A brief summary (2-3 sentences) of this trader's formalization readiness
2. Top 3-5 specific recommendations to move toward formal credit
3. A phased formalization plan with timeline
4. Key risks to monitor
5. Immediate opportunities to capitalize on

Format as JSON with keys: summary, recommendations, formalizationPlan (array with phase, description, timeline), risks, opportunities`

  // Return mock analysis that simulates AI response
  return generateMockAnalysis(trader, analysisContext)
}

/**
 * Mock AI analysis that simulates Claude responses
 * In production, this would call Claude API via Next.js API route
 */
export function generateMockAnalysis(trader: Trader, context: any): AIAnalysisResult {
  const creditProfile = generateCreditProfile(trader)
  const isHighRisk = creditProfile.riskLevel === 'high'
  const isColdStart = trader.yearsInBusiness < 2

  const summaries: Record<string, string> = {
    'high': `${trader.name} shows strong community trust with ${trader.communityReputation}/100 reputation but faces documentation gaps. Recommend enhanced KYC and transaction monitoring before credit issuance.`,
    'medium': `${trader.name} demonstrates solid business fundamentals with ${trader.mobilePaymentTransactions} monthly transactions. Ready for formal credit with structured onboarding program.`,
    'low': `${trader.name} is an excellent candidate for credit formalization with strong signals across all categories. Recommend expedited credit approval process.`,
  }

  const recommendations: Record<string, string[]> = {
    'high': [
      'Complete comprehensive KYC verification within 30 days',
      'Establish merchant account for direct payment settlement',
      'Provide 3-6 months of complete transaction records',
      'Schedule in-person verification by field agent',
      'Implement transaction monitoring for fraud detection',
    ],
    'medium': [
      'Submit documentation package (ID, business proof, references)',
      'Enroll in digital financial literacy program',
      'Set up WhatsApp Business account for formalization',
      'Establish credit facility with graduated limits',
      'Participate in monthly community trader network',
    ],
    'low': [
      'Fast-track credit facility approval',
      'Enroll in business development program',
      'Connect with microfinance lending partners',
      'Establish export/import opportunities',
      'Mentor other traders in community',
    ],
  }

  const formalizationPlans: Record<string, any[]> = {
    'high': [
      {
        phase: 'Phase 1: Enhanced Due Diligence',
        description: 'Complete KYC verification, source documentation, field agent visits',
        timeline: '2-4 weeks',
      },
      {
        phase: 'Phase 2: Transaction Monitoring',
        description: 'Establish baseline transaction patterns, set fraud detection parameters',
        timeline: '4-8 weeks',
      },
      {
        phase: 'Phase 3: Credit Assessment',
        description: 'Formal credit scoring, risk assessment, credit limit determination',
        timeline: '2-4 weeks',
      },
      {
        phase: 'Phase 4: Facility Issuance',
        description: 'Credit agreement signing, account setup, initial fund disbursement',
        timeline: '1-2 weeks',
      },
    ],
    'medium': [
      {
        phase: 'Phase 1: Registration & Onboarding',
        description: 'Collect required documents, basic KYC, platform setup',
        timeline: '1-2 weeks',
      },
      {
        phase: 'Phase 2: Credit Line Establishment',
        description: 'Issue initial credit limit based on historical performance',
        timeline: '1 week',
      },
      {
        phase: 'Phase 3: Financial Literacy Training',
        description: 'Monthly training on credit use, cash flow management, record keeping',
        timeline: 'Ongoing',
      },
      {
        phase: 'Phase 4: Performance Monitoring & Scaling',
        description: 'Quarterly reviews, credit limit increases based on performance',
        timeline: 'Quarterly',
      },
    ],
    'low': [
      {
        phase: 'Phase 1: Fast-Track Approval',
        description: 'Expedited credit approval based on strong signals',
        timeline: 'Immediate',
      },
      {
        phase: 'Phase 2: Premium Credit Facility',
        description: 'Issue enhanced credit terms and higher facility limits',
        timeline: '1 week',
      },
      {
        phase: 'Phase 3: Growth Program Enrollment',
        description: 'Access business expansion program and business partners network',
        timeline: 'Immediate',
      },
      {
        phase: 'Phase 4: Leadership Development',
        description: 'Enroll in advanced program to mentor other traders',
        timeline: 'Ongoing',
      },
    ],
  }

  const riskKey = isHighRisk ? 'high' : creditProfile.riskLevel === 'medium' ? 'medium' : 'low'
  
  const risks = [
    `Documentation gaps pose risk - ${100 - trader.documentScore}% of formal requirements not yet met`,
    `Monitor for transaction pattern changes that might indicate business distress`,
    isColdStart ? 'New business - requires enhanced monitoring during first 6 months' : 'Established business with proven track record',
  ]

  const opportunities = [
    `Community reputation score of ${trader.communityReputation} indicates strong market position`,
    `${trader.mobilePaymentTransactions} monthly transactions show consistent customer base`,
    `Potential to expand credit facility by ${Math.round(trader.monthlyRevenue * 2)} based on current performance`,
  ]

  return {
    traderId: trader.id,
    summary: summaries[riskKey],
    recommendations: recommendations[riskKey],
    formalizationPlan: formalizationPlans[riskKey],
    risks,
    opportunities,
  }
}

/**
 * Signal-based identity construction system
 * Hard Problem #1: Non-traditional signal parsing
 */
export function constructEconomicIdentity(trader: Trader) {
  const identityScore: Record<string, number> = {
    'transaction_history': 0,
    'social_proof': 0,
    'operational_consistency': 0,
    'regulatory_readiness': 0,
    'credit_worthiness': 0,
  }

  // Transaction history: 0-25 points
  identityScore['transaction_history'] = Math.min(
    (trader.mobilePaymentTransactions / 500) * 25,
    25
  )

  // Social proof: 0-25 points
  identityScore['social_proof'] = (trader.communityReputation / 100) * 25

  // Operational consistency: 0-20 points
  const consistencyScore = (trader.signals.filter(s => s.strength > 75).length / 5) * 20
  identityScore['operational_consistency'] = Math.min(consistencyScore, 20)

  // Regulatory readiness: 0-15 points
  identityScore['regulatory_readiness'] = Math.min(
    (trader.documentScore / 100) * 15,
    15
  )

  // Credit worthiness: 0-15 points
  const creditWorthiness = (trader.yearsInBusiness / 10) * 15
  identityScore['credit_worthiness'] = Math.min(creditWorthiness, 15)

  const totalIdentityScore = Object.values(identityScore).reduce((a, b) => a + b, 0)

  return {
    economicIdentityScore: Math.round(totalIdentityScore),
    breakdown: identityScore,
    identityStatus: totalIdentityScore >= 80 ? 'STRONG' : totalIdentityScore >= 50 ? 'DEVELOPING' : 'EMERGING',
  }
}
