'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp, 
  MapPin, 
  Phone, 
  DollarSign,
  Search,
  ArrowRight,
  Shield,
  Users,
  Zap
} from 'lucide-react'
import { Trader } from '@/lib/mock-data'

export default function TradersPage() {
  const [traders, setTraders] = useState<Trader[]>([])
  const [filteredTraders, setFilteredTraders] = useState<Trader[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTraders = async () => {
      try {
        const response = await fetch('/api/traders')
        const data = await response.json()
        if (data.success) {
          setTraders(data.data)
          setFilteredTraders(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch traders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTraders()
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredTraders(traders)
    } else {
      const results = traders.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.businessType.toLowerCase().includes(search.toLowerCase()) ||
        t.city.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredTraders(results)
    }
  }, [search, traders])

  const getRiskColor = (score: number) => {
    if (score < 20) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    if (score < 40) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    if (score < 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  }

  const getRiskLabel = (score: number) => {
    if (score < 20) return 'Low Risk'
    if (score < 40) return 'Medium Risk'
    if (score < 60) return 'High Risk'
    return 'Critical Risk'
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trader Profiles</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover vetted traders with comprehensive economic identities and credit profiles
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search traders by name, business type, or location..."
              className="pl-10 py-6 text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div>
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Traders</p>
                    <p className="text-3xl font-bold">{traders.length}</p>
                  </div>
                  <Users className="w-12 h-12 text-primary/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Avg Reputation</p>
                    <p className="text-3xl font-bold">
                      {traders.length > 0 
                        ? Math.round(traders.reduce((sum, t) => sum + t.communityReputation, 0) / traders.length)
                        : 0}/100
                    </p>
                  </div>
                  <Shield className="w-12 h-12 text-accent/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-2 border-purple-400/20 bg-gradient-to-br from-purple-500/5 to-transparent">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold">
                      ${(traders.length > 0 
                        ? traders.reduce((sum, t) => sum + t.monthlyRevenue, 0) / 1000
                        : 0).toFixed(0)}K
                    </p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-purple-500/50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Traders Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">
              <Zap className="w-8 h-8" />
            </div>
            <p className="mt-4 text-muted-foreground">Loading traders...</p>
          </div>
        ) : filteredTraders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No traders found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTraders.map((trader) => (
              <div key={trader.id}>
                <Link href={`/traders/${trader.id}`}>
                  <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full hover:scale-105 transform">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-1">{trader.name}</CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {trader.city}, {trader.country}
                          </p>
                        </div>
                        <Badge variant="outline" className={getRiskColor(trader.riskScore)}>
                          {getRiskLabel(trader.riskScore)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Business Type</p>
                          <p className="font-semibold text-sm">{trader.businessType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Years Operating</p>
                          <p className="font-semibold text-sm">{trader.yearsInBusiness} years</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary/5 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Monthly Revenue</p>
                          <p className="font-semibold text-sm flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {(trader.monthlyRevenue / 1000).toFixed(1)}K
                          </p>
                        </div>
                        <div className="bg-accent/5 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Reputation</p>
                          <p className="font-semibold text-sm flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            {trader.communityReputation}/100
                          </p>
                        </div>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-2">Signal Strength</p>
                        <div className="flex gap-2">
                          {trader.signals.map((signal, idx) => (
                            <div key={idx} className="flex-1">
                              <div className="bg-background rounded h-2 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-1000"
                                  style={{ width: `${signal.strength}%` }}
                                />
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 capitalize">
                                {signal.type.replace('_', ' ')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full gap-2" variant="default">
                        View Profile <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
