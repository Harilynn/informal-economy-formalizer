'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRight,
  TrendingUp,
  Users,
  BarChart3,
  Lock,
  Zap,
  Globe,
  CheckCircle2,
  Smartphone,
  FileText,
  Gauge
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function Home() {
  const stats = [
    { value: '60%', label: 'Workers in Informal Economy', icon: Users },
    { value: '$16.8T', label: 'Estimated Global Market Size', icon: TrendingUp },
    { value: '2B+', label: 'Potential Users', icon: Globe },
  ]

  const features = [
    {
      icon: Smartphone,
      title: 'Non-Traditional Signal Parsing',
      description: 'Extract economic identity from mobile payments, WhatsApp business patterns, and physical foot traffic',
      color: 'from-primary to-blue-500'
    },
    {
      icon: FileText,
      title: 'Multi-Country Regulatory Mapping',
      description: 'Automatically navigate country-specific tax, credit scoring, and business registration requirements',
      color: 'from-accent to-orange-500'
    },
    {
      icon: Zap,
      title: 'End-to-End Formalization',
      description: 'AI-powered agent handles complete workflow from signal collection to legal documentation',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Lock,
      title: 'Privacy-First Architecture',
      description: 'Federated storage, encrypted data handling, and zero-knowledge proofs for credential sharing',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Gauge,
      title: 'Credit Profile Generation',
      description: 'Instant conversion of informal signals into bank-readable credit profiles with dossiers',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics Dashboard',
      description: 'Real-time insights into signal patterns, credit trends, and formalization progress',
      color: 'from-cyan-500 to-blue-500'
    },
  ]

  const workflow = [
    {
      step: 1,
      title: 'Signal Ingestion',
      description: 'Collect M-Pesa statements, WhatsApp business patterns, and community vouching',
      icon: Smartphone
    },
    {
      step: 2,
      title: 'AI Identity Construction',
      description: 'Build unified economic identity graph, detect fraud, score confidence',
      icon: TrendingUp
    },
    {
      step: 3,
      title: 'Regulatory Mapping',
      description: 'Navigate formalization pathway for target country and institution',
      icon: FileText
    },
    {
      step: 4,
      title: 'Output Generation',
      description: 'Create credit profiles, contracts, and tax registration documents',
      icon: CheckCircle2
    },
  ]

  return (
    <div className="w-full">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center space-y-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <Badge variant="outline" className="px-4 py-1.5">
                <Zap className="w-3 h-3 mr-1" />
                Formalize the Informal Economy
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-balance"
              variants={itemVariants}
            >
              Unlock Capital Access for 2+ Billion Workers
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
              variants={itemVariants}
            >
              AI-powered platform that transforms informal economic signals into verifiable identities, credit profiles, and legal structures—unlocking access to capital for the world&apos;s informal workforce.
            </motion.p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/traders">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Explore Traders <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                View Dashboard <BarChart3 className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-b border-border">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive platform built for scale, security, and regulatory compliance
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div key={idx} variants={itemVariants}>
                  <Card className="hover:shadow-lg transition-shadow h-full hover:scale-105 transform duration-300">
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              End-to-end formalization pipeline powered by AI agents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workflow.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Bring the Informal Economy Into the System?</h2>
            <p className="text-lg text-muted-foreground">
              Start by uploading trader profiles, viewing analytics, or setting up your field agent network
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/traders">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Browse Traders <Users className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/analytics">
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                Analytics Dashboard <BarChart3 className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2024 Informal Economy Formalizer. Unlocking capital access for billions worldwide.</p>
        </div>
      </footer>
    </div>
  )
}
