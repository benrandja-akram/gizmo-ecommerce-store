import { db } from '@/db'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  try {
    const products = await db.product.findMany({
      where: {
        id: {
          in: searchParams.getAll('product').map((p) => +p),
        },
      },
    })
    if (process.env.NODE_ENV === 'development')
      await new Promise((res) => setTimeout(res, 1000))
    return NextResponse.json(products)
  } catch (error) {
    NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export { GET }
