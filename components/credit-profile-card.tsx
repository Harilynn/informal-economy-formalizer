'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Zap,
  FileDownload,
  Share2,
  Lock,
  CheckCircle2,
  AlertCircle,
  TrendingUp
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'

interface CreditProfile {
  traderName: string
  score: number
  recommendedCredit: number
  riskLevel: string
  trustScore: number
  verifiedSignals: number
  totalSignals: number
}

export function CreditProfileCard({ profile }: { profile: CreditProfile }) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card className="bg-gradient-to-br from-card to-secondary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-4">
          <div>
            <CardTitle className="text-2xl">{profile.traderName}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">AI-Generated Credit Profile</p>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Main Score */}
        <div className="flex items-end gap-4 pb-4 border-b border-border">
          <div>
            <div className="text-sm text-muted-foreground mb-2">Credit Score</div>
            <div className={`text-5xl font-bold ${getScoreColor(profile.score)}`}>
              {profile.score}
            </div>
          </div>
          <Badge className={getRiskColor(profile.riskLevel)}>
            <AlertCircle className="w-3 h-3 mr-1" />
            {profile.riskLevel} Risk
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Recommended Credit */}
        <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-accent">Recommended Credit Line</span>
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <div className="text-3xl font-bold text-accent">
            ${(profile.recommendedCredit / 1000).toFixed(1)}k
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Estimated maximum safe lending amount
          </p>
        </div>

        {/* Trust Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">AI Confidence Score</span>
            <span className="text-sm font-semibold">{profile.trustScore}%</span>
          </div>
          <Progress value={profile.trustScore} className="h-3" />
          <p className="text-xs text-muted-foreground">
            Based on {profile.verifiedSignals}/{profile.totalSignals} verified signals
          </p>
        </div>

        {/* Signal Breakdown */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-sm font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Verified Signals
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>M-Pesa Transaction History</span>
              <Badge variant="outline" className="bg-green-50">✓</Badge>
            </div>
            <div className="flex justify-between">
              <span>Business Pattern Regularity</span>
              <Badge variant="outline" className="bg-green-50">✓</Badge>
            </div>
            <div className="flex justify-between">
              <span>Customer Repayment Rate</span>
              <Badge variant="outline" className="bg-green-50">✓</Badge>
            </div>
            <div className="flex justify-between">
              <span>Community Verification</span>
              <Badge variant="outline" className="bg-yellow-50">⏳</Badge>
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-2">Generated Dossier Summary</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {profile.traderName} has demonstrated consistent business operations over 18+ months 
            with regular M-Pesa transactions averaging $3,200 monthly. Payment discipline shows 
            94% on-time settlement rate. Business pattern exhibits stability with 87% revenue 
            consistency month-over-month. Community reputation verified through 12 peer vouching 
            confirmations. Recommended for microfinance product eligibility.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <Button variant="outline" size="sm" className="gap-2">
            <FileDownload className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
            <Zap className="w-4 h-4" />
            <span className="hidden sm:inline">Formalize</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
