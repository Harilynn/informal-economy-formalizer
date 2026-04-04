'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CreditProfileCard } from '@/components/credit-profile-card'
import { FormalizationFlow } from '@/components/formalization-flow'
import { SignalVisualization } from '@/components/signal-visualization'
import { 
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Building,
  Calendar,
  TrendingUp,
  Download,
  Share2
} from 'lucide-react'
import Link from 'next/link'

export default function TraderDetailPage({ params }: { params: { id: string } }) {
  // In a real app, this would fetch trader data based on the ID
  const trader = {
    id: '1',
    name: 'Grace Mwangi',
    businessType: 'Electronics Retail',
    joinDate: 'Jan 15, 2023',
    location: 'Nairobi, Kenya',
    phone: '+254 712 345 678',
    email: 'grace@example.com',
    businessRegistration: 'Registered (Gikomba Market)',
    
    creditProfile: {
      traderName: 'Grace Mwangi',
      score: 895,
      recommendedCredit: 25000,
      riskLevel: 'Low',
      trustScore: 94,
      verifiedSignals: 9,
      totalSignals: 12
    },

    overview: {
      monthlyRevenue: 8420,
      annualRevenue: 101040,
      transactionCount: 142,
      businessAge: '26 months',
      paymentReliability: '99%',
      customerBase: '450+ repeat customers'
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link href="/traders" className="flex items-center gap-2 text-primary mb-4 hover:text-primary/80 w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Traders
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{trader.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {trader.businessType}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {trader.location}
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  ✓ Verified
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="font-medium">{trader.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-medium text-sm">{trader.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Join Date</div>
                    <div className="font-medium">{trader.joinDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Registration</div>
                    <div className="font-medium text-sm">{trader.businessRegistration}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Business Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Monthly Revenue</div>
                    <div className="text-lg font-bold text-accent">${trader.overview.monthlyRevenue}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Annual Revenue</div>
                    <div className="text-lg font-bold">${(trader.overview.annualRevenue / 1000).toFixed(0)}k</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Transactions</div>
                    <div className="text-lg font-bold">{trader.overview.transactionCount}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Business Age</div>
                    <div className="text-lg font-bold">{trader.overview.businessAge}</div>
                  </div>
                </div>
                <div className="border-t border-border pt-4 space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Payment Reliability</div>
                    <Badge className="bg-green-50 text-green-700 border-green-200">{trader.overview.paymentReliability}</Badge>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Customer Base</div>
                    <div className="text-sm">{trader.overview.customerBase}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Credit Profile */}
          <div className="lg:col-span-2">
            <CreditProfileCard profile={trader.creditProfile} />
          </div>
        </div>

        {/* Formalization Flow */}
        <FormalizationFlow />

        {/* Signal Analysis */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Signal Analysis</h2>
          <SignalVisualization />
        </div>

        {/* Documents Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div>
                  <div className="font-medium">Credit Profile Report</div>
                  <div className="text-xs text-muted-foreground">Generated 2 days ago</div>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div>
                  <div className="font-medium">Business Registration Form (Draft)</div>
                  <div className="text-xs text-muted-foreground">Ready for submission</div>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div>
                  <div className="font-medium">Tax Identification Documentation</div>
                  <div className="text-xs text-muted-foreground">Pending review</div>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
