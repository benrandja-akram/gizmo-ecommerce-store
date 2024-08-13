import { cmsClient } from '@/lib'
import { getURL } from '@/utils/utils'
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
  const products = await cmsClient.getAllProducts()
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
  const categories = await cmsClient.getCategories()
  return categories.map((category) => {
    return {
      url: getURL(`/category/${category.id}`),
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    }
  })
}
