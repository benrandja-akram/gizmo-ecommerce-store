import { getCenters, getCommunes, getDeliveryFees } from '@/utils/shipping'
import { Metadata } from 'next'
import { CheckoutForm } from './form'

export const metadata: Metadata = {
  title: 'Checkout',
}

async function CheckoutPage() {
  const [fees, centers, communes] = await Promise.all([
    getDeliveryFees(),
    getCenters(),
    getCommunes(),
  ])

  return <CheckoutForm fees={fees} centers={centers} communes={communes} />
}

export default CheckoutPage
