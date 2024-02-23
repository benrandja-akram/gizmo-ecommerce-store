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
    return NextResponse.json(products)
  } catch (error) {
    NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

export { GET }
