'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SignalVisualization } from '@/components/signal-visualization'
import { 
  Users,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Activity,
  Download,
  Filter
} from 'lucide-react'

export default function DashboardPage() {
  const metrics = [
    {
      title: 'Total Traders',
      value: '1,248',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Formalization Rate',
      value: '73.2%',
      change: '+8.3%',
      icon: CheckCircle2,
      color: 'text-green-600'
    },
    {
      title: 'Avg Credit Score',
      value: '642',
      change: '+45',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      title: 'Total Credit Unlocked',
      value: '$42.5M',
      change: '+$5.2M',
      icon: Activity,
      color: 'text-purple-600'
    },
  ]

  const recentActivity = [
    {
      type: 'formalization',
      trader: 'Amara Okafor',
      action: 'Completed formalization process',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      type: 'credit',
      trader: 'Kofi Mensah',
      action: 'Credit profile generated',
      timestamp: '4 hours ago',
      status: 'success'
    },
    {
      type: 'signal',
      trader: 'Priya Sharma',
      action: 'New M-Pesa signals ingested',
      timestamp: '6 hours ago',
      status: 'success'
    },
    {
      type: 'alert',
      trader: 'John Kipchoge',
      action: 'Unusual transaction pattern detected',
      timestamp: '8 hours ago',
      status: 'warning'
    },
    {
      type: 'formalization',
      trader: 'Maria Santos',
      action: 'Document verification pending',
      timestamp: '12 hours ago',
      status: 'pending'
    },
  ]

  const topPerformers = [
    {
      name: 'Grace Mwangi',
      business: 'Electronics Retail',
      score: 895,
      revenue: '$8,420',
      status: 'verified'
    },
    {
      name: 'Ahmed Hassan',
      business: 'Textile Trading',
      score: 872,
      revenue: '$7,850',
      status: 'verified'
    },
    {
      name: 'Linda Chen',
      business: 'Cosmetics Distribution',
      score: 856,
      revenue: '$7,230',
      status: 'verified'
    },
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-2">Real-time platform analytics and formalization progress</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon
            return (
              <Card key={idx}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </CardTitle>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    {metric.change}
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts */}
        <SignalVisualization />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
                      <div className={`w-3 h-3 rounded-full mt-1.5 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{activity.trader}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {activity.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {topPerformers.map((performer, idx) => (
                    <div key={idx} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{performer.name}</h3>
                          <p className="text-xs text-muted-foreground">{performer.business}</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                          Verified
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-primary font-semibold">Score: {performer.score}</span>
                        <span className="text-muted-foreground">{performer.revenue}/mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
