'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Users,
  Search,
  Plus,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Clock,
  Phone,
  Mail
} from 'lucide-react'
import { useState } from 'react'

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const agents = [
    {
      id: '1',
      name: 'Fatuma Osman',
      region: 'Nairobi, Kenya',
      email: 'fatuma@organization.org',
      phone: '+254 712 345 678',
      organization: 'Kenya Microfinance Association',
      tradersManaged: 24,
      formalizationsCompleted: 18,
      activity: 'Active today',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Emmanuel Kipchoge',
      region: 'Western Kenya',
      email: 'emmanuel@organization.org',
      phone: '+254 701 234 567',
      organization: 'Rural Credit SACCO',
      tradersManaged: 31,
      formalizationsCompleted: 22,
      activity: 'Active 2 hours ago',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Ayesha Patel',
      region: 'Mumbai, India',
      email: 'ayesha@organization.org',
      phone: '+91 98765 43210',
      organization: 'Indian Traders Union',
      tradersManaged: 19,
      formalizationsCompleted: 14,
      activity: 'Active today',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Javier Reyes',
      region: 'Manila, Philippines',
      email: 'javier@organization.org',
      phone: '+63 917 123 4567',
      organization: 'Philippine Womens Cooperative',
      tradersManaged: 27,
      formalizationsCompleted: 19,
      activity: 'Active yesterday',
      rating: 4.6
    },
    {
      id: '5',
      name: 'Kweku Okonkwo',
      region: 'Accra, Ghana',
      email: 'kweku@organization.org',
      phone: '+233 24 456 7890',
      organization: 'Ghana Business Forum',
      tradersManaged: 15,
      formalizationsCompleted: 10,
      activity: 'Active 3 days ago',
      rating: 4.5
    },
  ]

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.region.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    { 
      label: 'Total Field Agents', 
      value: agents.length,
      icon: Users,
      color: 'text-blue-600'
    },
    { 
      label: 'Traders Managed', 
      value: agents.reduce((sum, a) => sum + a.tradersManaged, 0),
      icon: TrendingUp,
      color: 'text-green-600'
    },
    { 
      label: 'Formalizations Done', 
      value: agents.reduce((sum, a) => sum + a.formalizationsCompleted, 0),
      icon: CheckCircle2,
      color: 'text-emerald-600'
    },
    { 
      label: 'Avg Rating', 
      value: (agents.reduce((sum, a) => sum + a.rating, 0) / agents.length).toFixed(1),
      icon: Clock,
      color: 'text-yellow-600'
    },
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Field Agents</h1>
            <p className="text-muted-foreground mt-2">Manage your network of field agents and community liaisons</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Search and Action */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search agents by name, organization, or region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Agent
          </Button>
        </div>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map(agent => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{agent.organization}</p>
                    </div>
                    <div className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-semibold">
                      ★ {agent.rating}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Location and Contact */}
                  <div className="space-y-2 text-sm border-b border-border pb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{agent.region}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{agent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="text-xs">{agent.email}</span>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Traders Managed</div>
                      <div className="text-2xl font-bold">{agent.tradersManaged}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Completed</div>
                      <div className="text-2xl font-bold text-green-600">{agent.formalizationsCompleted}</div>
                    </div>
                  </div>

                  {/* Activity Status */}
                  <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm">{agent.activity}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button size="sm">Send Message</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground mb-4">No agents found matching your search.</p>
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
