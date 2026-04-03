'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts'
import { 
  TrendingUp,
  Download,
  Filter,
  Calendar
} from 'lucide-react'

export default function AnalyticsPage() {
  // Monthly formalization growth
  const monthlyData = [
    { month: 'Jan', traders: 120, completed: 45, revenue: 180 },
    { month: 'Feb', traders: 145, completed: 68, revenue: 245 },
    { month: 'Mar', traders: 198, completed: 95, revenue: 320 },
    { month: 'Apr', traders: 245, completed: 128, revenue: 420 },
    { month: 'May', traders: 312, completed: 165, revenue: 580 },
    { month: 'Jun', traders: 380, completed: 198, revenue: 720 },
    { month: 'Jul', traders: 450, completed: 245, revenue: 890 },
    { month: 'Aug', traders: 520, completed: 298, revenue: 1050 },
  ]

  // Credit score distribution
  const scoreDistribution = [
    { range: '800+', count: 145, color: '#10b981' },
    { range: '700-799', count: 230, color: '#3b82f6' },
    { range: '600-699', count: 310, color: '#f59e0b' },
    { range: '500-599', count: 185, color: '#ef4444' },
    { range: '<500', count: 48, color: '#6b7280' },
  ]

  // Geographic distribution
  const geoData = [
    { country: 'Kenya', traders: 320, value: 8500 },
    { country: 'India', traders: 245, value: 6200 },
    { country: 'Philippines', traders: 198, value: 5100 },
    { country: 'Ghana', traders: 145, value: 3800 },
    { country: 'Nigeria', traders: 340, value: 8900 },
  ]

  // Business type breakdown
  const businessTypes = [
    { type: 'Retail Trade', count: 320, color: '#ff8c42' },
    { type: 'Services', count: 245, color: '#6366f1' },
    { type: 'Manufacturing', count: 180, color: '#10b981' },
    { type: 'Agriculture', count: 156, color: '#f59e0b' },
    { type: 'Transport', count: 127, color: '#ec4899' },
    { type: 'Hospitality', count: 100, color: '#8b5cf6' },
  ]

  // Formalization rate by region
  const regionData = [
    { region: 'Kenya', rate: 78 },
    { region: 'India', rate: 72 },
    { region: 'Philippines', rate: 68 },
    { region: 'Ghana', rate: 65 },
    { region: 'Nigeria', rate: 71 },
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground mt-2">Comprehensive insights into platform performance and formalization progress</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                Date Range
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
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Traders Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">+15.2% this month</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73.2%</div>
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">+8.1% improvement</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Credit Unlocked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$42.5M</div>
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">+$6.2M this month</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Credit Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">642</div>
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">+52 points</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Platform Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorTraders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                <Legend />
                <Area type="monotone" dataKey="traders" stackId="1" stroke="var(--primary)" fillOpacity={1} fill="url(#colorTraders)" name="New Traders" />
                <Area type="monotone" dataKey="completed" stackId="2" stroke="var(--accent)" fillOpacity={1} fill="url(#colorCompleted)" name="Completed Formalizations" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Credit Score Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Credit Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="range" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                  <Bar dataKey="count" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Business Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Business Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={businessTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, count }) => `${type}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {businessTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Geographic and Regional Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Traders by Geographic Region</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={geoData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" />
                  <YAxis dataKey="country" type="category" stroke="var(--muted-foreground)" width={80} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} />
                  <Bar dataKey="traders" fill="var(--primary)" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Formalization Rate by Region */}
          <Card>
            <CardHeader>
              <CardTitle>Formalization Rate by Region</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="region" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" domain={[0, 100]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }} formatter={(value) => `${value}%`} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="var(--accent)" 
                    strokeWidth={2} 
                    dot={{ fill: 'var(--accent)', r: 6 }}
                    activeDot={{ r: 8 }}
                    name="Formalization Rate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Countries Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Market Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Country</th>
                    <th className="text-right py-3 px-4 font-semibold">Traders</th>
                    <th className="text-right py-3 px-4 font-semibold">Completed</th>
                    <th className="text-right py-3 px-4 font-semibold">Completion Rate</th>
                    <th className="text-right py-3 px-4 font-semibold">Avg Credit Score</th>
                    <th className="text-right py-3 px-4 font-semibold">Total Credit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">Nigeria</td>
                    <td className="text-right">340</td>
                    <td className="text-right">248</td>
                    <td className="text-right"><Badge className="bg-green-50 text-green-700 border-green-200">73%</Badge></td>
                    <td className="text-right">658</td>
                    <td className="text-right">$8.9M</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">Kenya</td>
                    <td className="text-right">320</td>
                    <td className="text-right">249</td>
                    <td className="text-right"><Badge className="bg-green-50 text-green-700 border-green-200">78%</Badge></td>
                    <td className="text-right">671</td>
                    <td className="text-right">$8.5M</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">India</td>
                    <td className="text-right">245</td>
                    <td className="text-right">176</td>
                    <td className="text-right"><Badge className="bg-blue-50 text-blue-700 border-blue-200">72%</Badge></td>
                    <td className="text-right">631</td>
                    <td className="text-right">$6.2M</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">Philippines</td>
                    <td className="text-right">198</td>
                    <td className="text-right">135</td>
                    <td className="text-right"><Badge className="bg-blue-50 text-blue-700 border-blue-200">68%</Badge></td>
                    <td className="text-right">618</td>
                    <td className="text-right">$5.1M</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="py-3 px-4">Ghana</td>
                    <td className="text-right">145</td>
                    <td className="text-right">94</td>
                    <td className="text-right"><Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">65%</Badge></td>
                    <td className="text-right">595</td>
                    <td className="text-right">$3.8M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
