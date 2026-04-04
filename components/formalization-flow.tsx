'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle2, 
  Circle,
  ArrowRight,
  FileText,
  DollarSign,
  Shield,
  Building,
  Zap
} from 'lucide-react'

interface FormalizationStep {
  id: number
  title: string
  description: string
  icon: typeof FileText
  status: 'completed' | 'current' | 'pending'
  time?: string
}

const steps: FormalizationStep[] = [
  {
    id: 1,
    title: 'Signal Collection',
    description: 'M-Pesa data, WhatsApp patterns, community verification',
    icon: Shield,
    status: 'completed',
    time: 'Completed'
  },
  {
    id: 2,
    title: 'Economic Identity',
    description: 'AI agent constructs unified identity graph from signals',
    icon: FileText,
    status: 'completed',
    time: 'Completed'
  },
  {
    id: 3,
    title: 'Credit Scoring',
    description: 'ML model generates creditworthiness score and narrative',
    icon: DollarSign,
    status: 'current',
    time: 'In Progress'
  },
  {
    id: 4,
    title: 'Legal Documents',
    description: 'Auto-generate contracts and tax registration forms',
    icon: FileText,
    status: 'pending',
    time: 'Pending'
  },
  {
    id: 5,
    title: 'Financial Access',
    description: 'Connect to microfinance products and lenders',
    icon: Building,
    status: 'pending',
    time: 'Pending'
  }
]

export function FormalizationFlow() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          Formalization Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === steps.length - 1

            return (
              <div key={step.id}>
                <div className="flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.status === 'completed' 
                        ? 'bg-green-100 border-green-600' 
                        : step.status === 'current'
                        ? 'bg-primary/20 border-primary'
                        : 'bg-muted border-muted-foreground'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>
                    {!isLast && (
                      <div className={`w-1 h-16 mt-2 ${
                        step.status === 'completed' 
                          ? 'bg-green-600' 
                          : 'bg-muted-foreground/30'
                      }`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline"
                        className={
                          step.status === 'completed' 
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : step.status === 'current'
                            ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse'
                            : 'bg-gray-50 text-gray-600 border-gray-200'
                        }
                      >
                        {step.time}
                      </Badge>
                    </div>

                    {/* Action Button */}
                    {step.status === 'current' && (
                      <Button size="sm" className="mt-3 gap-2">
                        <ArrowRight className="w-4 h-4" />
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">2/5</div>
            <div className="text-xs text-muted-foreground">Steps Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">1</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted-foreground">2</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
