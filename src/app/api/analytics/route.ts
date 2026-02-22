import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { getAnalyticsSummary } from '@/features/admin/analytics-summary'

export async function GET() {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { summary, visits } = await getAnalyticsSummary()
    return NextResponse.json(
      { summary, visits },
      {
        headers: { 'Cache-Control': 'no-store' },
      },
    )
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code
    if (code === 'P2021') {
      return NextResponse.json({ message: 'Database not initialized' }, { status: 503 })
    }
    console.error('Analytics error:', err)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
