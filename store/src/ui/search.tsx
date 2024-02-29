'use client'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { CommandPaletteDialog } from '@/components/command-palette-dialog'
import { useCart } from '@/hooks/use-cart'
import { useDialog } from '@/hooks/use-dialog'
import { ProductFallback } from '@/ui/product-fallback'
import { clsx } from '@/utils/clsx'
import { Combobox } from '@headlessui/react'
import {
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import type { Category, Product } from '@prisma/client'
import { MoveRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'

function Search() {
  const router = useRouter()
  const { isOpen: open, setOpen } = useDialog('search')
  const cart = useCart()

  const [inputQuery, setQuery] = useState('')
  const [query] = useDebounce(inputQuery, 300)

  const { data, isLoading } = useSWR<(Product & { category: Category })[]>(
    open && query ? `search?query=${query}` : null,
    () =>
      fetch(`/api/products/search?query=${query}`).then((res) => res.json()),
  )

  return (
    <>
      <button
        onClick={setOpen.bind(undefined, true)}
        className="text-gray-400 outline-none hover:text-gray-500"
      >
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <CommandPaletteDialog
        afterLeave={() => setQuery('')}
        open={open}
        onOpenChange={setOpen}
      >
        <Combobox
          onChange={(product) => {
            router.push(`/product/${product}`)
          }}
          value={inputQuery}
        >
          <div className="relative flex items-center">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <Combobox.Input
              className="h-12 w-full flex-1 border-0 bg-transparent pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
              placeholder="Search..."
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
              value={inputQuery}
            />
            <Link href={`/search/${query}`} className="mr-2">
              <Button className={'overflow-hidden rounded-full'}>
                <span className="hidden sm:inline">Rechercher</span>
                <MoveRightIcon
                  className="h-4 w-4 !text-white "
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </div>
          {isLoading && (
            <div className="divide-y">
              {new Array(3).fill(null).map((_, i) => {
                return (
                  <div key={i} className="py-3">
                    <ProductFallback key={i} size="sm" />
                  </div>
                )
              })}
            </div>
          )}

          {!!data?.length && (
            <>
              <Combobox.Options
                static
                className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3"
              >
                {data.map((product) => (
                  <Combobox.Option
                    key={product.id}
                    value={product.id}
                    className={({ focus }) =>
                      clsx(
                        'cursor-default select-none rounded-xl p-2',
                        focus && 'bg-gray-100',
                      )
                    }
                  >
                    {({ focus }) => (
                      <Link
                        className="flex items-center space-x-3"
                        href={`/product/${product.id}`}
                      >
                        <div
                          className={clsx(
                            'flex h-12 w-12 flex-none items-start justify-center rounded-lg',
                          )}
                        >
                          <img
                            src={product.image}
                            className="h-full w-full rounded border object-cover"
                            alt=""
                          />
                        </div>
                        <div className="grid items-start gap-0.5">
                          <div>
                            <Badge className="leading-none">
                              {product.category.name}
                            </Badge>
                          </div>
                          <p
                            className={clsx(
                              'truncate text-sm font-medium',
                              focus ? 'text-gray-900' : 'text-gray-700',
                            )}
                          >
                            {product.name}
                          </p>
                        </div>
                      </Link>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
              <Link href={`/search/${query}`} className="mx-3 mb-3 block">
                <Button className="w-full">View all</Button>
              </Link>
            </>
          )}

          {inputQuery !== '' && data?.length === 0 && (
            <div className="px-6 py-14 text-center text-sm sm:px-14">
              <ExclamationCircleIcon
                type="outline"
                name="exclamation-circle"
                className="mx-auto h-6 w-6 text-gray-400"
              />
              <p className="mt-4 font-semibold text-gray-900">
                No results found
              </p>
              <p className="mt-2 text-gray-500">
                No components found for this search term. Please try again.
              </p>
            </div>
          )}
        </Combobox>
      </CommandPaletteDialog>
    </>
  )
}

export { Search }
