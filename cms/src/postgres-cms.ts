import { Category, db, Product } from '@gizmo/database'
import { CMSClient, CMSProduct, CMSProductWithCategory } from './types'

const normalizeProduct = (product: Product): CMSProduct => ({
  name: product.name,
  id: product.id,
  price: product.price,
  description: product.description,
  images: product.images,
  colors: product.colors,
  isFlashSale: !!product.isFlashSale,
})
const normalizeProductWithCategory = (p: Product & { category: Category }) => ({
  ...normalizeProduct(p),
  category: p.category,
})
const mapProducts = (
  data: (Product & { category?: Category })[],
): CMSProduct[] => data.map(normalizeProduct)
const mapProductsWithCategory = (
  data: (Product & { category: Category })[],
): CMSProductWithCategory[] => data.map(normalizeProductWithCategory)

const postgresCMSClient: CMSClient = {
  getCategoryById: async (id: string) => {
    return db.category.findUnique({
      where: { id },
    })
  },
  getCategories: async () => {
    return db.category.findMany({ orderBy: { position: 'asc' } })
  },
  getFeaturedProducts: async () => {
    const [accessories, cpus] = await Promise.all([
      db.product.findMany({
        take: 6,
        include: {
          category: true,
        },
        where: {
          categoryId: 'clavier-souris-tapis',
          price: {
            gt: 3000,
          },
        },
        orderBy: {
          price: 'asc',
        },
      }),
      db.product.findMany({
        take: 6,
        include: {
          category: true,
        },
        where: {
          categoryId: 'cpu',
        },
        orderBy: {
          price: 'asc',
        },
      }),
    ])

    return [
      {
        category: accessories[0].category,
        products: accessories,
      },
      {
        category: cpus[0].category,
        products: cpus,
      },
    ]
  },

  getProductsByCategory: async (categoryId: string) => {
    return db.product
      .findMany({
        where: {
          categoryId: {
            equals: categoryId,
          },
        },
        orderBy: {
          price: 'asc',
        },
      })
      .then(mapProducts)
  },

  getProductById: async (productId: string) => {
    return db.product
      .findUnique({
        where: { id: productId },
        include: { category: true },
      })
      .then((p) => {
        if (!p) return null
        return normalizeProductWithCategory(p)
      })
  },

  getFlashSaleProducts: async () => {
    return db.product
      .findMany({
        where: { isFlashSale: true },
        include: { category: true },
      })
      .then(mapProductsWithCategory)
  },
  getRecommendedProducts: async () => {
    return db.product
      .findMany({ take: 4, include: { category: true } })
      .then(mapProductsWithCategory)
  },
  getPopularProducts: async () => {
    return db.product
      .findMany({
        take: 6,
        include: {
          category: true,
        },
      })
      .then(mapProductsWithCategory)
  },
  getAllProducts: async () => {
    return db.product
      .findMany({ include: { category: true } })
      .then(mapProductsWithCategory)
  },
  getProductsByIds: async (ids: string[]) => {
    return db.product
      .findMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      .then(mapProducts)
  },

  searchProducts: async ({
    limit,
    query,
    category,
  }: {
    query: string
    limit: number
    category?: string
  }) => {
    return db.product
      .findMany({
        include: { category: true },
        orderBy: { price: 'asc' },
        where: {
          name: {
            contains: query,
            mode: 'insensitive',
          },
          categoryId: category || undefined,
        },
        take: limit,
      })
      .then(mapProductsWithCategory)
  },
  async createOrder({ products, shippingDetails }) {
    await db.$transaction(async (db) => {
      const allProducts = await db.product.findMany({
        where: {
          id: {
            in: products.map(({ id }) => id),
          },
        },
      })
      if (!allProducts.length) throw new Error('Bad request')
      return db.order.create({
        data: {
          ...shippingDetails,
          status: 'PENDING',
          subtotal: allProducts.reduce(
            (acc, current) =>
              acc +
              current.price *
                (products.find((p) => p.id === current.id)?.quantity ?? 0),
            0,
          ),
          deliveryFee: shippingDetails.deliveryFee,
          products: {
            createMany: {
              data: allProducts.map(({ id: productId, price }) => {
                return {
                  productId,
                  price,
                  quantity:
                    products.find((p) => p.id === productId)?.quantity ?? 0,
                }
              }),
            },
          },
        },
      })
    })
  },
}

export { postgresCMSClient }
