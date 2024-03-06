import { getURL } from '@/utils/utils'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: getURL('/sitemap.xml'),
  }
}
