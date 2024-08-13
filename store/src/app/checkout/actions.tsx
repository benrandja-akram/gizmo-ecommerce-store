'use server'

import { cmsClient } from '@/lib'
import { getDeliveryFees } from '@/utils/shipping'
import { cookies } from 'next/headers'
import { SchemaValue, checkoutSchema } from './schema'

async function checkout(
  products: { id: string; quantity: number }[],
  shippingDetails: SchemaValue,
) {
  try {
    const data = checkoutSchema.parse(shippingDetails)
    const fees = await getDeliveryFees()
    const deliveryFee = fees.data.find(
      (v) => v.wilaya_id.toString() === data.wilaya,
    )
    if (!deliveryFee) throw new Error('Bad request')
    await cmsClient.createOrder({
      products,
      shippingDetails: {
        ...data,
        deliveryFee:
          data.deliveryType === 'STOP_DESK'
            ? deliveryFee.desk_fee
            : deliveryFee.home_fee,
      },
    })

    cookies().delete('cart')

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}

export { checkout }
