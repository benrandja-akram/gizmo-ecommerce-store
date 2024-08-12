import { writeFileSync } from 'fs'
import playwright from 'playwright'

const CHUNK_SIZE = 8
const categories = [
  'https://www.licbplus.com/category/motherboard',
  'https://www.licbplus.com/category/cpu',
  'https://www.licbplus.com/category/keyboard',
  'https://www.licbplus.com/category/memory',
  'https://www.licbplus.com/category/ssd',
  'https://www.licbplus.com/category/graphics-card',
  'https://www.licbplus.com/category/power-supply',
  'https://www.licbplus.com/category/case',
]
function splitIntoChunks<T>(arr: Array<T>, n: number) {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n))
  }
  return result
}
async function main() {
  const browser = await playwright.chromium.launch()
  const page = await browser.newPage()
  const allProducts: { name: string; link: string; products: string[] }[] = []

  for (const category of categories) {
    await page.goto(category + `?ecome_product_per_page=5000`)
    await page.waitForLoadState('networkidle')
    const name = category.split('/').pop()!
    const products = await page.$$eval(
      '#product-list>div a.action-btn',
      (products) =>
        products.map((link) => link.getAttribute('href') ?? '').filter(Boolean),
    )
    allProducts.push({ name, products, link: category })
    console.log(name, products.length)
  }
  writeFileSync('./seed/categories.json', JSON.stringify(allProducts))

  const data: any[] = []
  const pages = await Promise.all(
    new Array(CHUNK_SIZE).fill(null).map(() => browser.newPage()),
  )
  for (const products of splitIntoChunks(
    allProducts.map((c) => c.products).flat(),
    CHUNK_SIZE,
  )) {
    await Promise.all(
      products.map(async (product, i) => {
        console.log(product)
        const page = pages[i]
        await page.goto(product, { timeout: 60000 })
        await page.waitForLoadState('networkidle')

        const infos = await page.$$eval('.product-detail', ([el]) =>
          !el
            ? null
            : {
                name: el?.querySelector('h2')?.textContent,
                price: el?.querySelector('.current-price')?.textContent,
                description: el?.querySelector('.short-desc')?.textContent,
              },
        )
        if (!infos) return
        const images = await page.$$eval(
          '.slider-nav-thumbnails .slick-list.draggable img',
          (images) => images.map((img) => img.getAttribute('src')),
        )

        console.log({ url: product, ...infos })
        data.push({ url: product, ...infos, images })
      }),
    )
  }
  writeFileSync('./seed/products.json', JSON.stringify(data))

  await browser.close()
}
main()
