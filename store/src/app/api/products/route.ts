import { cmsClient } from '@/lib'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  try {
    const products = await cmsClient.getProductsByIds(
      searchParams.getAll('product'),
    )
    const cartProducts = JSON.parse(cookies().get('cart')?.value ?? '') as {
      id: string
    }[]
    // update cart if some products are out of stock, deleted ...etc
    cookies().set({
      name: 'cart',
      value: JSON.stringify(
        cartProducts.filter((c) => products.some((p) => p.id === c.id)),
      ),
      path: '/',
      maxAge: 365 * 24 * 3600 * 1000, // 1 year
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export { GET }
