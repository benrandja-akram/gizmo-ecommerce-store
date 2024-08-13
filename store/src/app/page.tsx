import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { CategoriesList } from '@/components/ui/categories'
import { Policies } from '@/components/ui/policies'
import { ProductCard } from '@/components/ui/product-card'
import {
  ProductsHeader,
  ProductsList,
  ProductsRoot,
} from '@/components/ui/products-list'
import { cmsClient } from '@/lib'
import { ZapIcon } from 'lucide-react'

const offers = [
  {
    name: 'Paiement',
    description: 'Paiement à la livraison',
  },
  {
    name: 'Laivraison',
    description: 'Livraison à domicile 58 wilayas.',
  },
  {
    name: 'Livraison rapide',
    description: 'Livraison 1 à 2 jours',
  },
]

export default async function Home() {
  const [categories, flashProducts, popularProducts, featured] =
    await Promise.all([
      cmsClient.getCategories(),
      cmsClient.getFlashSaleProducts(),
      cmsClient.getPopularProducts(),
      cmsClient.getFeaturedProducts(),
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
                <ProductCard
                  {...product}
                  category={product.category}
                  showCategory
                />
              </li>
            ))}
          </ProductsList>
        </ProductsRoot>

        <ProductsRoot className="pt-4 md:pt-16">
          <ProductsHeader>Produits populaires</ProductsHeader>

          <ProductsList>
            {popularProducts.map((product) => (
              <li className="h-full" key={product.id}>
                <ProductCard {...product} showCategory />
              </li>
            ))}
          </ProductsList>
        </ProductsRoot>

        {featured.map(({ category, products }) => {
          return (
            <ProductsRoot key={category.id} className="pt-4 md:pt-16">
              <ProductsHeader href={`/category/${category.id}`}>
                {category.name}
              </ProductsHeader>
              <Carousel
                opts={{
                  align: 'start',
                  dragFree: true,
                }}
                className="mt-8 w-full pb-6"
              >
                <CarouselContent className="items-stretch">
                  {products.map((product) => {
                    return (
                      <CarouselItem
                        key={product.id}
                        className="flex h-full min-w-0 shrink-0 basis-[60%] flex-col sm:basis-[40%] md:basis-[28%] lg:basis-1/4"
                      >
                        <ProductCard
                          {...product}
                          category={category}
                          showCategory
                        />
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
                <CarouselPrevious className="top-1/3  " />
                <CarouselNext className="top-1/3  " />
              </Carousel>
            </ProductsRoot>
          )
        })}

        <Policies />
      </main>
    </div>
  )
}
