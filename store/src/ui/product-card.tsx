import type { Category, Product } from '@/db'
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
      className="inline-flex h-full w-full flex-col text-center md:w-auto"
    >
      <div className="group relative">
        <Link
          href={`/product/${product.id}`}
          className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border"
        >
          <img
            src={product.image}
            alt={''}
            className="h-[80%] w-[80%] rounded-md object-cover object-center group-hover:opacity-75"
          />
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
              {product.price} DA
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
