import { cache } from 'react'
import { db } from '.'

const getCategories = cache(() =>
  db.category.findMany({ orderBy: { position: 'asc' } }),
)
const getCategoriesWithProducts = cache(() =>
  db.category.findMany({
    include: { products: true },
    orderBy: { position: 'asc' },
  }),
)

export { getCategories, getCategoriesWithProducts }
