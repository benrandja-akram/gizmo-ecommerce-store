export type CMSCategory = {
  id: string
  name: string
  image: string
}
export type CMSProduct = {
  id: string
  name: string
  price: number
  description: string | null
  images: string[]
  isFlashSale?: boolean | null
  colors?: string[] | null
}
export type CMSProductWithCategory = CMSProduct & { category: CMSCategory }
export type CMSShippingDetails = {
  phone: string
  name: string
  wilaya: string
  deliveryType: 'STOP_DESK' | 'TO_HOME'
  commune?: string
  stopDesk?: string
  address?: string
  notes: string
  deliveryFee: number
}
export type CMSClient = {
  getCategoryById(id: string): Promise<CMSCategory | null>
  getCategories(): Promise<CMSCategory[]>

  getFeaturedProducts(): Promise<
    { category: CMSCategory; products: CMSProduct[] }[]
  >
  getAllProducts(): Promise<CMSProductWithCategory[]>
  getProductsByCategory(categoryId: string): Promise<CMSProduct[]>
  getProductById(productId: string): Promise<CMSProductWithCategory | null>
  getFlashSaleProducts(): Promise<CMSProductWithCategory[]>
  getPopularProducts(): Promise<CMSProductWithCategory[]>
  getRecommendedProducts(produt: string): Promise<CMSProductWithCategory[]>
  getProductsByIds(ids: string[]): Promise<CMSProduct[]>
  searchProducts(params: {
    query: string
    limit?: number
    category?: string
  }): Promise<CMSProductWithCategory[]>

  createOrder(data: {
    products: { id: string; quantity: number }[]
    shippingDetails: CMSShippingDetails
  }): Promise<void>
}
