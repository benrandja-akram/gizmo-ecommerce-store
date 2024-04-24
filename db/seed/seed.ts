import { db } from '@/db'
import { faker } from '@faker-js/faker'
import slug from 'slug'
import licbCategories from './categories.json'
import licbProducts from './products.json'
const images = [
  'https://static.bhphoto.com/images/images150x150/1709622000000_1304347.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1723471.jpg',
  'https://i.ebayimg.com/images/g/YsoAAOSw7R1hC1mm/s-l1600.jpg',
  'https://static.bhphoto.com/images/categoryImages/1709622000000_13341.jpg',
  'https://i.ebayimg.com/thumbs/images/g/ztgAAOSwkLVl2z~x/s-l300.webp',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1085232.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1365559.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1616837.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1764661.jpg',
  'https://static.bhphoto.com/images/images150x150/1709622000000_1396144.jpg',
]

async function main() {
  db.$transaction(async (db) => {
    await db.category.deleteMany()

    await db.category.createMany({
      data: licbCategories.map(({ name }, position) => {
        return {
          id: slug(name, { locale: 'fr' }).toLocaleLowerCase(),
          name,
          position,
          description: faker.commerce.productDescription(),
          image: images[position % images.length],
        }
      }),
    })

    await db.product.createMany({
      data: licbProducts.map((product, i) => {
        return {
          id: slug(product.name, { locale: 'fr' }).toLocaleLowerCase(),
          categoryId: slug(
            licbCategories.find((c) => c.products.includes(product.url))!.name,
            { locale: 'fr' },
          ),
          price: parseInt(product.price.replace(',', '')),
          images: product.images.map((img) => img.replace('-100x100', '')),
          name: product.name,
          description: product.description ?? faker.lorem.paragraphs(3, '\n'),
          techSpecs: faker.lorem.paragraphs(3, '\n'),
          isFlashSale: i < 4,
        }
      }),
    })
  })
}

main()
