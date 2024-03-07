import { Badge } from '@/components/badge'
import { db } from '@/db'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel'
import { AddToCart } from '@/ui/cart'
import { Markdown } from '@/ui/markdown'
import { Policies } from '@/ui/policies'
import { ProductCard } from '@/ui/product-card'
import { ProductsHeader, ProductsList, ProductsRoot } from '@/ui/products-list'
import { Zoom } from '@/ui/zoom'
import { clsx } from '@/utils/clsx'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const features = [
  'En stock',
  'Livraison à domicile 58 Wilaya',
  'Paiement à la livraison',
]

type Params = { product: string }

export default async function ProductPage({
  params: { product: id },
}: {
  params: Params
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
        <div className="grid gap-y-6 lg:grid-cols-2 lg:gap-x-20">
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
                Information produit
              </h2>

              <p className="text-lg font-extrabold tracking-tighter text-gray-900 sm:text-2xl">
                {product.price.toLocaleString()} DA
              </p>
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
                  aria-label="informations"
                >
                  {['Description', 'Spécifications techniques'].map((tab) => {
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
          <div className="order-1 flex items-start justify-center lg:order-2 lg:col-start-2 lg:row-span-2">
            <Carousel
              opts={{
                align: 'start',
              }}
              className="mt-8 w-full"
            >
              <CarouselContent>
                {product.images.map((image, i) => {
                  return (
                    <CarouselItem
                      key={i}
                      className="flex h-full min-w-0 shrink-0 basis-4/5 flex-col sm:basis-3/5 md:basis-2/5 lg:basis-4/5"
                    >
                      <div className="aspect-h-1 aspect-w-1 flex w-full  items-start justify-center overflow-hidden rounded-lg">
                        <div className="rounded-lg border bg-white p-6 lg:p-12">
                          <Zoom>
                            <img
                              src={image}
                              alt={''}
                              className="w-full rounded object-cover object-center"
                            />
                          </Zoom>
                        </div>
                      </div>{' '}
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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

export async function generateStaticParams() {
  const products = await db.product.findMany()

  return products.map((product) => ({
    product: product.id,
  }))
}

export async function generateMetadata({
  params: { product: id },
}: {
  params: Params
}): Promise<Metadata> {
  const product = await db.product.findUnique({
    where: { id },
  })

  if (!product) return {}

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
    },
  }
}

export const dynamicParams = false
