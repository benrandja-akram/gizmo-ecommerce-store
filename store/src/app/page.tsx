import { db } from '@/db'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/ui/carousel'
import { CategoriesList } from '@/ui/categories'
import { Policies } from '@/ui/policies'
import { ProductCard } from '@/ui/product-card'
import { ProductsHeader, ProductsList, ProductsRoot } from '@/ui/products-list'
import { ZapIcon } from 'lucide-react'

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
    name: 'Fast deliveries',
    description: '1~2 Days delivery',
  },
]

export default async function Home() {
  const [categories, flashProducts, popularProducts] = await Promise.all([
    db.category.findMany(),
    db.product.findMany({
      where: { isFlashSale: true },
      include: { category: true },
    }),
    db.product.findMany({
      take: 6,
      include: {
        category: true,
      },
    }),
  ])

  return (
    <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 ">
      <main className="mx-auto max-w-7xl pt-6 sm:pt-12">
        <div
          aria-label="Offers"
          className="mb-4 overflow-hidden rounded-lg border bg-white sm:mb-8 lg:mb-16"
        >
          <div className=" lg:px-8">
            <ul
              role="list"
              className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
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
        <div className="mb-4 sm:mb-8 lg:mb-16 lg:gap-12">
          <CategoriesList categories={categories} />
        </div>
        <ProductsRoot className="pt-4 md:pt-16">
          <ProductsHeader>
            <div className="flex items-center space-x-2 text-amber-500 ">
              <span>Ventes Flash</span>
              <ZapIcon className="" />{' '}
            </div>
          </ProductsHeader>
          <ProductsList>
            {flashProducts.map((product) => (
              <li className="h-full" key={product.id}>
                <ProductCard {...product} showCategory />
              </li>
            ))}
          </ProductsList>
        </ProductsRoot>

        <ProductsRoot className="pt-4 md:pt-16">
          <ProductsHeader>
            <div className="flex items-center space-x-2 text-amber-500 ">
              <span>Popular items</span>
              <ZapIcon className="" />{' '}
            </div>
          </ProductsHeader>
          <Carousel
            opts={{
              align: 'start',
              dragFree: true,
            }}
            className="mt-8 w-full pb-6"
          >
            <CarouselContent className="items-stretch">
              {popularProducts.map((product) => {
                return (
                  <CarouselItem
                    key={product.id}
                    className="flex h-full min-w-0 shrink-0 basis-[60%] flex-col sm:basis-[40%] md:basis-[28%] lg:basis-1/4"
                  >
                    <ProductCard {...product} showCategory />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="top-1/3  " />
            <CarouselNext className="top-1/3  " />
          </Carousel>
        </ProductsRoot>

        <Policies />
      </main>
    </div>
  )
}
