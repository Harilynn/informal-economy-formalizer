import { NextRequest, NextResponse } from 'next/server'
import { createIntake, getIntake, listIntakes } from '@/lib/kenya-mvp'

export async function GET(request: NextRequest) {
  const intakeId = request.nextUrl.searchParams.get('id')

  if (intakeId) {
    const intake = getIntake(intakeId)

    if (!intake) {
      return NextResponse.json({ success: false, error: 'Intake not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: intake })
  }

  return NextResponse.json({ success: true, data: listIntakes(), count: listIntakes().length })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const intake = createIntake({
      phoneNumber: body.phoneNumber,
      consentGiven: Boolean(body.consentGiven),
      sourceLabel: body.sourceLabel,
      statementText: body.statementText,
    })

    return NextResponse.json({ success: true, data: intake })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create intake'
    const status = message.includes('Consent') ? 400 : 500
    return NextResponse.json({ success: false, error: message }, { status })
  }
}