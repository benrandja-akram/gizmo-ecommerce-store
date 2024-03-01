import { getCategoriesWithProducts } from '@/db/category'
import { ProductCard } from '@/ui/product-card'
import { ProductsHeader, ProductsList, ProductsRoot } from '@/ui/products-list'
const offers = [
  {
    name: 'Laivraison ',
    description: 'Laivraison a domicile 58 wilayas.',
  },
  {
    name: 'Fast delivery',
    description: '1~2 Days delivery',
  },
]

export default async function Home() {
  const categories = await getCategoriesWithProducts()

  return (
    <div className="grid gap-8 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 ">
      <main className="mx-auto max-w-7xl pt-6 sm:pt-8">
        <h1 className="mb-6 text-center text-3xl font-extrabold leading-tight tracking-tighter sm:mb-8 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:mb-16 lg:text-6xl lg:leading-tight">
          le meilleur endroit pour acheter{' '}
          <span className="bg-gradient-to-br from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
            des composants PC
          </span>
        </h1>

        <div
          aria-label="Offers"
          className="mx-auto mb-4 max-w-3xl overflow-hidden rounded-lg border sm:mb-8 lg:-mt-2 lg:mb-16"
        >
          <div className=" lg:px-8">
            <ul
              role="list"
              className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-2 lg:divide-x lg:divide-y-0"
            >
              {offers.map((offer) => (
                <li
                  key={offer.name}
                  className="flex flex-1 flex-col justify-center bg-white px-4 py-4 text-center focus:z-10 sm:py-6"
                >
                  <p className="text-sm text-gray-500">{offer.name}</p>
                  <p className="font-semibold text-gray-900">
                    {offer.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid">
          {categories
            .filter((c) => c.products.length)
            .map((category) => {
              return (
                <ProductsRoot
                  key={category.id}
                  id={`category-${category.id}`}
                  className="pt-8 first:pt-4 md:pt-16"
                >
                  <ProductsHeader>{category.name}</ProductsHeader>
                  <ProductsList>
                    {category.products.map((product) => (
                      <li className="h-full" key={product.id}>
                        <ProductCard
                          {...{ ...product, category }}
                          showCategory
                        />
                      </li>
                    ))}
                  </ProductsList>
                </ProductsRoot>
              )
            })}
        </div>
      </main>
    </div>
  )
}
