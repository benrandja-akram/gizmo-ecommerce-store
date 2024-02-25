'use client'

import { Button } from '@/components/button'
import { Drawer } from '@/components/drawer'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { useCart } from '@/hooks/use-cart'
import { clsx } from '@/utils/clsx'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Product } from '@prisma/client'
import cookies from 'js-cookie'
import { CheckCheckIcon, ShoppingCartIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ProductFallback } from './product-fallback'

function Cart() {
  const cart = useCart()
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    useCart.setState((state) => ({
      ...state,
      items: JSON.parse(cookies.get('cart') ?? '[]'),
    }))

    const unsubscribe = useCart.subscribe((state) => {
      cookies.set(
        'cart',
        JSON.stringify(
          state.items.map(({ id, quantity }) => ({ id, quantity })),
        ),
      )
    })

    return unsubscribe
  }, [])

  const ids = useMemo(() => cart.items.map((item) => item.id), [cart.items])

  useEffect(() => {
    if (open && ids.length) {
      const search = new URLSearchParams()
      ids.forEach((id) => search.append('product', id.toString()))
      fetch(`/api/products?${search}`)
        .then((res) => res.json())
        .then(setProducts)
    } else {
      // wait for drawer exit animation before reseting state
      setTimeout(() => {
        setProducts([])
      }, 500)
    }
  }, [open, ids])

  return (
    <>
      <button
        type="button"
        className={'group relative -m-2 flex items-center p-2'}
        onClick={() => setOpen(true)}
      >
        <ShoppingCartIcon
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        {!!cart.items.length && (
          <span
            className={
              'fade-in-0 zoom-in-0 absolute -right-2 -top-1 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white'
            }
          >
            {cart.items.length}
          </span>
        )}
      </button>

      <Drawer show={open} onClose={setOpen}>
        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="flex items-start justify-between">
              <Dialog.Title className="text-lg font-medium text-gray-900">
                Shopping cart
              </Dialog.Title>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
            {!products.length && !ids.length && (
              <div className="mt-8 grid items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-sm">
                <h3 className="text-center text-base font-bold">
                  Cart is empty!!
                </h3>

                <p className="text-gray-700">
                  Get started by adding products into cart
                </p>
              </div>
            )}
            {!!products.length && (
              <div className="-mx-4 mt-8 sm:-mx-6 ">
                <CartProducts
                  products={cart.items
                    .map((item) => products.find((p) => p.id === item.id)!)
                    .filter((p) => p.id)}
                />
              </div>
            )}

            {!products.length && (
              <div className="mt-8 divide-y">
                {new Array(ids.length).fill(null).map((_, i) => {
                  return <ProductFallback key={i} />
                })}
              </div>
            )}
          </div>

          {!!products.length && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-4 border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="mb-4 flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>
                  {products.reduce(
                    (acc, current) =>
                      acc +
                      current.price *
                        (cart.items.find((i) => i.id === current.id)
                          ?.quantity ?? 0),
                    0,
                  )}{' '}
                  DA
                </p>
              </div>

              <Link
                href="/checkout"
                className="mt-6"
                onClick={() => setOpen(false)}
              >
                <Button className={'w-full py-2.5'}>Checkout</Button>
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </>
  )
}

function CartProducts({ products }: { products: Product[] }) {
  const cart = useCart()

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {products
        .map((p) => ({
          ...p,
          quantity: cart.items.find((i) => i.id === p.id)?.quantity,
        }))
        .map((product) => (
          <li key={product.id} className="flex px-4 py-6 sm:px-6">
            <div className="flex-shrink-0">
              <img src={product.image} alt={''} className="w-20 rounded-md" />
            </div>

            <div className="ml-6 flex flex-1 flex-col">
              <div className="flex">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm">
                    <Link
                      href={`/products/${product.id}`}
                      className="font-medium text-gray-700 hover:text-gray-800"
                    >
                      {product.name}
                    </Link>
                  </h4>
                </div>

                <div className="ml-4 flow-root flex-shrink-0">
                  <button
                    onClick={() => cart.removeItem(product.id)}
                    type="button"
                    className="-m-2.5  flex items-center justify-center bg-white p-2.5 text-gray-600 hover:text-red-500"
                  >
                    <span className="sr-only">Remove</span>
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 items-end justify-between pt-2">
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {product.price}
                </p>

                <div className="">
                  <div className="ml-4 min-w-[80px]">
                    <Listbox
                      defaultValue={product.quantity ?? 1}
                      onChange={(value) =>
                        cart.updateQuantity(product.id, value)
                      }
                    >
                      {new Array(4).fill(0).map((_, i) => {
                        return (
                          <ListboxOption key={i} value={i + 1}>
                            <ListboxLabel>{i + 1}</ListboxLabel>
                          </ListboxOption>
                        )
                      })}
                    </Listbox>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  )
}

function AddToCart({
  product,
  size = 'base',
}: {
  product: number
  size?: 'sm' | 'base'
}) {
  const cart = useCart()

  const selected = cart.items.some((item) => item.id === product)
  return (
    <Button
      color={selected ? 'green' : 'dark/white'}
      onClick={() => {
        if (!selected) cart.addItem({ id: product, quantity: 1 })
        else cart.removeItem(product)
      }}
      className={clsx(
        'w-full',
        size === 'base'
          ? 'px-3 py-3'
          : 'px-1 py-1.5 text-xs sm:!px-2 sm:!py-2 sm:text-sm/6',
      )}
    >
      {!selected ? (
        <>
          <ShoppingCartIcon className="w-4 sm:w-5" />
          Ajouter au panier
        </>
      ) : (
        <>
          <CheckCheckIcon className="w-4 sm:w-5" />
          En panier
        </>
      )}
    </Button>
  )
}

export { AddToCart, Cart, CartProducts }
