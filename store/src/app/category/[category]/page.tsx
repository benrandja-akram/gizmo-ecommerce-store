import { db } from '@/db'
import { CategoriesList } from '@/ui/categories'
import { ProductCard } from '@/ui/product-card'
import { ProductsList, ProductsRoot } from '@/ui/products-list'
import { notFound } from 'next/navigation'

async function CategoryPage({
  params: { category: categoryId },
}: {
  params: { category: string }
}) {
  const [products, category, categories] = await Promise.all([
    db.product.findMany({
      where: {
        categoryId: {
          equals: categoryId,
        },
      },
    }),
    db.category.findFirst({
      where: { id: { equals: categoryId } },
    }),
    db.category.findMany(),
  ])

  if (!category) notFound()
  return (
    <div className="mx-auto min-h-[600px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl lg:max-w-7xl">
          <div className="py-8 text-center lg:py-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {category.name}
            </h1>
            {category.description && (
              <p className="mx-auto mt-4 max-w-3xl text-base text-gray-500">
                {category.description}
              </p>
            )}
          </div>
        </div>

        <ProductsRoot>
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
            Shop by category
          </h2>
          <CategoriesList categories={categories} />
        </div>
      </div>
    </div>
  )
}

export const dynamicParams = false

export async function generateStaticParams() {
  const categories = await db.category.findMany()

  return categories.map((category) => ({
    category: category.id,
  }))
}

export default CategoryPage
