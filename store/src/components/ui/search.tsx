'use client'

import { Button } from '@/components/atoms/button'
import { CommandPaletteDialog } from '@/components/atoms/command-palette-dialog'
import { ProductFallback } from '@/components/ui/product-fallback'
import { useDialog } from '@/hooks/use-dialog'
import { clsx } from '@/utils/clsx'
import {
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import type { Category, Product } from '@prisma/client'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState, useTransition } from 'react'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'

function Search() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { isOpen: open, setOpen } = useDialog('search')
  const inputRef = useRef<HTMLInputElement>(null)

  const [inputQuery, setQuery] = useState('')
  const [query] = useDebounce(inputQuery, 300)

  const { data, isLoading } = useSWR<(Product & { category: Category })[]>(
    open && query ? `search?query=${query}` : null,
    () =>
      fetch(`/api/products/search?query=${query}`).then((res) => res.json()),
    {
      revalidateOnFocus: false,
    },
  )

  useEffect(() => {
    if (open) queueMicrotask(() => inputRef.current?.focus())
  }, [open])

  return (
    <>
      <button
        onClick={setOpen.bind(undefined, true)}
        className="group flex items-center gap-2 rounded-md text-sm text-gray-400 outline-none hover:text-gray-500 md:bg-gray-100 md:px-2.5 md:py-2 md:pr-8"
        aria-label="Rechercher"
      >
        <MagnifyingGlassIcon
          className="h-6 w-6 md:h-5 md:w-5"
          aria-hidden="true"
        />
        <span className="hidden text-gray-500 group-hover:text-gray-700 md:block">
          Rechercher
        </span>
      </button>
      <CommandPaletteDialog
        afterLeave={() => setQuery('')}
        open={open}
        onOpenChange={setOpen}
      >
        <div>
          <form
            className={clsx(
              'relative flex items-center border-b',
              query && 'border-b',
            )}
            onSubmit={(e) => {
              e.preventDefault()
              startTransition(() => void router.push(`/search/${query}`))
            }}
          >
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              className="h-12 w-full flex-1 border-0 bg-transparent pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
              placeholder="I5 13600k"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setQuery(event.target.value)
              }
              value={inputQuery}
              name="query"
              autoComplete="off"
            />
            <Button
              type="submit"
              className={'mr-3 overflow-hidden rounded-full'}
              disabled={pending}
            >
              <span className="hidden sm:inline">Rechercher</span>
              <ArrowRightIcon
                className="h-4 w-4 !text-white "
                aria-hidden="true"
              />
            </Button>
          </form>
          {isLoading && (
            <div className="">
              <div className="divide-y">
                {new Array(4).fill(null).map((_, i) => {
                  return (
                    <div key={i} className="py-3">
                      <ProductFallback key={i} size="sm" />
                    </div>
                  )
                })}
              </div>

              <div className="mx-3 my-4 h-10 animate-pulse rounded-lg bg-slate-300" />
            </div>
          )}

          {!!data?.length && (
            <>
              <ul className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3">
                {data.map((product) => (
                  <li
                    key={product.id}
                    value={product.id}
                    className={
                      'cursor-default select-none rounded-xl p-2 hover:bg-blue-50'
                    }
                  >
                    <Link
                      className="flex items-center space-x-3"
                      href={`/product/${product.id}`}
                    >
                      <div
                        className={
                          'flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-lg border bg-white'
                        }
                      >
                        <img
                          src={product.images[0]}
                          className="h-[90%] w-[90%] object-cover transition-all"
                          alt=""
                        />
                      </div>
                      <div className="grid items-start gap-0.5 text-sm">
                        <p className={'truncate font-medium text-gray-700'}>
                          {product.name}
                        </p>
                        <p className="font-semibold">
                          {product.price.toLocaleString()} DA
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/search/${query}`} className="mx-3 mb-3 block">
                <Button className="w-full">Voir tout</Button>
              </Link>
            </>
          )}

          {inputQuery !== '' && data?.length === 0 && (
            <div className="px-6 py-14 text-center text-sm sm:px-14">
              <ExclamationCircleIcon
                type="outline"
                name="exclamation-circle"
                className="mx-auto h-6 w-6 text-red-400"
              />
              <p className="mt-4 font-semibold text-gray-900">
                Aucun résultat trouvé
              </p>
              <p className="mt-2 text-gray-500">
                Aucun produit trouvé pour ce terme de recherche. Veuillez
                réessayer.
              </p>
            </div>
          )}
        </div>
      </CommandPaletteDialog>
    </>
  )
}

export { Search }
