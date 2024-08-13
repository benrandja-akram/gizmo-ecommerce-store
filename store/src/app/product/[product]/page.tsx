import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { AddToCart, ProductCartToggle } from '@/components/ui/cart'
import { Policies } from '@/components/ui/policies'
import { ProductCard } from '@/components/ui/product-card'
import {
  ProductsHeader,
  ProductsList,
  ProductsRoot,
} from '@/components/ui/products-list'
import { Zoom } from '@/components/ui/zoom'
import { cmsClient } from '@/lib'
import { Badge } from '@gizmo/ui'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Metadata } from 'next'
import Image from 'next/image'
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
    cmsClient.getProductById(id),
    cmsClient.getRecommendedProducts(id),
  ])

  if (!product) notFound()

  return (
    <div
      id={`product_${product.id}`}
      className="grid px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 "
    >
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
              <h2
                id={product.id}
                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              >
                {product.name}
              </h2>
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
                  <div className="mt-4 space-y-6">{product.description}</div>
                )}
                <div className="flex flex-col gap-4">
                  <ProductCartToggle size="base" product={product.id} />
                  <Link href="/checkout">
                    <AddToCart size="base" product={product.id}>
                      Acheter maintenant
                    </AddToCart>
                  </Link>
                </div>
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
            </section>
          </div>

          {/* Product image */}
          <div className="order-1 flex items-start justify-center lg:order-2 lg:col-start-2 lg:row-span-2">
            <Carousel
              opts={{
                align: 'start',
                dragFree: true,
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
                      <div className="relative flex aspect-square min-h-full w-full min-w-full items-center justify-center overflow-hidden rounded-lg border bg-white">
                        <Zoom classDialog="min-w-full">
                          <Image
                            className="fill h-full w-full rounded bg-white object-cover object-center"
                            src={image}
                            width={600}
                            height={600}
                            quality={80}
                            alt={''}
                          />
                        </Zoom>
                      </div>
                    </CarouselItem>
                  )
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

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

        <Policies />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const products = await cmsClient.getAllProducts()

  return products.map((product) => ({
    product: product.id,
  }))
}

export async function generateMetadata({
  params: { product: id },
}: {
  params: Params
}): Promise<Metadata> {
  const product = await cmsClient.getProductById(id)

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
