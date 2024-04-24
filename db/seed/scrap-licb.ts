import { writeFileSync } from 'fs'
import playwright from 'playwright'
const categories = [
  'https://www.licbplus.com/product-category/composants-pc/carte-mere/',
  'https://www.licbplus.com/product-category/composants-pc/cpu/',
  'https://www.licbplus.com.dz/product-category/peripherique-pc/clavier-souris-tapis/',
  'https://www.licbplus.com/product-category/composants-pc/memoire/',
  'https://www.licbplus.com/product-category/composants-pc/ssd/',
  'https://www.licbplus.com/product-category/composants-pc/carte-graphique/',
  'https://www.licbplus.com/product-category/composants-pc/alimentation/',
  'https://www.licbplus.com/product-category/composants-pc/boitier/',
]
function splitIntoChunks<T>(arr: Array<T>, n: number) {
  const result = []
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
    const name = (await page.textContent(
      'body > div.main-container.shop-page.left-sidebar > div > div > div.main-content.col-lg-9.col-md-8.col-sm-8.col-xs-12.has-sidebar > header > h1',
    ))!
    const products = await page.$$eval(
      'body > div.main-container.shop-page.left-sidebar > div > div > div.main-content.col-lg-9.col-md-8.col-sm-8.col-xs-12.has-sidebar > div.row.auto-clear.equal-container.better-height.ecome-products > ul > li > div > div > a.thumb-link',
      (products) =>
        products.map((p) => p.getAttribute('href') ?? '').filter(Boolean),
    )
    allProducts.push({ name, products, link: category })
    console.log(name, products.length)
  }
  writeFileSync('./scripts/categories.json', JSON.stringify(allProducts))

  const data: any[] = []
  const pages = await Promise.all(
    new Array(10).fill(null).map(() => browser.newPage()),
  )
  for (const products of splitIntoChunks(
    allProducts.map((c) => c.products).flat(),
    10,
  )) {
    await Promise.all(
      products.map(async (product, i) => {
        console.log(product)
        const page = pages[i]
        await page.goto(product)
        await page.waitForLoadState('networkidle')

        const infos = await page.$$eval('.summary.entry-summary', ([el]) => ({
          name: el.querySelector('h1')?.textContent,
          price: el.querySelector('.price')?.textContent,
          description: el.querySelector(
            '.woocommerce-product-details__short-description',
          )?.textContent,
        }))
        const images = await page.$$eval(
          '.woocommerce-product-gallery--with-images ol li img',
          (images) => images.map((img) => img.getAttribute('src')),
        )

        console.log({ url: product, ...infos, images })
        data.push({ url: product, ...infos, images })
      }),
    )
  }
  writeFileSync('./scripts/products.json', JSON.stringify(data))

  await browser.close()
}
main()
