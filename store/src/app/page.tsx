import { getCategoriesWithProducts } from '@/db/category'
import { Category, CategoryHeader, CategoryList } from '@/ui/category'
import { ProductCard } from '@/ui/product-card'
const offers = [
  {
    name: 'Laivraison ',
    description: 'Laivraison a domicile 58 wilayas.',
  },
  {
    name: 'Fast delivery',
    description: '1~2 Days delivery',
  },
  {
    name: 'Sign up for our newsletter',
    description: '15% off your first order',
  },
]
export default async function Home() {
  const categories = await getCategoriesWithProducts()

  return (
    <div className="grid gap-8 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 ">
      <main className="mx-auto max-w-7xl pt-8">
        <h1 className="mb-8 px-4 text-center text-4xl font-extrabold leading-tight tracking-tighter sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:mb-16 lg:text-6xl lg:leading-tight">
          The best place to shop <br />
          <span className="bg-gradient-to-br from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
            PS gift cards
          </span>
        </h1>

        <div
          aria-label="Offers"
          className="mb-8 overflow-hidden rounded-lg border lg:-mt-2 lg:mb-16"
        >
          <div className="mx-auto max-w-7xl lg:px-8">
            <ul
              role="list"
              className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
            >
              {offers.map((offer) => (
                <li
                  key={offer.name}
                  className="flex flex-1 flex-col justify-center bg-white px-4 py-6 text-center focus:z-10"
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

        <div className="grid gap-8 md:gap-16">
          {categories
            .filter((c) => c.products.length)
            .map((category) => {
              return (
                <Category key={category.id} id={`category-${category.id}`}>
                  <CategoryHeader>{category.name}</CategoryHeader>
                  <CategoryList>
                    {category.products.map((product) => (
                      <li key={product.id}>
                        <ProductCard {...product} />
                      </li>
                    ))}
                  </CategoryList>
                </Category>
              )
            })}
        </div>
      </main>
    </div>
  )
}
