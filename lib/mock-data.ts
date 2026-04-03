// Mock trader data with realistic informal economy patterns
export interface Trader {
  id: string
  name: string
  country: string
  city: string
  businessType: string
  yearsInBusiness: number
  monthlyRevenue: number
  phoneNumber: string
  whatsappActive: boolean
  mobilePaymentTransactions: number
  averageTransactionSize: number
  communityReputation: number // 0-100
  documentScore: number // 0-100
  riskScore: number // 0-100
  signals: TraderSignal[]
}

export interface TraderSignal {
  type: 'mobile_payment' | 'whatsapp_business' | 'foot_traffic' | 'community' | 'document'
  strength: number // 0-100
  evidence: string
  timestamp: string
}

export interface CreditProfile {
  traderId: string
  creditScore: number // 300-850
  recommendedCreditLimit: number
  riskLevel: 'low' | 'medium' | 'high'
  formalizationScore: number // 0-100
  fraudRiskScore: number // 0-100
}

export const mockTraders: Trader[] = [
  {
    id: 'trader-001',
    name: 'Margaret Wairimu',
    country: 'Kenya',
    city: 'Nairobi',
    businessType: 'Fresh Produce',
    yearsInBusiness: 8,
    monthlyRevenue: 45000,
    phoneNumber: '+254701234567',
    whatsappActive: true,
    mobilePaymentTransactions: 342,
    averageTransactionSize: 2500,
    communityReputation: 92,
    documentScore: 45,
    riskScore: 15,
    signals: [
      { type: 'mobile_payment', strength: 95, evidence: '342 M-Pesa transactions last month', timestamp: '2024-01-15' },
      { type: 'whatsapp_business', strength: 88, evidence: 'Active business catalog with 200+ followers', timestamp: '2024-01-14' },
      { type: 'foot_traffic', strength: 85, evidence: 'Daily footfall patterns show 150+ customers weekly', timestamp: '2024-01-13' },
      { type: 'community', strength: 92, evidence: '15+ community references', timestamp: '2024-01-12' },
    ],
  },
  {
    id: 'trader-002',
    name: 'James Kimani',
    country: 'Kenya',
    city: 'Mombasa',
    businessType: 'Clothing Retail',
    yearsInBusiness: 5,
    monthlyRevenue: 62000,
    phoneNumber: '+254702345678',
    whatsappActive: true,
    mobilePaymentTransactions: 456,
    averageTransactionSize: 3200,
    communityReputation: 88,
    documentScore: 35,
    riskScore: 22,
    signals: [
      { type: 'mobile_payment', strength: 92, evidence: '456 transactions, growing 8% monthly', timestamp: '2024-01-15' },
      { type: 'whatsapp_business', strength: 85, evidence: 'Fashion showcase with 500+ followers', timestamp: '2024-01-14' },
      { type: 'foot_traffic', strength: 78, evidence: 'High-traffic market location analysis', timestamp: '2024-01-13' },
      { type: 'community', strength: 88, evidence: 'Trusted by 12 vendors', timestamp: '2024-01-12' },
    ],
  },
  {
    id: 'trader-003',
    name: 'Amina Hassan',
    country: 'Kenya',
    city: 'Kisumu',
    businessType: 'Fish Supplies',
    yearsInBusiness: 12,
    monthlyRevenue: 85000,
    phoneNumber: '+254703456789',
    whatsappActive: true,
    mobilePaymentTransactions: 523,
    averageTransactionSize: 4100,
    communityReputation: 95,
    documentScore: 52,
    riskScore: 12,
    signals: [
      { type: 'mobile_payment', strength: 96, evidence: '523 transactions, highest volume in category', timestamp: '2024-01-15' },
      { type: 'whatsapp_business', strength: 91, evidence: 'Supply catalog with 800+ followers', timestamp: '2024-01-14' },
      { type: 'foot_traffic', strength: 88, evidence: 'Lakeside market, 10+ competitor references', timestamp: '2024-01-13' },
      { type: 'community', strength: 95, evidence: 'Supplier to 25+ restaurants and hotels', timestamp: '2024-01-12' },
    ],
  },
  {
    id: 'trader-004',
    name: 'David Omondi',
    country: 'Kenya',
    city: 'Nakuru',
    businessType: 'Phone Repair',
    yearsInBusiness: 3,
    monthlyRevenue: 28000,
    phoneNumber: '+254704567890',
    whatsappActive: true,
    mobilePaymentTransactions: 215,
    averageTransactionSize: 1850,
    communityReputation: 76,
    documentScore: 28,
    riskScore: 35,
    signals: [
      { type: 'mobile_payment', strength: 82, evidence: '215 transactions, growing rapidly', timestamp: '2024-01-15' },
      { type: 'whatsapp_business', strength: 78, evidence: 'Service offers with 300+ followers', timestamp: '2024-01-14' },
      { type: 'foot_traffic', strength: 72, evidence: 'Shopping mall location verified', timestamp: '2024-01-13' },
      { type: 'community', strength: 76, evidence: '8 verified customers', timestamp: '2024-01-12' },
    ],
  },
  {
    id: 'trader-005',
    name: 'Fatima Ibrahim',
    country: 'Kenya',
    city: 'Dar es Salaam',
    businessType: 'Food Catering',
    yearsInBusiness: 6,
    monthlyRevenue: 72000,
    phoneNumber: '+254705678901',
    whatsappActive: true,
    mobilePaymentTransactions: 389,
    averageTransactionSize: 2900,
    communityReputation: 91,
    documentScore: 58,
    riskScore: 18,
    signals: [
      { type: 'mobile_payment', strength: 89, evidence: '389 catering orders monthly', timestamp: '2024-01-15' },
      { type: 'whatsapp_business', strength: 87, evidence: 'Menu catalog with 650+ followers', timestamp: '2024-01-14' },
      { type: 'foot_traffic', strength: 83, evidence: 'Multiple event locations', timestamp: '2024-01-13' },
      { type: 'community', strength: 91, evidence: 'Corporate client base', timestamp: '2024-01-12' },
    ],
  },
]

