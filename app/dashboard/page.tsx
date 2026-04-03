'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Activity,
  Download,
  Filter,
  Zap,
  DollarSign,
  Globe
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { mockTraders, generateCreditProfile } from '@/lib/mock-data'

export default function DashboardPage() {
  const [traders, setTraders] = useState<typeof mockTraders>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setTraders(mockTraders)
      setLoading(false)
    }, 500)
  }, [])

  const metrics = [
    {
      title: 'Total Traders',
      value: traders.length.toString(),
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Avg Credit Score',
      value: traders.length > 0 
        ? Math.round(traders.reduce((sum, t) => sum + generateCreditProfile(t).creditScore, 0) / traders.length)
        : 0,
      change: '+45 pts',
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      title: 'Avg Reputation',
      value: traders.length > 0
        ? Math.round(traders.reduce((sum, t) => sum + t.communityReputation, 0) / traders.length)
        : 0,
      change: '/ 100',
      icon: CheckCircle2,
      color: 'text-green-600'
    },
    {
      title: 'Total Revenue',
      value: traders.length > 0
        ? '$' + (traders.reduce((sum, t) => sum + t.monthlyRevenue, 0) / 1000).toFixed(0) + 'K'
        : '$0',
      change: '/ month',
      icon: DollarSign,
      color: 'text-purple-600'
    },
  ]

  // Calculate data for charts
  const countryData = traders.reduce((acc, t) => {
    const existing = acc.find(item => item.name === t.country)
    if (existing) {
      existing.value++
    } else {
      acc.push({ name: t.country, value: 1 })
    }
    return acc
  }, [] as Array<{ name: string; value: number }>)

  const creditScoreData = traders.map(t => ({
    name: t.name.split(' ')[0],
    score: generateCreditProfile(t).creditScore,
    risk: t.riskScore
  }))

  const riskDistribution = [
    { name: 'Low Risk', value: traders.filter(t => t.riskScore < 20).length },
    { name: 'Medium Risk', value: traders.filter(t => t.riskScore >= 20 && t.riskScore < 40).length },
    { name: 'High Risk', value: traders.filter(t => t.riskScore >= 40).length },
  ]

  const COLORS = ['#22c55e', '#eab308', '#ef4444']

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Real-time platform analytics and trader network metrics</p>
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

        {/* Key Metrics */}
        {loading ? (
          <div className="text-center py-12">
            <Zap className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading metrics...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, idx) => {
                const Icon = metric.icon
                return (
                  <div key={idx}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {metric.title}
                          </CardTitle>
                          <Icon className={`w-5 h-5 ${metric.color}`} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold mb-1">
                          {metric.value}
                        </div>
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          {metric.change}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Credit Score Distribution */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Credit Score Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {creditScoreData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={creditScoreData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="score" fill="#5694ea" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No data available</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Risk Distribution */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {riskDistribution.length > 0 && riskDistribution.some(r => r.value > 0) ? (
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={riskDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {riskDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No data available</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Traders by Country */}
              <div>
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Traders by Country</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {countryData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={countryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No data available</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Traders */}
              <div>
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Recent Traders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {traders.slice(0, 4).map((trader, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between pb-3 border-b border-border last:border-0"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-sm">{trader.name}</p>
                            <p className="text-xs text-muted-foreground">{trader.businessType}</p>
                          </div>
                          <Badge className="bg-green-50 text-green-700">
                            {trader.communityReputation}/100
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
