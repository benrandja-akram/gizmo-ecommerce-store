import { cache } from 'react'
import { db } from '.'

const getCategories = cache(() => db.category.findMany())
const getCategoriesWithProducts = cache(() =>
  db.category.findMany({ include: { products: true } }),
)

export { getCategories, getCategoriesWithProducts }
