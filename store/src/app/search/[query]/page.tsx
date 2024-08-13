import { ProductCard } from '@/components/ui/product-card'
import {
  ProductsHeader,
  ProductsList,
  ProductsRoot,
} from '@/components/ui/products-list'
import { cmsClient } from '@/lib'
import { Filters } from './filters'

async function SearchPage({
  params: { query },
  searchParams,
}: {
  params: { query: string }
  searchParams: { category?: string }
}) {
  const [categories, products] = await Promise.all([
    cmsClient.getCategories(),
    cmsClient.searchProducts({
      query,
      category: searchParams.category || undefined,
    }),
  ])

  return (
    <section aria-labelledby="products-heading" className="pb-24 pt-6">
      <h2 id="products-heading" className="sr-only">
        Produits
      </h2>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-[220px_1fr]">
        {/* Filters */}
        <Filters
          categories={categories}
          selectedCategory={searchParams.category}
        />

        {/* Product grid */}
        <div className=" ">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
          <ProductsRoot className="">
            <ProductsHeader>{products.length} produits trouvés</ProductsHeader>
            <ProductsList>
              {products.map((product) => (
                <li className="h-full" key={product.id}>
                  <ProductCard showCategory {...product} />
                </li>
              ))}
            </ProductsList>
          </ProductsRoot>
        </div>
      </div>
    </section>
  )
}

export default SearchPage
