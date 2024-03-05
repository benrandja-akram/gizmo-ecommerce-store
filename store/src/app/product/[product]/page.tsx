import { Badge } from '@/components/badge'
import { db } from '@/db'
import { AddToCart } from '@/ui/cart'
import { Markdown } from '@/ui/markdown'
import { Policies } from '@/ui/policies'
import { ProductCard } from '@/ui/product-card'
import { ProductsHeader, ProductsList, ProductsRoot } from '@/ui/products-list'
import { Zoom } from '@/ui/zoom'
import { clsx } from '@/utils/clsx'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { CheckIcon, StarIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const reviews = { average: 5, totalCount: Math.floor(Math.random() * 20) }

const features = ['In Stock', 'Livraison a domicile', '1~2 days delivery']

export default async function ProductPage({
  params: { product: id },
}: {
  params: { product: string }
}) {
  const [product, recommendedProducts] = await Promise.all([
    db.product.findUnique({
      where: { id },
      include: { category: true },
    }),
    db.product.findMany({ take: 4, include: { category: true } }),
  ])
  if (!product) notFound()

  return (
    <div className="grid px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 ">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-y-6 lg:grid-cols-2 lg:gap-x-8">
          {/* Product details */}
          <div className="order-2 lg:order-1 lg:self-end">
            <Link href={`/category/${product.category.id}`}>
              <Badge color="indigo">
                <div className="text-sm font-bold">
                  {product?.category.name}
                </div>
              </Badge>
            </Link>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg font-bold text-gray-900 sm:text-xl">
                  {product.price} DA
                </p>

                <div className="ml-4 border-l border-gray-300 pl-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={clsx(
                              reviews.average > rating
                                ? 'text-yellow-400'
                                : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0',
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {reviews.average} out of 5 stars
                      </p>
                    </div>
                    <p className="ml-2 text-sm text-gray-500">
                      {reviews.totalCount} reviews
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col-reverse gap-4 lg:flex-col">
                {product.description && (
                  <div className="mt-4 space-y-6">
                    <Markdown content={product.description} />
                  </div>
                )}
                <AddToCart size="base" product={product.id} />
              </div>
              <div className="mt-6 grid gap-3">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <CheckIcon
                      className="h-5 w-5 flex-shrink-0 text-green-500"
                      aria-hidden="true"
                    />
                    <p className="ml-2 text-sm text-gray-500">{feature}</p>
                  </div>
                ))}
              </div>

              <TabGroup as="div" className={'mt-8'}>
                <TabList
                  className=" -mb-px mt-4 flex space-x-8 border-b border-gray-200"
                  aria-label="Tabs"
                >
                  {['Description', 'Tech specs'].map((tab) => {
                    return (
                      <Tab
                        key={tab}
                        className={clsx(
                          '[whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium outline-none',
                          'ui-selected:border-indigo-500 ui-selected:text-indigo-600',
                          'ui-not-selected:border-transparent ui-not-selected:text-gray-500 ui-not-selected:hover:border-gray-300 ui-not-selected:hover:text-gray-700',
                        )}
                      >
                        {tab}
                      </Tab>
                    )
                  })}
                </TabList>

                <TabPanels className={'py-6'}>
                  <TabPanel>
                    <Markdown content={product.description ?? ''} />
                  </TabPanel>
                  <TabPanel>
                    <Markdown content={product.techSpecs ?? ''} />
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </section>
          </div>

          {/* Product image */}
          <div className="order-1 mt-10 lg:order-2 lg:col-start-2 lg:row-span-2 lg:mt-0">
            <div className="aspect-h-1 aspect-w-1 flex w-full items-start justify-center overflow-hidden rounded-lg">
              <div className="rounded-lg border bg-white p-6 lg:p-12">
                <Zoom>
                  <img
                    src={product.images[0]}
                    alt={''}
                    className="w-[300px] max-w-full rounded object-cover object-center"
                  />
                </Zoom>
              </div>
            </div>
          </div>
        </div>

        <Policies />

        <ProductsRoot className="pt-8 lg:pt-16">
          <ProductsHeader>Les clients ont également acheté</ProductsHeader>
          <ProductsList>
            {recommendedProducts.map((product) => (
              <li className="h-full" key={product.id}>
                <ProductCard {...product} showCategory />
              </li>
            ))}
          </ProductsList>
        </ProductsRoot>
      </div>
    </div>
  )
}
export const dynamicParams = false

export async function generateStaticParams() {
  const products = await db.product.findMany()

  return products.map((product) => ({
    product: product.id,
  }))
}
