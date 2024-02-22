import { db } from '@/db'
import { faker } from '@faker-js/faker'

async function main() {
  db.$transaction(async (db) => {
    await db.category.deleteMany()
    await db.category.createMany({
      data: new Array(3).fill(null).map(() => ({
        name: faker.commerce.department(),
        image: null,
      })),
    })
    const categories = await db.category.findMany()
    await Promise.all(
      categories.map((category) => {
        return db.product.createMany({
          data: new Array(4).fill(null).map(() => ({
            categoryId: category.id,
            price: Math.floor(Math.random() * 30) * 1000,
            image: faker.image.urlPicsumPhotos(),
            name: faker.commerce.productName(),
            colors: new Array(3).fill(null).map(() => faker.color.rgb()),
          })),
        })
      }),
    )
  })
}

main()
