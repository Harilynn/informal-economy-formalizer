'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mobile payment transaction patterns
const transactionData = [
  { date: 'Week 1', amount: 2400, transactions: 12 },
  { date: 'Week 2', amount: 2210, transactions: 14 },
  { date: 'Week 3', amount: 2290, transactions: 18 },
  { date: 'Week 4', amount: 2000, transactions: 15 },
  { date: 'Week 5', amount: 2181, transactions: 20 },
  { date: 'Week 6', amount: 2500, transactions: 22 },
  { date: 'Week 7', amount: 2100, transactions: 16 },
]

// Signal breakdown
const signalBreakdown = [
  { name: 'Mobile Data', value: 45, color: '#ff8c42' },
  { name: 'WhatsApp Patterns', value: 30, color: '#6366f1' },
  { name: 'Physical Signals', value: 15, color: '#10b981' },
  { name: 'Community Rep', value: 10, color: '#f59e0b' },
]

// Revenue stability
const revenueData = [
  { category: 'Consistent', value: 65 },
  { category: 'Growing', value: 25 },
  { category: 'Volatile', value: 10 },
]

export function SignalVisualization() {
  return (
    <div className="space-y-6">
      {/* Transaction Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile Payment Trends</CardTitle>
          <CardDescription>Weekly transaction volume and total value from M-Pesa/UPI</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)'
                }}
              />
              <Legend />
              <Bar dataKey="amount" fill="var(--primary)" name="Amount ($)" />
              <Bar dataKey="transactions" fill="var(--accent)" name="Transaction Count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Signal Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Signal Composition</CardTitle>
            <CardDescription>Breakdown of identity signals used</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={signalBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {signalBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Pattern Analysis</CardTitle>
            <CardDescription>Business stability classification</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, value }) => `${category}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="var(--primary)" />
                  <Cell fill="var(--accent)" />
                  <Cell fill="var(--destructive)" />
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cumulative Formalization Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Formalization Journey</CardTitle>
          <CardDescription>Progress through the formalization pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="var(--primary)" 
                strokeWidth={2}
                name="Cumulative Signals Collected"
                dot={{ fill: 'var(--primary)', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
