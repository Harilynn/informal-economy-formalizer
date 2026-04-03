'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Download,
  FileText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react'

type IntakeResponse = {
  id: string
  phoneNumber: string
  createdAt: string
  transactions: Array<{
    date: string
    direction: 'inflow' | 'outflow'
    amountKes: number
    counterparty: string
    rawLine: string
  }>
  features: {
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
  fraud: {
    fraudRiskScore: number
    fraudRiskBand: 'low' | 'medium' | 'high'
    flags: string[]
    confidence: number
  }
  score: {
    creditScore: number
    recommendedCreditLimitKes: number
    riskLevel: 'low' | 'medium' | 'high'
    confidenceScore: number
    underwritingSummary: string
  }
}

type DossierResponse = {
  summary: string
  sections: Array<{
    title: string
    bullets: string[]
  }>
  html: string
}

const sampleStatements = {
  foodStall: `01/03/2026 Pochi La Biashara received from A. Market KES 2,400 ref MP123
01/03/2026 Merchant payment to Flour Hub KES 1,800 ref MP124
02/03/2026 received from J. Otieno KES 3,100 ref MP125
02/03/2026 Merchant payment to Wholesale Corner KES 2,500 ref MP126
03/03/2026 received from N. Traders KES 2,900 ref MP127
04/03/2026 Merchant payment to Sack Center KES 1,200 ref MP128
05/03/2026 received from A. Market KES 2,700 ref MP129
06/03/2026 Merchant payment to Flour Hub KES 1,900 ref MP130`,
  retailShop: `01/03/2026 received from K. Nduta KES 5,200 ref MP211
01/03/2026 Merchant payment to Supplier One KES 4,100 ref MP212
02/03/2026 received from S. Mugo KES 4,800 ref MP213
03/03/2026 Merchant payment to Supplier One KES 4,000 ref MP214
04/03/2026 received from K. Nduta KES 5,500 ref MP215
05/03/2026 Merchant payment to Supplier Two KES 3,900 ref MP216
06/03/2026 received from B. Wambui KES 5,100 ref MP217`,
}

export default function KenyaMvpPage() {
  const [phoneNumber, setPhoneNumber] = useState('+2547')
  const [statementText, setStatementText] = useState(sampleStatements.foodStall)
  const [sourceLabel, setSourceLabel] = useState('WhatsApp export')
  const [consentGiven, setConsentGiven] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [intake, setIntake] = useState<IntakeResponse | null>(null)
  const [dossier, setDossier] = useState<DossierResponse | null>(null)

  const loadSample = (key: keyof typeof sampleStatements) => {
    setStatementText(sampleStatements[key])
    setError('')
  }

  const submitFlow = async () => {
    setLoading(true)
    setError('')
    setDossier(null)

    try {
      const intakeResponse = await fetch('/api/kenya/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          sourceLabel,
          consentGiven,
          statementText,
        }),
      })

      const intakeJson = await intakeResponse.json()

      if (!intakeResponse.ok || !intakeJson.success) {
        throw new Error(intakeJson.error || 'Failed to process intake')
      }

      setIntake(intakeJson.data)

      const dossierResponse = await fetch('/api/kenya/dossier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intakeId: intakeJson.data.id }),
      })

      const dossierJson = await dossierResponse.json()
      if (!dossierResponse.ok || !dossierJson.success) {
        throw new Error(dossierJson.error || 'Failed to generate dossier')
      }

      setDossier(dossierJson.data)
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const downloadDossier = () => {
    if (!dossier?.html) {
      return
    }

    const blob = new Blob([dossier.html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `kenya-credit-dossier-${intake?.id || 'report'}.html`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(19,78,74,0.16),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.10),_transparent_25%),linear-gradient(180deg,_rgba(2,132,199,0.04),_transparent_28%)]" />

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="gap-2 px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Kenya-first MVP
              </Badge>
              <Badge className="gap-2 px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                Consent-led
              </Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Turn M-Pesa history into a lender-ready credit dossier.
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
                Paste a statement export, run the Kenya-only ingestion flow, and generate a structured credit profile with fraud flags, score confidence, and an exportable dossier in one pass.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <Smartphone className="mb-3 h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">WhatsApp-ready intake</p>
                  <p className="mt-1 text-sm text-muted-foreground">Designed for statement sharing through the channel users already trust.</p>
                </CardContent>
              </Card>
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <TrendingUp className="mb-3 h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Rule-based signal extraction</p>
                  <p className="mt-1 text-sm text-muted-foreground">Extract cashflow, regularity, and concentration from messy text exports.</p>
                </CardContent>
              </Card>
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <Bot className="mb-3 h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Instant dossier output</p>
                  <p className="mt-1 text-sm text-muted-foreground">Produces an underwriting summary and printable HTML dossier for field review.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="border-0 bg-card/90 shadow-2xl shadow-slate-950/10 backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-5 w-5 text-primary" />
                Statement intake
              </CardTitle>
              <CardDescription>
                Use a sample statement or paste a real export from a field officer or WhatsApp conversation transcript.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" type="button" onClick={() => loadSample('foodStall')}>
                  Load food stall sample
                </Button>
                <Button variant="outline" type="button" onClick={() => loadSample('retailShop')}>
                  Load retail sample
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} placeholder="+2547..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Source label</Label>
                <Input id="source" value={sourceLabel} onChange={event => setSourceLabel(event.target.value)} placeholder="WhatsApp export" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statement">M-Pesa statement text</Label>
                <Textarea
                  id="statement"
                  value={statementText}
                  onChange={event => setStatementText(event.target.value)}
                  className="min-h-[220px] font-mono text-sm"
                  placeholder="Paste statement lines here"
                />
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-border/70 bg-secondary/30 p-4 text-sm">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={event => setConsentGiven(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-border"
                />
                <span>
                  I confirm the user has consented to statement analysis for credit assessment and dossier generation.
                </span>
              </label>

              {error ? (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  <TriangleAlert className="mt-0.5 h-4 w-4" />
                  <span>{error}</span>
                </div>
              ) : null}

              <Button className="w-full gap-2" size="lg" onClick={submitFlow} disabled={loading}>
                {loading ? 'Processing statement...' : 'Run Kenya intake'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Signal processing output</CardTitle>
              <CardDescription>Parsed transactions, feature extraction, and fraud scoring.</CardDescription>
            </CardHeader>
            <CardContent>
              {intake ? (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <MetricCard label="Credit score" value={`${intake.score.creditScore}`} note="/850" />
                    <MetricCard label="Limit" value={`KES ${formatNumber(intake.score.recommendedCreditLimitKes)}`} note="Suggested facility" />
                    <MetricCard label="Risk" value={intake.score.riskLevel.toUpperCase()} note={intake.fraud.fraudRiskBand.toUpperCase()} />
                    <MetricCard label="Confidence" value={`${intake.score.confidenceScore}%`} note={`${intake.features.transactionCount} txns`} />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatItem label="Inflow" value={`KES ${formatNumber(intake.features.totalInflowKes)}`} />
                    <StatItem label="Outflow" value={`KES ${formatNumber(intake.features.totalOutflowKes)}`} />
                    <StatItem label="Regularity" value={`${intake.features.regularityScore}/100`} />
                    <StatItem label="Merchant diversity" value={`${intake.features.merchantDiversity}`} />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Fraud review</h3>
                      <Badge variant={intake.fraud.fraudRiskBand === 'high' ? 'destructive' : 'outline'}>
                        {intake.fraud.fraudRiskBand.toUpperCase()}
                      </Badge>
                    </div>
                    <Progress value={intake.fraud.fraudRiskScore} />
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {intake.fraud.flags.map(flag => (
                        <li key={flag} className="flex items-start gap-2">
                          <BadgeCheck className="mt-0.5 h-4 w-4 text-primary" />
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Parsed transactions</h3>
                      <span className="text-sm text-muted-foreground">{intake.transactions.length} lines extracted</span>
                    </div>

                    <div className="overflow-hidden rounded-xl border">
                      <table className="w-full text-sm">
                        <thead className="bg-secondary/60 text-left text-muted-foreground">
                          <tr>
                            <th className="px-3 py-2">Date</th>
                            <th className="px-3 py-2">Direction</th>
                            <th className="px-3 py-2">Amount</th>
                            <th className="px-3 py-2">Counterparty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {intake.transactions.slice(0, 8).map(transaction => (
                            <tr key={`${transaction.index}-${transaction.reference}`} className="border-t">
                              <td className="px-3 py-2">{transaction.date}</td>
                              <td className="px-3 py-2">
                                <Badge variant={transaction.direction === 'inflow' ? 'default' : 'outline'}>
                                  {transaction.direction}
                                </Badge>
                              </td>
                              <td className="px-3 py-2">KES {formatNumber(transaction.amountKes)}</td>
                              <td className="px-3 py-2">{transaction.counterparty}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
                  Run an intake to see the parsed signal graph and score breakdown.
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dossier output</CardTitle>
                <CardDescription>Exportable report for field officers and MFIs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dossier ? (
                  <>
                    <div className="rounded-2xl border bg-secondary/30 p-4 text-sm leading-6 text-muted-foreground">
                      {dossier.summary}
                    </div>
                    <Button className="w-full gap-2" variant="outline" onClick={downloadDossier}>
                      <Download className="h-4 w-4" />
                      Download dossier HTML
                    </Button>
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
                    Generate a dossier after running intake.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operational notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>This MVP stores data in memory for now. Wire PostgreSQL and regional object storage next.</p>
                <p>The parser currently handles text exports. PDF ingestion is the next extension point.</p>
                <p>Consent is required before intake can process any statement content.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {dossier ? (
        <section className="px-4 pb-20">
          <div className="mx-auto max-w-7xl space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Dossier preview</h2>
                <p className="text-sm text-muted-foreground">This is the exact report structure lenders can review.</p>
              </div>
              <Link href="/dashboard">
                <Button variant="ghost" className="gap-2">
                  Open dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <Card className="overflow-hidden">
              <iframe title="Kenya credit dossier preview" srcDoc={dossier.html} className="h-[900px] w-full border-0 bg-white" />
            </Card>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border bg-secondary/20 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-medium">{value}</p>
    </div>
  )
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-KE').format(Math.round(value))
}