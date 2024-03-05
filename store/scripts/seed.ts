import { db } from '@/db'
import { faker } from '@faker-js/faker'
import slug from 'slug'

const images = [
  'https://static.bhphoto.com/images/images150x150/1709622000000_1085232.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1616837.jpg',
  'https://static.bhphoto.com/images/categoryImages/1709622000000_13341.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1723471.jpg',
  'https://static.bhphoto.com/images/categoryImages/1709622000000_13341.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1304347.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1365559.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1764661.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1764661.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1396144.jpg',
]
async function main() {
  db.$transaction(async (db) => {
    await db.category.deleteMany()
    faker.seed(10)
    const names = [
      ...new Set(
        new Array(10).fill(null).map(() => faker.commerce.department()),
      ),
    ]
    await db.category.createMany({
      data: names.map((name, position) => {
        return {
          id: slug(name, { locale: 'fr' }).toLocaleLowerCase(),
          name,
          position,
          description: faker.commerce.productDescription(),
          image: images[position % images.length],
        }
      }),
    })
    const categories = await db.category.findMany()
    let count = 0
    await Promise.all(
      categories.map((category, c) => {
        return db.product.createMany({
          data: new Array(8).fill(null).map((_, p) => {
            const name = faker.commerce.productName()
            return {
              id: slug(name, { locale: 'fr' }).toLocaleLowerCase(),
              categoryId: category.id,
              price: Math.floor(Math.random() * 30) * 1000,
              images: new Array(3).fill(
                images[Math.floor(Math.random() * images.length)],
              ),
              name,
              description: faker.lorem.paragraphs(3, '\n'),
              techSpecs: faker.lorem.paragraphs(3, '\n'),
              isFlashSale: c < 4 && p === 0,
              // colors: new Array(3).fill(null).map(() => faker.color.rgb()),
            }
          }),
        })
      }),
    )
  })
}

main()
