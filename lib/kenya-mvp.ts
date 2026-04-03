export type TransactionDirection = 'inflow' | 'outflow'

export interface ParsedTransaction {
  index: number
  date: string
  direction: TransactionDirection
  amountKes: number
  counterparty: string
  reference: string
  rawLine: string
}

export interface IntakeInput {
  phoneNumber: string
  consentGiven: boolean
  sourceLabel?: string
  statementText: string
}

export interface KenyaMvpFeatures {
  transactionCount: number
  inflowCount: number
  outflowCount: number
  totalInflowKes: number
  totalOutflowKes: number
  averageInflowKes: number
  averageOutflowKes: number
  activeDays: number
  regularityScore: number
  merchantDiversity: number
  counterpartyConcentration: number
  growthTrend: number
  weekendActivityShare: number
}

export interface KenyaMvpFraudAnalysis {
  fraudRiskScore: number
  fraudRiskBand: 'low' | 'medium' | 'high'
  flags: string[]
  confidence: number
}

export interface KenyaMvpScore {
  creditScore: number
  recommendedCreditLimitKes: number
  riskLevel: 'low' | 'medium' | 'high'
  confidenceScore: number
  underwritingSummary: string
}

export interface KenyaMvpDossier {
  summary: string
  sections: Array<{
    title: string
    bullets: string[]
  }>
  html: string
}

export interface KenyaMvpIntakeRecord {
  id: string
  createdAt: string
  updatedAt: string
  phoneNumber: string
  consentGiven: boolean
  sourceLabel: string
  statementText: string
  transactions: ParsedTransaction[]
  features: KenyaMvpFeatures
  fraud: KenyaMvpFraudAnalysis
  score: KenyaMvpScore
  dossier?: KenyaMvpDossier
}

const intakes = new Map<string, KenyaMvpIntakeRecord>()

