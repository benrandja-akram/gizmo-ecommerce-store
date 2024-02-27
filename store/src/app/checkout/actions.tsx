'use server'

import { db } from '@/db'
import { getDeliveryFees } from '@/utils/shipping'
import { cookies } from 'next/headers'
import { SchemaValue, checkoutSchema } from './schema'

async function checkout(
  products: { id: number; quantity: number }[],
  shippingDetails: SchemaValue,
) {
  try {
    const data = checkoutSchema.parse(shippingDetails)
    const fees = await getDeliveryFees()
    const deliveryFee = fees.data.find(
      (v) => v.wilaya_id.toString() === data.wilaya,
    )
    if (!deliveryFee) throw new Error('Bad request')

    const bareOrder = await db.$transaction(async (db) => {
      const allProducts = await db.product.findMany({
        where: {
          id: {
            in: products.map(({ id }) => id),
          },
        },
      })
      if (!allProducts.length) throw new Error('Bad request')
      return db.order.create({
        data: {
          ...data,
          status: 'PENDING',
          subtotal: allProducts.reduce(
            (acc, current) =>
              acc +
              current.price *
                (products.find((p) => p.id === current.id)?.quantity ?? 0),
            0,
          ),
          deliveryFee:
            data.deliveryType === 'STOP_DESK'
              ? deliveryFee?.desk_fee
              : deliveryFee?.home_fee,
          products: {
            createMany: {
              data: allProducts.map(({ id: productId, price }) => {
                return {
                  productId,
                  price,
                  quantity:
                    products.find((p) => p.id === productId)?.quantity ?? 0,
                }
              }),
            },
          },
        },
      })
    })
    cookies().delete('cart')
    // const order = await db.order.findUnique({
    //   where: {
    //     id: bareOrder.id,
    //   },
    //   include: {
    //     products: {
    //       include: {
    //         product: true,
    //       },
    //     },
    //   },
    // })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}

export { checkout }
