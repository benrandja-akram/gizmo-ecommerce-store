import { Category } from '@prisma/client'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel'

function CategoriesList({ categories }: { categories: Category[] }) {
  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true,
      }}
    >
      <CarouselContent>
        {categories.map((category) => {
          return (
            <CarouselItem
              key={category.id}
              className="min-w-0 shrink-0 basis-[30%] md:basis-[19%] lg:basis-[15%] "
            >
              <Link
                href={`/category/${category.id}`}
                key={category.id}
                className="group grid gap-2 transition-all hover:opacity-80"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-full border bg-white">
                  <img
                    src={category.image}
                    alt=""
                    className="max-h-[70%] max-w-[70%] object-cover transition-all group-hover:scale-110"
                  />
                </div>
                <span className="text-center text-sm font-bold sm:text-base lg:text-lg">
                  {category.name}
                </span>
              </Link>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export { CategoriesList }
