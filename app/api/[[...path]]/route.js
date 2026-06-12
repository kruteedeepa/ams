import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'AMS API ready' })
}

export async function POST(request) {
  try {
    const body = await request.json()
    return NextResponse.json({ success: true, data: body })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
