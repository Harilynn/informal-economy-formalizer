import { NextRequest, NextResponse } from 'next/server'

// In a real app, this would query a database
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
    status: 'complete',
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
    status: 'complete',
    signals: {
      mobileData: 92,
      businessPattern: 85,
      communityReputation: 82,
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let filteredTraders = traders

    // Filter by status
    if (status) {
      filteredTraders = filteredTraders.filter(t => t.status === status)
    }

    // Filter by search term
    if (search) {
      const term = search.toLowerCase()
      filteredTraders = filteredTraders.filter(t =>
        t.name.toLowerCase().includes(term) ||
        t.businessType.toLowerCase().includes(term) ||
        t.location.toLowerCase().includes(term)
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredTraders,
      count: filteredTraders.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch traders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.businessType || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In a real app, this would save to database
    const newTrader = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      signalScore: 0,
      formalityLevel: 0,
      signals: {
        mobileData: 0,
        businessPattern: 0,
        communityReputation: 0,
      }
    }

    return NextResponse.json({
      success: true,
      data: newTrader,
      message: 'Trader created successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create trader' },
      { status: 500 }
    )
  }
}
