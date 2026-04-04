'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TraderProfileCard } from '@/components/trader-profile-card'
import { 
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal
} from 'lucide-react'

export default function TradersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  // Sample trader data
  const traders = [
    {
      id: '1',
      name: 'Grace Mwangi',
      businessType: 'Electronics Retail',
      location: 'Nairobi, Kenya',
      phone: '+254 712 345 678',
      monthlyRevenue: 8420,
      transactionCount: 142,
      signalScore: 89,
      formalityLevel: 95,
      status: 'complete' as const,
      signals: {
        mobileData: 95,
        businessPattern: 90,
        communityReputation: 88,
      }
    },
    {
      id: '2',
      name: 'Ahmed Hassan',
      businessType: 'Textile Trading',
      location: 'Dar es Salaam, Tanzania',
      phone: '+255 654 321 098',
      monthlyRevenue: 7850,
      transactionCount: 128,
      signalScore: 85,
      formalityLevel: 87,
      status: 'complete' as const,
      signals: {
        mobileData: 92,
        businessPattern: 85,
        communityReputation: 82,
      }
    },
    {
      id: '3',
      name: 'Priya Sharma',
      businessType: 'Spice Distribution',
      location: 'Mumbai, India',
      phone: '+91 98765 43210',
      monthlyRevenue: 6200,
      transactionCount: 96,
      signalScore: 78,
      formalityLevel: 72,
      status: 'in-progress' as const,
      signals: {
        mobileData: 88,
        businessPattern: 78,
        communityReputation: 72,
      }
    },
    {
      id: '4',
      name: 'Maria Santos',
      businessType: 'Cosmetics Distribution',
      location: 'Manila, Philippines',
      phone: '+63 917 123 4567',
      monthlyRevenue: 7230,
      transactionCount: 134,
      signalScore: 82,
      formalityLevel: 85,
      status: 'in-progress' as const,
      signals: {
        mobileData: 90,
        businessPattern: 82,
        communityReputation: 80,
      }
    },
    {
      id: '5',
      name: 'Kofi Mensah',
      businessType: 'Agricultural Trader',
      location: 'Accra, Ghana',
      phone: '+233 24 456 7890',
      monthlyRevenue: 5680,
      transactionCount: 87,
      signalScore: 72,
      formalityLevel: 45,
      status: 'pending' as const,
      signals: {
        mobileData: 78,
        businessPattern: 72,
        communityReputation: 68,
      }
    },
    {
      id: '6',
      name: 'Linda Chen',
      businessType: 'Import/Export',
      location: 'Bangkok, Thailand',
      phone: '+66 81 234 5678',
      monthlyRevenue: 9100,
      transactionCount: 156,
      signalScore: 91,
      formalityLevel: 92,
      status: 'complete' as const,
      signals: {
        mobileData: 96,
        businessPattern: 92,
        communityReputation: 91,
      }
    },
    {
      id: '7',
      name: 'Amara Okafor',
      businessType: 'Food Stall Operator',
      location: 'Lagos, Nigeria',
      phone: '+234 803 456 7890',
      monthlyRevenue: 3450,
      transactionCount: 64,
      signalScore: 65,
      formalityLevel: 38,
      status: 'pending' as const,
      signals: {
        mobileData: 70,
        businessPattern: 65,
        communityReputation: 62,
      }
    },
    {
      id: '8',
      name: 'John Kipchoge',
      businessType: 'Transport Services',
      location: 'Kampala, Uganda',
      phone: '+256 701 234 567',
      monthlyRevenue: 4920,
      transactionCount: 108,
      signalScore: 76,
      formalityLevel: 58,
      status: 'in-progress' as const,
      signals: {
        mobileData: 82,
        businessPattern: 76,
        communityReputation: 74,
      }
    },
  ]

  const filteredTraders = traders.filter(trader => {
    const matchesSearch = 
      trader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trader.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trader.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = !selectedStatus || trader.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const stats = [
    { label: 'Total Traders', value: traders.length },
    { label: 'Completed', value: traders.filter(t => t.status === 'complete').length },
    { label: 'In Progress', value: traders.filter(t => t.status === 'in-progress').length },
    { label: 'Pending', value: traders.filter(t => t.status === 'pending').length },
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Traders</h1>
            <p className="text-muted-foreground mt-2">Manage and monitor informal trader profiles and formalization progress</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-card rounded-lg p-4 border border-border">
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-2xl font-bold mt-1">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search traders by name, business type, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Trader</span>
            </Button>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 border-b border-border overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedStatus(null)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              selectedStatus === null
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All Traders ({traders.length})
          </button>
          <button
            onClick={() => setSelectedStatus('complete')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              selectedStatus === 'complete'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Completed ({traders.filter(t => t.status === 'complete').length})
          </button>
          <button
            onClick={() => setSelectedStatus('in-progress')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              selectedStatus === 'in-progress'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            In Progress ({traders.filter(t => t.status === 'in-progress').length})
          </button>
          <button
            onClick={() => setSelectedStatus('pending')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              selectedStatus === 'pending'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Pending ({traders.filter(t => t.status === 'pending').length})
          </button>
        </div>

        {/* Trader Cards Grid */}
        {filteredTraders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTraders.map(trader => (
              <TraderProfileCard key={trader.id} data={trader} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground mb-4">No traders found matching your search.</p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('')
                setSelectedStatus(null)
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
