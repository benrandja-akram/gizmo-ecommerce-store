import { getCenters, getCommunes, getDeliveryFees } from '@/utils/shipping'
import { CheckoutForm } from './form'

async function CheckoutPage() {
  const [fees, centers, communes] = await Promise.all([
    getDeliveryFees(),
    getCenters(),
    getCommunes(),
  ])

  return <CheckoutForm fees={fees} centers={centers} communes={communes} />
}

export default CheckoutPage