export function getTraderById(id: string): Trader | undefined {
  return mockTraders.find(t => t.id === id)
}

export function generateCreditProfile(trader: Trader): CreditProfile {
  // Weighted scoring algorithm
  const mobilPaymentScore = trader.mobilePaymentTransactions * 0.15
  const communityScore = trader.communityReputation * 1.5
  const revenueScore = Math.min(trader.monthlyRevenue / 1000, 85)
  const yearsScore = Math.min(trader.yearsInBusiness * 8, 80)
  
  const baseScore = (mobilPaymentScore + communityScore + revenueScore + yearsScore) / 4
  const creditScore = Math.round(300 + (baseScore * 5.5))
  
  const formalizationScore = (
    (trader.mobilePaymentTransactions / 600) * 30 +
    (trader.communityReputation / 100) * 40 +
    (trader.documentScore / 100) * 20 +
    (trader.yearsInBusiness / 15) * 10
  )
  
  return {
    traderId: trader.id,
    creditScore: Math.min(850, Math.max(300, creditScore)),
    recommendedCreditLimit: trader.monthlyRevenue * 3,
    riskLevel: trader.riskScore > 30 ? 'high' : trader.riskScore > 15 ? 'medium' : 'low',
    formalizationScore: Math.round(formalizationScore),
    fraudRiskScore: trader.riskScore,
  }
}

export const mockAgents = [
  {
    id: 'agent-001',
    name: 'Charles Kipchoge',
    country: 'Kenya',
    region: 'Central',
    activeTraders: 42,
    rating: 4.8,
    successRate: 94,
  },
  {
    id: 'agent-002',
    name: 'Rachel Kariuki',
    country: 'Kenya',
    region: 'Rift Valley',
    activeTraders: 35,
    rating: 4.6,
    successRate: 91,
  },
  {
    id: 'agent-003',
    name: 'Samuel Okoye',
    country: 'Nigeria',
    region: 'Lagos',
    activeTraders: 28,
    rating: 4.5,
    successRate: 88,
  },
]
