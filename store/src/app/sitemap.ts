import { db } from '@/db'
import { WWW } from '@/utils/constants'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemaps = await Promise.all([
    getProductsSitemap(),
    getCategoriesSitemap(),
  ])

  return [
    {
      url: getURL('/'),
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },

    {
      url: getURL('/checkout'),
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
    ...sitemaps.flat(),
  ]
}

async function getProductsSitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await db.product.findMany({ select: { id: true } })
  return products.map((product) => {
    return {
      url: getURL(`/product/${product.id}`),
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    }
  })
}
async function getCategoriesSitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await db.category.findMany({ select: { id: true } })
  return categories.map((category) => {
    return {
      url: getURL(`/category/${category.id}`),
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    }
  })
}
function getURL(path: string) {
  return new URL(path, WWW).toString()
}
