import { useCart } from '@/hooks/use-cart'
import { Product } from '@prisma/client'
import { useMemo } from 'react'
import useSWR from 'swr'

function useCartProducts({ enabled }: { enabled: boolean }) {
  const cart = useCart()
  const ids = useMemo(() => cart.items.map((item) => item.id), [cart.items])

  const search = new URLSearchParams()
  ids.forEach((id) => search.append('product', id))
  const {
    data: products,
    isLoading,
    error,
  } = useSWR<Product[]>(
    enabled && ids.length ? `/api/products?${search}` : null,
    () => fetch(`/api/products?${search}`).then((res) => res.json()),
    {
      revalidateOnFocus: false,
    },
  )

  return {
    ids,
    products,
    isLoading,
    error,
  }
}

export { useCartProducts }
