import { clsx } from '@/components/ui/clsx'
import type { Category, Product } from '@/db'
import { ZapIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCartToggle } from './cart'

type Props = Product & {
  category: Category
  showCategory?: boolean
}

function ProductCard({ showCategory, ...product }: Props) {
  return (
    <div
      key={product.id}
      className="flex h-full w-full flex-col text-center md:w-auto"
      id={`product_${product.id}`}
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
          <div className="relative h-[80%] w-[80%] group-hover:opacity-75">
            <Image
              src={product.images[0]}
              alt={''}
              fill
              className="rounded-md object-cover object-center"
            />
          </div>

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
            <h2 className="mb-1 text-gray-500 sm:text-sm">
              {product.category.name}
            </h2>
          )}

          <div>
            <h3 className="font-semibold text-gray-900" id={product.id}>
              {product.name}
            </h3>
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
        <ProductCartToggle size="sm" product={product.id} />
      </div>
    </div>
  )
}

export { ProductCard }
