import { db } from '@/db'
import { faker } from '@faker-js/faker'
import slug from 'slug'

async function main() {
  db.$transaction(async (db) => {
    await db.category.deleteMany()
    await db.category.createMany({
      data: new Array(5).fill(null).map((_, position) => {
        const name = faker.commerce.department()
        return {
          id: slug(name, { locale: 'fr' }).toLocaleLowerCase(),
          name,
          image: null,
          position,
          description: faker.commerce.productDescription(),
        }
      }),
    })
    const categories = await db.category.findMany()
    await Promise.all(
      categories.map((category) => {
        return db.product.createMany({
          data: new Array(4).fill(null).map(() => {
            const name = faker.commerce.productName()
            return {
              id: slug(name, { locale: 'fr' }).toLocaleLowerCase(),
              categoryId: category.id,
              price: Math.floor(Math.random() * 30) * 1000,
              image: faker.image.urlPicsumPhotos(),
              name,
              description: faker.commerce.productDescription(),
              // colors: new Array(3).fill(null).map(() => faker.color.rgb()),
            }
          }),
        })
      }),
    )
  })
}

main()
