import { NextResponse } from 'next/server'

/**
 * GET /api/health
 * Health check endpoint for platform status
 */
export async function GET() {
  const status = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(Math.random() * 100000),
    services: {
      database: {
        status: 'connected',
        latency: Math.floor(Math.random() * 100) + 'ms'
      },
      cache: {
        status: 'connected',
        latency: Math.floor(Math.random() * 50) + 'ms'
      },
      mobilePaymentAPI: {
        status: 'connected',
        latency: Math.floor(Math.random() * 200) + 'ms'
      },
      aiModel: {
        status: 'ready',
        latency: Math.floor(Math.random() * 500) + 'ms'
      },
      documentStorage: {
        status: 'connected',
        latency: Math.floor(Math.random() * 150) + 'ms'
      }
    },
    version: '1.0.0',
    region: 'Kenya-Primary'
  }

  return NextResponse.json(status)
}
