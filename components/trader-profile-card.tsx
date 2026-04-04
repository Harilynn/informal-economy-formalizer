'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  MapPin, 
  Phone, 
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ArrowUpRight
} from 'lucide-react'

interface TraderData {
  id: string
  name: string
  businessType: string
  location: string
  phone: string
  monthlyRevenue: number
  transactionCount: number
  signalScore: number
  formalityLevel: number
  status: 'pending' | 'in-progress' | 'complete'
  signals: {
    mobileData: number
    businessPattern: number
    communityReputation: number
  }
}

export function TraderProfileCard({ data }: { data: TraderData }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'in-progress':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="w-4 h-4" />
      case 'in-progress':
        return <Clock className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{data.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{data.businessType}</p>
          </div>
          <Badge className={`flex items-center gap-1 ${getStatusColor(data.status)}`}>
            {getStatusIcon(data.status)}
            <span className="capitalize">{data.status}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location and Contact */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{data.phone}</span>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-2 gap-4 py-3 border-y border-border">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Monthly Revenue</div>
            <div className="text-lg font-bold text-accent flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              ${(data.monthlyRevenue / 1000).toFixed(1)}k
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Transactions</div>
            <div className="text-lg font-bold">{data.transactionCount}</div>
          </div>
        </div>

        {/* Signal Scores */}
        <div className="space-y-3">
          <div className="text-sm font-semibold">Signal Analysis</div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Mobile Data Signal</span>
              <span className="text-xs font-medium">{data.signals.mobileData}%</span>
            </div>
            <Progress value={data.signals.mobileData} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Business Pattern</span>
              <span className="text-xs font-medium">{data.signals.businessPattern}%</span>
            </div>
            <Progress value={data.signals.businessPattern} className="h-2" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Community Reputation</span>
              <span className="text-xs font-medium">{data.signals.communityReputation}%</span>
            </div>
            <Progress value={data.signals.communityReputation} className="h-2" />
          </div>
        </div>

        {/* Overall Scores */}
        <div className="grid grid-cols-2 gap-3 pt-3">
          <div className="bg-accent/10 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Signal Score</div>
            <div className="text-2xl font-bold text-accent">{data.signalScore}</div>
            <div className="text-xs text-muted-foreground">/100</div>
          </div>
          <div className="bg-primary/10 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Formality %</div>
            <div className="text-2xl font-bold text-primary">{data.formalityLevel}%</div>
            <div className="text-xs text-muted-foreground">Completion</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button variant="outline" size="sm" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            View Profile
          </Button>
          <Button size="sm" className="gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
