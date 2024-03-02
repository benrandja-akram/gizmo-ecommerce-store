import { db } from '@/db'
import { ProductCard } from '@/ui/product-card'
import { ProductsList, ProductsRoot } from '@/ui/products-list'
import { notFound } from 'next/navigation'

async function CategoryPage({
  params: { category: categoryId },
}: {
  params: { category: string }
}) {
  const [products, category] = await Promise.all([
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
  ])

  if (!category) notFound()
  return (
    <div className="mx-auto min-h-[600px] max-w-7xl py-12">
      <div className="mx-auto  max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
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

      <ProductsRoot className="px-4">
        <ProductsList>
          {products.map((product) => (
            <li className="h-full" key={product.id}>
              <ProductCard {...{ ...product, category }} showCategory />
            </li>
          ))}
        </ProductsList>
      </ProductsRoot>
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
