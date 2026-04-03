import { Trader } from './mock-data'

export interface ComplianceRequirement {
  jurisdiction: string
  requirement: string
  status: 'met' | 'pending' | 'missing'
  criticalityLevel: 'critical' | 'high' | 'medium' | 'low'
  documentation: string[]
  deadline?: string
}

export interface RegulatoryReport {
  traderId: string
  country: string
  overallCompliance: number
  requirements: ComplianceRequirement[]
  nextSteps: string[]
  estimatedTimeToFormalize: string
}

/**
 * Hard Problem #3: Multi-Country Regulatory Mapping
 * Maps trader data to regulatory requirements by jurisdiction
 */
export const reguoryRequirements: Record<string, ComplianceRequirement[]> = {
  'Kenya': [
    {
      jurisdiction: 'Kenya',
      requirement: 'Business Registration (BRIMS)',
      status: 'pending',
      criticalityLevel: 'critical',
      documentation: ['National ID', 'Business Plan', 'Premises proof'],
      deadline: '2024-04-15',
    },
    {
      jurisdiction: 'Kenya',
      requirement: 'Tax Identification Number (TIN)',
      status: 'pending',
      criticalityLevel: 'critical',
      documentation: ['Business Registration', 'Income statement'],
      deadline: '2024-05-01',
    },
    {
      jurisdiction: 'Kenya',
      requirement: 'Mobile Money Compliance (CBK)',
      status: 'met',
      criticalityLevel: 'high',
      documentation: ['KYC Form', 'Transaction records'],
    },
    {
      jurisdiction: 'Kenya',
      requirement: 'FIDA Compliance (for lending)',
      status: 'pending',
      criticalityLevel: 'high',
      documentation: ['Credit agreement', 'Disclosure form'],
      deadline: '2024-06-01',
    },
    {
      jurisdiction: 'Kenya',
      requirement: 'VAT Registration (if applicable)',
      status: 'missing',
      criticalityLevel: 'medium',
      documentation: ['Annual sales projection', 'Tax compliance history'],
    },
    {
      jurisdiction: 'Kenya',
      requirement: 'Social Security (NSSF)',
      status: 'missing',
      criticalityLevel: 'medium',
      documentation: ['Employee list', 'Salary records'],
    },
  ],
  'Nigeria': [
    {
      jurisdiction: 'Nigeria',
      requirement: 'Business Registration (CAC)',
      status: 'pending',
      criticalityLevel: 'critical',
      documentation: ['National ID', 'Business documents'],
      deadline: '2024-04-30',
    },
    {
      jurisdiction: 'Nigeria',
      requirement: 'Tax Identification Number (TIN)',
      status: 'pending',
      criticalityLevel: 'critical',
      documentation: ['CAC registration', 'Tax return'],
    },
    {
      jurisdiction: 'Nigeria',
      requirement: 'CBN FinTech Compliance',
      status: 'pending',
      criticalityLevel: 'high',
      documentation: ['Bank statement', 'Transaction records'],
    },
    {
      jurisdiction: 'Nigeria',
      requirement: 'FIRS Tax Compliance',
      status: 'missing',
      criticalityLevel: 'high',
      documentation: ['Business plan', 'Financial statements'],
    },
  ],
  'Philippines': [
    {
      jurisdiction: 'Philippines',
      requirement: 'SEC Business Name Registration',
      status: 'pending',
      criticalityLevel: 'critical',
      documentation: ['Philippine ID', 'Barangay clearance'],
      deadline: '2024-05-15',
    },
    {
      jurisdiction: 'Philippines',
      requirement: 'BIR Tax Registration',
      status: 'pending',
      criticalityLevel: 'critical',
      documentation: ['SEC registration', 'DTI authorization'],
    },
    {
      jurisdiction: 'Philippines',
      requirement: 'Barangay Business Clearance',
      status: 'met',
      criticalityLevel: 'medium',
      documentation: ['Barangay office approval'],
    },
    {
      jurisdiction: 'Philippines',
      requirement: 'SSS Employer Registration (if applicable)',
      status: 'missing',
      criticalityLevel: 'medium',
      documentation: ['Employee information'],
    },
  ],
}

/**
 * Generates compliance roadmap for trader
 */
export function generateComplianceReport(trader: Trader): RegulatoryReport {
  const requirements = reguoryRequirements[trader.country] || []
  
  // Adjust status based on trader's signals
  const adjustedRequirements = requirements.map(req => {
    let status = req.status

    if (trader.documentScore > 70 && req.status === 'missing') {
      status = 'pending'
    }
    if (trader.yearsInBusiness > 3 && req.criticalityLevel === 'medium') {
      status = 'met'
    }
    if (trader.communityReputation > 90 && req.criticalityLevel === 'low') {
      status = 'met'
    }

    return { ...req, status }
  })

  // Calculate overall compliance
  const metCount = adjustedRequirements.filter(r => r.status === 'met').length
  const overallCompliance = Math.round((metCount / adjustedRequirements.length) * 100)

  // Generate next steps
  const nextSteps = generateNextSteps(trader, adjustedRequirements)
  
  // Estimate time to formalize
  const pendingCritical = adjustedRequirements.filter(
    r => r.status === 'pending' && r.criticalityLevel === 'critical'
  ).length
  const estimatedTimeToFormalize = estimateFormalizedTime(pendingCritical)

  return {
    traderId: trader.id,
    country: trader.country,
    overallCompliance,
    requirements: adjustedRequirements,
    nextSteps,
    estimatedTimeToFormalize,
  }
}

function generateNextSteps(trader: Trader, requirements: ComplianceRequirement[]): string[] {
  const steps: string[] = []

  const criticalPending = requirements.filter(
    r => r.status === 'pending' && r.criticalityLevel === 'critical'
  )

  if (criticalPending.length > 0) {
    steps.push(`Complete critical requirements: ${criticalPending.map(r => r.requirement).join(', ')}`)
  }

  if (trader.documentScore < 50) {
    steps.push('Provide additional documentation for KYC verification')
  }

  if (trader.yearsInBusiness < 2) {
    steps.push('Maintain transaction records for next 6 months for cold-start assessment')
  }

  const highPriority = requirements.filter(r => r.status === 'missing' && r.criticalityLevel === 'high')
  if (highPriority.length > 0) {
    steps.push(`Address high-priority items: ${highPriority.map(r => r.requirement).join(', ')}`)
  }

  steps.push('Schedule monthly compliance review')

  return steps
}

function estimateFormalizedTime(criticalCount: number): string {
  if (criticalCount === 0) return '2-3 weeks'
  if (criticalCount === 1) return '4-6 weeks'
  if (criticalCount === 2) return '8-12 weeks'
  return '12+ weeks'
}

/**
 * Multi-language support for regulatory requirements
 */
export const regulatoryTranslations: Record<string, Record<string, string>> = {
  'swahili': {
    'Business Registration (BRIMS)': 'Usajili wa Biashara',
    'Tax Identification Number (TIN)': 'Namba ya Kitambulisho cha Kodi',
    'Mobile Money Compliance (CBK)': 'Ukamilifu wa Pesa za Simu',
    'FIDA Compliance (for lending)': 'Ukamilifu wa FIDA',
  },
  'yoruba': {
    'Business Registration (CAC)': 'Iyalẹnu Iṣe-ajo',
    'Tax Identification Number (TIN)': 'Nọmba Idanimọ Owo-ile',
  },
  'tagalog': {
    'SEC Business Name Registration': 'Pagpaparehistro ng Negosyo',
    'BIR Tax Registration': 'Pagpaparehistro ng Buwis',
  },
}
