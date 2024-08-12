import { PrismaClient } from '@prisma/client'

declare global {
  namespace PrismaJson {
    type ProductVariant = string[]
  }
}

const connectionString = `${process.env.DATABASE_URL}`

// store PrismaClient as a global variable in development environments only
//https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const db = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export type { Category, Product } from '@prisma/client'
export { db }
