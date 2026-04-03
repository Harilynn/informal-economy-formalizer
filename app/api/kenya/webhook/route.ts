import { NextRequest, NextResponse } from 'next/server'
import { createIntake } from '@/lib/kenya-mvp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const intake = createIntake({
      phoneNumber: body.phoneNumber,
      consentGiven: Boolean(body.consentGiven),
      sourceLabel: body.sourceLabel || 'WhatsApp webhook',
      statementText: body.statementText,
    })

    return NextResponse.json({
      success: true,
      data: {
        intakeId: intake.id,
        status: 'processed',
        creditScore: intake.score.creditScore,
        fraudRiskBand: intake.fraud.fraudRiskBand,
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook processing failed'
    const status = message.includes('Consent') ? 400 : 500
    return NextResponse.json({ success: false, error: message }, { status })
  }
}