import { Badge } from '@/components/badge'
import { db } from '@/db'
import { AddToCart } from '@/ui/cart'
import { Markdown } from '@/ui/markdown'
import { ProductCard } from '@/ui/product-card'
import { ProductsHeader, ProductsList, ProductsRoot } from '@/ui/products-list'
import { Zoom } from '@/ui/zoom'
import { clsx } from '@/utils/clsx'
import { CheckIcon, StarIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const reviews = { average: 5, totalCount: Math.floor(Math.random() * 20) }
const policies = [
  {
    name: 'Free delivery all year long',
    description:
      'Name another place that offers year long free delivery? We’ll be waiting. Order now and you’ll get delivery absolutely free.',
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg',
  },
  {
    name: '24/7 Customer Support',
    description:
      'Or so we want you to believe. In reality our chat widget is powered by a naive series of if/else statements that churn out canned responses. Guaranteed to irritate.',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg',
  },
  {
    name: 'Fast Shopping Cart',
    description:
      "Look at the cart in that icon, there's never been a faster cart. What does this mean for the actual checkout experience? I don't know.",
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg',
  },
  {
    name: 'Gift Cards',
    description:
      "We sell these hoping that you will buy them for your friends and they will never actually use it. Free money for us, it's great.",
    imageSrc:
      'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
  },
]
const features = ['In Stock', 'Livraison a domicile', '1~2 days delivery']
export default async function ProductPage({
  params: { product: id },
}: {
  params: { product: string }
}) {
  const [product, recommendedProducts] = await Promise.all([
    db.product.findUnique({
      where: { id: +id },
      include: { category: true },
    }),
    db.product.findMany({ take: 4, include: { category: true } }),
  ])
  if (!product) notFound()

  return (
    <div className="mx-auto grid max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 ">
      <div className="mx-auto grid max-w-xl gap-y-6 lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
        {/* Product details */}
        <div className="order-2 lg:order-1 lg:max-w-lg lg:self-end">
          <Link href={`/#category-${product.category.id}`}>
            <Badge color="indigo">
              <div className="text-sm font-bold">{product?.category.name}</div>
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
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
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
          </section>
        </div>

        {/* Product image */}
        <div className="order-1 mt-10 lg:order-2 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 flex items-center justify-center overflow-hidden rounded-lg">
            <Zoom>
              <img
                src={product.image}
                alt={''}
                className="h-full w-full max-w-sm object-cover object-center"
              />
            </Zoom>
          </div>
        </div>
      </div>

      <ProductsRoot className="pt-16 md:pt-32">
        <ProductsHeader>Les clients ont également acheté</ProductsHeader>
        <ProductsList>
          {recommendedProducts.map((product) => (
            <li className="h-full" key={product.id}>
              <ProductCard {...product} showCategory />
            </li>
          ))}
        </ProductsList>
      </ProductsRoot>

      <section aria-labelledby="policy-heading" className="my-16 lg:my-24">
        <h2 id="policy-heading" className="sr-only">
          Our policies
        </h2>
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {policies.map((policy) => (
            <div key={policy.name}>
              <img src={policy.imageSrc} alt="" className="h-24 w-auto" />
              <h3 className="mt-6 text-base font-medium text-gray-900">
                {policy.name}
              </h3>
              <p className="mt-3 text-base text-gray-500">
                {policy.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
export const dynamicParams = false

export async function generateStaticParams() {
  const products = await db.product.findMany()

  return products.map((post) => ({
    product: post.id.toString(),
  }))
}
