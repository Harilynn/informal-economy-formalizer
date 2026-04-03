import { NextRequest, NextResponse } from 'next/server'
import { generateDossier, getIntake } from '@/lib/kenya-mvp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const intakeId = body.intakeId as string | undefined

    if (!intakeId) {
      return NextResponse.json({ success: false, error: 'intakeId is required' }, { status: 400 })
    }

    const intake = getIntake(intakeId)
    if (!intake) {
      return NextResponse.json({ success: false, error: 'Intake not found' }, { status: 404 })
    }

    const dossier = generateDossier(intake)
    intake.dossier = dossier

    return NextResponse.json({
      success: true,
      data: {
        intakeId,
        summary: dossier.summary,
        sections: dossier.sections,
        html: dossier.html,
      },
    })
  } catch (error) {
    console.error('[API] Kenya dossier error:', error)
    return NextResponse.json({ success: false, error: 'Failed to generate dossier' }, { status: 500 })
  }
}