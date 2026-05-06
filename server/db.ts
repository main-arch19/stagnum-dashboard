import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Don't instantiate PrismaClient if DATABASE_URL is missing or is the placeholder
// from .env.example — prevents startup crashes before the DB is connected.
function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? ''
  if (!url || url.includes('USER:PASSWORD')) {
    // Return a proxy that throws a clear error only when a query is attempted,
    // so pages that don't touch the DB (e.g. /login) render without issue.
    return new Proxy({} as PrismaClient, {
      get(_, prop) {
        if (prop === '$disconnect' || prop === '$connect') return () => Promise.resolve()
        throw new Error(
          `DATABASE_URL is not configured. Set it in your environment variables before making database calls. (attempted: ${String(prop)})`
        )
      },
    })
  }
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const db = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
