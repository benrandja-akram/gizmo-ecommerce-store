// Import needed packages
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

declare global {
  namespace PrismaJson {
    type ProductVariant = string[]
  }
}

neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

// store PrismaClient as a global variable in development environments only
//https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const db = globalForPrisma.prisma || new PrismaClient({ adapter })
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

export type { Category, Product } from '@prisma/client'
export { db }
