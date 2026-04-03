'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import { 
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Building,
  Calendar,
  TrendingUp,
  Download,
  Share2,
  AlertCircle,
  CheckCircle2,
  Zap,
  Shield,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { getTraderById, generateCreditProfile } from '@/lib/mock-data'
import { assessFraudRisk, analyzeSignalSpoofing } from '@/lib/fraud-detection'
import { generateComplianceReport } from '@/lib/regulatory-compliance'
import { analyzeTraderComprehensive, constructEconomicIdentity } from '@/lib/ai-analysis'
import { Trader } from '@/lib/mock-data'

export default function TraderDetailPage({ params }: { params: { id: string } }) {
  const [trader, setTrader] = useState<Trader | null>(null)
  const [creditProfile, setCreditProfile] = useState<any>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const [fraud, setFraud] = useState<any>(null)
  const [compliance, setCompliance] = useState<any>(null)
  const [identity, setIdentity] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const traderData = getTraderById(params.id)
        if (!traderData) {
          setLoading(false)
          return
        }

        setTrader(traderData)
        setCreditProfile(generateCreditProfile(traderData))
        setFraud(assessFraudRisk(traderData))
        setCompliance(generateComplianceReport(traderData))
        setIdentity(constructEconomicIdentity(traderData))

        // Get AI analysis
        const aiAnalysis = await analyzeTraderComprehensive(traderData)
        setAnalysis(aiAnalysis)
      } catch (error) {
        console.error('Failed to load trader data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading trader data...</p>
        </div>
      </div>
    )
  }

  if (!trader) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Trader Not Found</h2>
            <p className="text-muted-foreground mb-4">The trader profile you're looking for doesn't exist.</p>
            <Link href="/traders">
              <Button>Back to Traders</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="max-w-7xl mx-auto px-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/traders" className="flex items-center gap-2 text-primary mb-4 hover:text-primary/80">
          <ArrowLeft className="w-4 h-4" />
          Back to Traders
        </Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-3">{trader.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                {trader.businessType}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {trader.city}, {trader.country}
              </div>
              <Badge className="bg-green-50 text-green-700">Verified</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Credit Score</p>
              <p className="text-3xl font-bold">{creditProfile?.creditScore}</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold">${(trader.monthlyRevenue / 1000).toFixed(1)}K</p>
            </CardContent>
          </Card>

          <Card className="border-green-400/20 bg-gradient-to-br from-green-500/5 to-transparent">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Community Rep</p>
              <p className="text-3xl font-bold">{trader.communityReputation}/100</p>
            </CardContent>
          </Card>

          <Card className="border-purple-400/20 bg-gradient-to-br from-purple-500/5 to-transparent">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
              <p className="text-2xl font-bold">{creditProfile?.riskLevel}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="signals">Signals</TabsTrigger>
              <TabsTrigger value="fraud">Fraud Check</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="font-medium">{trader.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Years in Business</p>
                        <p className="font-medium">{trader.yearsInBusiness} years</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Business Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Monthly Transactions</p>
                        <p className="text-2xl font-bold">{trader.mobilePaymentTransactions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Avg Transaction</p>
                        <p className="text-2xl font-bold">${(trader.averageTransactionSize / 1000).toFixed(1)}K</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Document Score</p>
                        <p className="text-2xl font-bold">{trader.documentScore}/100</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Risk Score</p>
                        <p className="text-2xl font-bold text-orange-600">{trader.riskScore}/100</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Signals Tab */}
            <TabsContent value="signals" className="space-y-6 mt-6">
              <div className="space-y-4">
                {trader.signals.map((signal, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold capitalize">{signal.type.replace('_', ' ')}</h3>
                            <p className="text-sm text-muted-foreground">{signal.evidence}</p>
                          </div>
                          <Badge className="bg-green-50 text-green-700">{signal.strength}%</Badge>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${signal.strength}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Fraud Check Tab */}
            <TabsContent value="fraud" className="space-y-6 mt-6">
              {fraud && (
                <div className="space-y-4">
                  <Card className={fraud[0]?.riskLevel === 'high' ? 'border-red-500/20 bg-red-50/50 dark:bg-red-950/20' : 'border-green-500/20 bg-green-50/50 dark:bg-green-950/20'}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        {fraud[0]?.riskLevel === 'high' ? (
                          <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                        ) : (
                          <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">
                            {fraud[0]?.riskLevel === 'high' ? 'High Risk Detected' : 'Low Risk - Profile Verified'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {fraud.length === 0
                              ? 'No fraud indicators detected. Trader signals are consistent.'
                              : `${fraud.length} risk indicator(s) identified requiring attention.`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {fraud.length > 0 && (
                    <div className="space-y-3">
                      {fraud.map((indicator: any, idx: number) => (
                        <Card key={idx}>
                          <CardContent className="pt-6">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{indicator.indicator}</h4>
                              <Badge variant={indicator.riskLevel === 'high' ? 'destructive' : 'secondary'}>
                                {indicator.riskLevel}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{indicator.evidence}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="space-y-6 mt-6">
              {compliance && (
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Compliance Score</h3>
                        <div className="text-3xl font-bold">{compliance.overallCompliance}%</div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-accent h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${compliance.overallCompliance}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    {compliance.requirements?.slice(0, 5).map((req: any, idx: number) => (
                      <Card key={idx}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{req.requirement}</h4>
                            <Badge
                              className={
                                req.status === 'met'
                                  ? 'bg-green-50 text-green-700'
                                  : req.status === 'pending'
                                    ? 'bg-yellow-50 text-yellow-700'
                                    : 'bg-red-50 text-red-700'
                              }
                            >
                              {req.status}
                            </Badge>
                          </div>
                          {req.deadline && (
                            <p className="text-xs text-muted-foreground">Deadline: {req.deadline}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            {/* AI Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6 mt-6">
              {analysis && (
                <div className="space-y-6">
                  <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                    <CardContent className="pt-6">
                      <p className="text-lg font-semibold mb-3">AI Summary</p>
                      <p className="text-muted-foreground leading-relaxed">{analysis.summary}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {analysis.recommendations?.map((rec: string, idx: number) => (
                          <li key={idx} className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {analysis.formalizationPlan && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Formalization Plan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {analysis.formalizationPlan.map((phase: any, idx: number) => (
                            <motion.div
                              key={idx}
                              className="border-l-4 border-primary pl-4 py-3"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <p className="font-semibold text-sm mb-1">{phase.phase}</p>
                              <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                              <Badge variant="outline">{phase.timeline}</Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Key Risks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.risks?.slice(0, 3).map((risk: string, idx: number) => (
                            <li key={idx} className="flex gap-2 text-sm">
                              <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                              <span>{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Opportunities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.opportunities?.slice(0, 3).map((opp: string, idx: number) => (
                            <li key={idx} className="flex gap-2 text-sm">
                              <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{opp}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
