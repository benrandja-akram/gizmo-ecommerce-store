import { CategoriesList } from '@/components/ui/categories'
import { ProductCard } from '@/components/ui/product-card'
import {
  ProductsHeader,
  ProductsList,
  ProductsRoot,
} from '@/components/ui/products-list'
import { cmsClient } from '@/lib'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = { category: string }

async function CategoryPage({
  params: { category: categoryId },
}: {
  params: Params
}) {
  const [products, category, categories] = await Promise.all([
    cmsClient.getProductsByCategory(categoryId),
    cmsClient.getCategoryById(categoryId),
    cmsClient.getCategories(),
  ])

  if (!category) notFound()

  return (
    <div className="mx-auto min-h-[600px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl lg:max-w-7xl">
          <div className="py-8 text-center lg:py-16">
            <h1
              id={category.id}
              className="text-4xl font-bold tracking-tight text-gray-900 lg:text-6xl"
            >
              {category.name}
            </h1>
          </div>
        </div>

        <ProductsRoot>
          <ProductsHeader>{products.length} produits trouvés</ProductsHeader>
          <ProductsList>
            {products.map((product) => (
              <li className="h-full" key={product.id}>
                <ProductCard {...{ ...product, category }} showCategory />
              </li>
            ))}
          </ProductsList>
        </ProductsRoot>

        <div className="mb-4 mt-4 space-y-8 sm:mt-8 lg:mt-24 lg:gap-12">
          <h2 className="px-4 text-center text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Parcourir par catégorie
          </h2>
          <CategoriesList categories={categories} />
        </div>
      </div>
    </div>
  )
}

export const dynamicParams = false

export async function generateStaticParams() {
  const categories = await cmsClient.getCategories()

  return categories.map((category) => ({
    category: category.id,
  }))
}

export async function generateMetadata({
  params: { category: id },
}: {
  params: Params
}): Promise<Metadata> {
  const category = await cmsClient.getCategoryById(id)

  if (!category) return {}

  return {
    title: category.name,
    openGraph: {
      title: category.name,
    },
  }
}
export default CategoryPage
