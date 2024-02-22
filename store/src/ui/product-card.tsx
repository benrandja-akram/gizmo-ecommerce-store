import Link from 'next/link'

type Props = Product

function ProductCard({ ...product }: Props) {
  return (
    <div
      key={product.id}
      className="inline-flex w-full flex-col text-center md:w-auto"
    >
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
          <img
            src={product.imageSrc}
            alt={product.imageAlt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">{product.color}</p>
          <h3 className="mt-1 font-semibold text-gray-900">
            <Link href={product.href}>
              <span className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-gray-900">{product.price}</p>
        </div>
      </div>

      <h4 className="sr-only">Available colors</h4>
      <ul
        role="list"
        className="mt-auto flex items-center justify-center space-x-3 pt-6"
      >
        {product.availableColors.map((color) => (
          <li
            key={color.name}
            className="h-4 w-4 rounded-full border border-black border-opacity-10"
            style={{ backgroundColor: color.colorBg }}
          >
            <span className="sr-only">{color.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ProductCard }
