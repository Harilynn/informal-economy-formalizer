'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Building,
  Bell,
  Lock,
  Database,
  Code,
  Mail,
  MapPin,
  Save,
  Eye,
  EyeOff
} from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false)

  const settings = [
    {
      category: 'Organization',
      icon: Building,
      items: [
        { label: 'Organization Name', value: 'Global Formalizer Initiative', type: 'text' },
        { label: 'Organization Email', value: 'info@formalizerinit.org', type: 'email' },
        { label: 'Headquarters Location', value: 'Nairobi, Kenya', type: 'text' },
        { label: 'Website', value: 'https://formalizerinit.org', type: 'url' },
      ]
    },
    {
      category: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', value: true, type: 'toggle' },
        { label: 'SMS Alerts', value: true, type: 'toggle' },
        { label: 'Daily Reports', value: false, type: 'toggle' },
        { label: 'Formalization Alerts', value: true, type: 'toggle' },
      ]
    }
  ]

  const integrations = [
    {
      name: 'M-Pesa API',
      status: 'Connected',
      statusColor: 'green',
      description: 'Mobile money transaction data integration',
      lastSync: '2 hours ago'
    },
    {
      name: 'WhatsApp Business API',
      status: 'Connected',
      statusColor: 'green',
      description: 'WhatsApp message and pattern analysis',
      lastSync: '4 hours ago'
    },
    {
      name: 'Tax Authority Database',
      status: 'Connected',
      statusColor: 'green',
      description: 'Tax identification and registration',
      lastSync: '6 hours ago'
    },
    {
      name: 'Microfinance Lenders API',
      status: 'Configured',
      statusColor: 'blue',
      description: 'Credit profile sharing with lenders',
      lastSync: 'Ready'
    },
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">Manage your platform configuration and integrations</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Organization Settings */}
        {settings.map((section, idx) => {
          const Icon = section.icon
          return (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-primary" />
                  <CardTitle>{section.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx}>
                    <label className="text-sm font-medium">{item.label}</label>
                    {item.type === 'toggle' ? (
                      <div className="mt-2 flex items-center gap-3">
                        <button className={`w-10 h-6 rounded-full transition-colors ${item.value ? 'bg-primary' : 'bg-muted'}`}>
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${item.value ? 'translate-x-5' : 'translate-x-1'}`} />
                        </button>
                        <span className="text-sm text-muted-foreground">{item.value ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    ) : (
                      <Input 
                        type={item.type} 
                        defaultValue={item.value as string} 
                        className="mt-2"
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <CardTitle>API Keys</CardTitle>
              </div>
              <Badge>Production</Badge>
            </div>
            <CardDescription>Manage API access for integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">API Key</label>
              <div className="flex gap-2 mt-2">
                <div className="flex-1 flex items-center bg-muted rounded-lg px-3 py-2 border border-border">
                  <code className="text-sm text-muted-foreground flex-1 font-mono">
                    {showApiKey ? 'ifz_prod_a1b2c3d4e5f6g7h8i9j0' : '••••••••••••••••••••'}
                  </code>
                  <button onClick={() => setShowApiKey(!showApiKey)} className="ml-2 hover:text-foreground text-muted-foreground">
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Button variant="outline" size="sm">Copy</Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Webhook URL</label>
              <Input 
                defaultValue="https://yourapp.com/webhooks/formalization" 
                className="mt-2"
              />
            </div>
            <div className="text-xs text-muted-foreground">
              Keep your API keys secure. Rotate them every 90 days for security.
            </div>
          </CardContent>
        </Card>

        {/* Database Configuration */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              <CardTitle>Data & Privacy</CardTitle>
            </div>
            <CardDescription>Configure data storage and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Data Residency</label>
              <select className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background">
                <option>Kenya (Primary)</option>
                <option>India</option>
                <option>Philippines</option>
                <option>Multi-Region (Federated)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Encryption</label>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>End-to-end encryption enabled</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Data Retention</label>
              <select className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background">
                <option>2 Years (Default)</option>
                <option>5 Years</option>
                <option>Indefinite</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              <CardTitle>External Integrations</CardTitle>
            </div>
            <CardDescription>Manage connections to external services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {integrations.map((integration, idx) => (
                <div key={idx} className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{integration.name}</h3>
                      <Badge 
                        variant="outline"
                        className={integration.statusColor === 'green' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}
                      >
                        {integration.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{integration.description}</p>
                    <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Settings</Button>
                    {integration.statusColor === 'green' && (
                      <Button variant="ghost" size="sm">Disconnect</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-destructive" />
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </div>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-destructive/20 rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Delete All Data</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete all trader records and formalization data. This action cannot be undone.
              </p>
              <Button variant="destructive" size="sm">Delete All Data</Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
