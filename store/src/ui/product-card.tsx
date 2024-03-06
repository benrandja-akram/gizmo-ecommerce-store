import type { Category, Product } from '@/db'
import { clsx } from '@/utils/clsx'
import { ZapIcon } from 'lucide-react'
import Link from 'next/link'
import { AddToCart } from './cart'

type Props = Product & {
  category: Category
  showCategory?: boolean
}

function ProductCard({ showCategory, ...product }: Props) {
  return (
    <div
      key={product.id}
      className="flex h-full w-full flex-col text-center md:w-auto"
    >
      <div className="group relative">
        <Link
          href={`/product/${product.id}`}
          className={clsx(
            'relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border bg-white',
            product.isFlashSale && 'border-amber-300',
          )}
          aria-label={product.name}
        >
          <img
            src={product.images[0]}
            alt={''}
            className="h-[80%] w-[80%] rounded-md object-cover object-center group-hover:opacity-75"
          />

          {product.isFlashSale && (
            <span className="absolute right-0 top-0 rounded-bl bg-amber-400 px-1 py-1.5">
              <ZapIcon className="w-6 stroke-white" />
            </span>
          )}
        </Link>
        <Link
          href={`/product/${product.id}`}
          className="mt-2 block cursor-pointer text-xs sm:text-sm md:text-base lg:mt-4"
        >
          {showCategory && (
            <p className="mb-1 text-gray-500 sm:text-sm">
              {product.category.name}
            </p>
          )}

          <div>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm font-bold tabular-nums text-gray-900 sm:text-lg">
              {product.price.toLocaleString()} DA
            </p>
          </div>

          {!!product.colors?.length && (
            <ul
              role="list"
              className="mt-auto flex items-center justify-center space-x-3 pt-2"
            >
              {product.colors.map((color) => (
                <li
                  key={color}
                  className="h-4 w-4 rounded-full border border-black border-opacity-10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </ul>
          )}
        </Link>
      </div>
      <div className="mt-3 flex flex-1 flex-col justify-end">
        <AddToCart size="sm" product={product.id} />
      </div>
    </div>
  )
}

export { ProductCard }