export function createIntake(input: IntakeInput): KenyaMvpIntakeRecord {
  if (!input.phoneNumber.trim()) {
    throw new Error('phoneNumber is required')
  }

  if (!input.consentGiven) {
    throw new Error('Consent is required before processing statements')
  }

  const transactions = parseStatementText(input.statementText)
  const features = computeFeatures(transactions)
  const fraud = analyzeFraud(transactions, features)
  const score = generateScore(features, fraud)

  const now = new Date().toISOString()
  const record: KenyaMvpIntakeRecord = {
    id: `kenya-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: now,
    updatedAt: now,
    phoneNumber: input.phoneNumber.trim(),
    consentGiven: true,
    sourceLabel: input.sourceLabel?.trim() || 'WhatsApp submission',
    statementText: input.statementText,
    transactions,
    features,
    fraud,
    score,
  }

  intakes.set(record.id, record)
  return record
}

export function getIntake(id: string): KenyaMvpIntakeRecord | undefined {
  return intakes.get(id)
}

export function listIntakes(): KenyaMvpIntakeRecord[] {
  return Array.from(intakes.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function generateDossier(intake: KenyaMvpIntakeRecord): KenyaMvpDossier {
  const summary = buildSummary(intake)
  const sections = [
    {
      title: 'Identity & Consent',
      bullets: [
        `Phone: ${intake.phoneNumber}`,
        `Consent received: ${intake.consentGiven ? 'Yes' : 'No'}`,
        `Source: ${intake.sourceLabel}`,
        `Statement lines parsed: ${intake.transactions.length}`,
      ],
    },
    {
      title: 'Cashflow Pattern',
      bullets: [
        `Total inflow: KES ${formatKes(intake.features.totalInflowKes)}`,
        `Total outflow: KES ${formatKes(intake.features.totalOutflowKes)}`,
        `Active days: ${intake.features.activeDays}`,
        `Regularity score: ${intake.features.regularityScore}/100`,
      ],
    },
    {
      title: 'Risk & Confidence',
      bullets: [
        `Credit score: ${intake.score.creditScore}/850`,
        `Fraud band: ${intake.fraud.fraudRiskBand.toUpperCase()}`,
        `Confidence: ${intake.score.confidenceScore}%`,
        ...intake.fraud.flags.slice(0, 3).map(flag => `Flag: ${flag}`),
      ],
    },
    {
      title: 'Underwriting Recommendation',
      bullets: [
        intake.score.underwritingSummary,
        `Recommended credit line: KES ${formatKes(intake.score.recommendedCreditLimitKes)}`,
        intake.score.riskLevel === 'low'
          ? 'Suitable for fast-track microfinance review.'
          : 'Suitable for assisted review with field officer verification.',
      ],
    },
  ]

  return {
    summary,
    sections,
    html: renderDossierHtml(intake, summary, sections),
  }
}

function parseStatementText(statementText: string): ParsedTransaction[] {
  const lines = statementText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)

  const transactions: ParsedTransaction[] = []

  lines.forEach((line, index) => {
    const amountMatch = line.match(/(?:KES|KSh|Ksh|Ksh\.|KES\.)\s?([\d,]+(?:\.\d{1,2})?)/i) || line.match(/([\d,]+(?:\.\d{1,2})?)\s?(?:KES|KSh|Ksh)/i)
    if (!amountMatch) {
      return
    }

    const amountKes = Number(amountMatch[1].replace(/,/g, ''))
    if (!Number.isFinite(amountKes) || amountKes <= 0) {
      return
    }

    const direction = /\b(from|received|credit|inflow|deposit)\b/i.test(line)
      ? 'inflow'
      : /\b(to|paid|sent|debit|outflow|merchant payment|purchase)\b/i.test(line)
        ? 'outflow'
        : 'outflow'

    const counterpartyMatch = line.match(/\b(?:from|to|paid to|paid|received from)\s+([A-Za-z0-9 &.'-]{3,})/i)
    const referenceMatch = line.match(/\b(?:ref|reference|receipt|transaction)[:\s-]*([A-Za-z0-9-]{3,})/i)
    const dateMatch = line.match(/\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2})\b/)

    transactions.push({
      index,
      date: dateMatch ? normalizeDate(dateMatch[1]) : estimateDate(index),
      direction,
      amountKes,
      counterparty: cleanCounterparty(counterpartyMatch?.[1] || 'Unknown counterparty'),
      reference: referenceMatch?.[1] || `line-${index + 1}`,
      rawLine: line,
    })
  })

  return transactions
}

function computeFeatures(transactions: ParsedTransaction[]): KenyaMvpFeatures {
  const inflows = transactions.filter(transaction => transaction.direction === 'inflow')
  const outflows = transactions.filter(transaction => transaction.direction === 'outflow')
  const totalInflowKes = roundKes(sum(inflows.map(transaction => transaction.amountKes)))
  const totalOutflowKes = roundKes(sum(outflows.map(transaction => transaction.amountKes)))
  const averageInflowKes = inflows.length ? roundKes(totalInflowKes / inflows.length) : 0
  const averageOutflowKes = outflows.length ? roundKes(totalOutflowKes / outflows.length) : 0
  const uniqueDays = new Set(transactions.map(transaction => transaction.date)).size
  const merchantDiversity = new Set(outflows.map(transaction => transaction.counterparty.toLowerCase())).size
  const counterpartyCounts = countBy(transactions, transaction => transaction.counterparty.toLowerCase())
  const counterpartyConcentration = transactions.length
    ? roundNumber(Math.max(...Object.values(counterpartyCounts), 0) / transactions.length, 2)
    : 0

  const firstHalf = transactions.slice(0, Math.ceil(transactions.length / 2))
  const secondHalf = transactions.slice(Math.floor(transactions.length / 2))
  const firstHalfFlow = sum(firstHalf.map(transaction => transaction.amountKes))
  const secondHalfFlow = sum(secondHalf.map(transaction => transaction.amountKes))
  const growthTrend = firstHalfFlow === 0 ? 0 : roundNumber(((secondHalfFlow - firstHalfFlow) / firstHalfFlow) * 100, 1)

  const weekendActivityShare = transactions.length
    ? roundNumber(transactions.filter(transaction => {
      const day = new Date(transaction.date).getDay()
      return day === 0 || day === 6
    }).length / transactions.length, 2)
    : 0

  const regularityScore = transactions.length
    ? Math.min(100, Math.round((uniqueDays / transactions.length) * 100 + Math.min(merchantDiversity * 4, 25)))
    : 0

  return {
    transactionCount: transactions.length,
    inflowCount: inflows.length,
    outflowCount: outflows.length,
    totalInflowKes,
    totalOutflowKes,
    averageInflowKes,
    averageOutflowKes,
    activeDays: uniqueDays,
    regularityScore,
    merchantDiversity,
    counterpartyConcentration,
    growthTrend,
    weekendActivityShare,
  }
}

function analyzeFraud(transactions: ParsedTransaction[], features: KenyaMvpFeatures): KenyaMvpFraudAnalysis {
  const flags: string[] = []
  let fraudRiskScore = 0

  if (features.transactionCount >= 6 && features.counterpartyConcentration > 0.45) {
    flags.push('High concentration in a small number of counterparties')
    fraudRiskScore += 22
  }

  if (features.transactionCount >= 5) {
    const commonAmounts = topAmountFrequency(transactions)
    if (commonAmounts >= 0.5) {
      flags.push('Repeated transaction amounts suggest synthetic behavior')
      fraudRiskScore += 25
    }
  }

  if (features.growthTrend > 120) {
    flags.push('Sharp recent growth requires manual review')
    fraudRiskScore += 15
  }

  if (features.weekendActivityShare > 0.65 && features.transactionCount < 12) {
    flags.push('Weekend-heavy activity with sparse history')
    fraudRiskScore += 12
  }

  const inflowOutflowBalance = features.totalOutflowKes === 0
    ? features.totalInflowKes
    : Math.abs(features.totalInflowKes - features.totalOutflowKes) / features.totalOutflowKes

  if (inflowOutflowBalance < 0.08 && features.transactionCount > 8) {
    flags.push('Circular cashflow pattern may indicate round-tripping')
    fraudRiskScore += 20
  }

  if (transactions.some(transaction => /self|own|personal/i.test(transaction.counterparty))) {
    flags.push('Counterparty names indicate possible self-transfers')
    fraudRiskScore += 14
  }

  const confidence = transactions.length
    ? Math.min(100, Math.round(45 + features.regularityScore * 0.35 + Math.min(features.merchantDiversity * 4, 20)))
    : 0

  const fraudRiskBand = fraudRiskScore >= 50 ? 'high' : fraudRiskScore >= 25 ? 'medium' : 'low'

  return {
    fraudRiskScore: Math.min(100, fraudRiskScore),
    fraudRiskBand,
    flags: flags.length ? flags : ['No material spoofing indicators detected'],
    confidence,
  }
}

function generateScore(features: KenyaMvpFeatures, fraud: KenyaMvpFraudAnalysis): KenyaMvpScore {
  const cashflowComponent = Math.min(220, Math.round((features.totalInflowKes / 1000) * 2.8))
  const regularityComponent = Math.round(features.regularityScore * 1.5)
  const diversityComponent = Math.min(120, features.merchantDiversity * 12)
  const growthComponent = Math.max(-40, Math.min(80, Math.round(features.growthTrend / 2)))
  const fraudPenalty = Math.round(fraud.fraudRiskScore * 1.2)

  const creditScore = clamp(300 + cashflowComponent + regularityComponent + diversityComponent + growthComponent - fraudPenalty, 300, 850)
  const recommendedCreditLimitKes = Math.max(2500, Math.round(features.averageInflowKes * 2.5 + features.totalInflowKes * 0.15))
  const riskLevel = fraud.fraudRiskBand === 'high' || creditScore < 500
    ? 'high'
    : fraud.fraudRiskBand === 'medium' || creditScore < 650
      ? 'medium'
      : 'low'

  const confidenceScore = Math.max(35, Math.min(98, Math.round((features.regularityScore * 0.45) + (features.transactionCount * 3.2) + (fraud.confidence * 0.35))))

  const underwritingSummary = riskLevel === 'low'
    ? 'Profile supports fast-track microfinance review with documentary verification.'
    : riskLevel === 'medium'
      ? 'Profile is eligible for assisted underwriting with field verification and shorter initial limits.'
      : 'Profile needs manual review and stronger identity proof before credit issuance.'

  return {
    creditScore,
    recommendedCreditLimitKes,
    riskLevel,
    confidenceScore,
    underwritingSummary,
  }
}

function buildSummary(intake: KenyaMvpIntakeRecord): string {
  const firstSentence = intake.score.riskLevel === 'low'
    ? 'The statement shows stable cashflow and low fraud indicators.'
    : intake.score.riskLevel === 'medium'
      ? 'The statement shows usable cashflow with some review flags.'
      : 'The statement needs additional verification before a credit decision.'

  return `${firstSentence} The profile contains ${intake.features.transactionCount} parsed transactions, ${intake.features.merchantDiversity} unique counterparties, and a confidence score of ${intake.score.confidenceScore}%.`
}

function renderDossierHtml(intake: KenyaMvpIntakeRecord, summary: string, sections: KenyaMvpDossier['sections']): string {
  const sectionMarkup = sections
    .map(section => `
      <section style="margin: 0 0 20px; padding: 18px; border: 1px solid #dbe4ee; border-radius: 16px; background: #ffffff;">
        <h2 style="margin: 0 0 12px; font-size: 18px; color: #0f172a;">${escapeHtml(section.title)}</h2>
        <ul style="margin: 0; padding-inline-start: 18px; color: #334155; line-height: 1.7;">
          ${section.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
        </ul>
      </section>
    `)
    .join('')

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Kenya Credit Dossier</title>
    <style>
      body { margin: 0; font-family: Inter, Arial, sans-serif; background: #f5f7fb; color: #0f172a; }
      .page { max-inline-size: 900px; margin: 0 auto; padding: 28px 18px 40px; }
      .hero { padding: 28px; border-radius: 24px; background: linear-gradient(135deg, #0f172a 0%, #134e4a 100%); color: #fff; margin-block-end: 22px; }
      .hero h1 { margin: 0 0 8px; font-size: 30px; }
      .hero p { margin: 0; line-height: 1.7; color: rgba(255,255,255,0.88); }
      .meta { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 16px 0 0; }
      .pill { background: rgba(255,255,255,0.1); padding: 10px 12px; border-radius: 14px; }
      .pill small { display: block; opacity: 0.8; margin-block-end: 4px; }
      .pill strong { font-size: 18px; }
      .footer { margin-block-start: 18px; color: #64748b; font-size: 12px; line-height: 1.6; }
      @media print { body { background: #fff; } .page { padding: 0; } .hero { border-radius: 0; } }
    </style>
  </head>
  <body>
    <div class="page">
      <header class="hero">
        <h1>Kenya Credit Dossier</h1>
        <p>${escapeHtml(summary)}</p>
        <div class="meta">
          <div class="pill"><small>Score</small><strong>${intake.score.creditScore}</strong></div>
          <div class="pill"><small>Credit Limit</small><strong>KES ${formatKes(intake.score.recommendedCreditLimitKes)}</strong></div>
          <div class="pill"><small>Risk</small><strong>${escapeHtml(intake.score.riskLevel.toUpperCase())}</strong></div>
          <div class="pill"><small>Confidence</small><strong>${intake.score.confidenceScore}%</strong></div>
        </div>
      </header>
      ${sectionMarkup}
      <div class="footer">
        Generated for ${escapeHtml(intake.phoneNumber)} using Kenya MVP statement analysis. This dossier is intended for field officer review and lender triage.
      </div>
    </div>
  </body>
</html>`
}

function normalizeDate(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value
  }

  const parts = value.split(/[/-]/).map(part => part.padStart(2, '0'))
  if (parts.length === 3) {
    const [day, month, year] = parts[0].length === 4 ? [parts[2], parts[1], parts[0]] : parts
    const normalizedYear = year.length === 2 ? `20${year}` : year
    return `${normalizedYear}-${month}-${day}`
  }

  return estimateDate(0)
}

function estimateDate(offset: number): string {
  const date = new Date()
  date.setDate(date.getDate() - offset)
  return date.toISOString().slice(0, 10)
}

function cleanCounterparty(value: string): string {
  return value
    .replace(/\b(?:statement|reference|receipt|transaction)\b.*$/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[,:-]+|[,:-]+$/g, '') || 'Unknown counterparty'
}

function topAmountFrequency(transactions: ParsedTransaction[]): number {
  if (!transactions.length) {
    return 0
  }

  const counts = countBy(transactions, transaction => transaction.amountKes.toFixed(0))
  const topCount = Math.max(...Object.values(counts), 0)
  return topCount / transactions.length
}

function countBy<T>(items: T[], getKey: (item: T) => string): Record<string, number> {
  return items.reduce<Record<string, number>>((accumulator, item) => {
    const key = getKey(item)
    accumulator[key] = (accumulator[key] || 0) + 1
    return accumulator
  }, {})
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function roundKes(value: number): number {
  return Math.round(value)
}

function roundNumber(value: number, precision: number): number {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

function formatKes(value: number): string {
  return new Intl.NumberFormat('en-KE').format(Math.round(value))
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}