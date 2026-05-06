import { initTRPC, TRPCError } from '@trpc/server'
import { auth } from '@/lib/auth'
import { db } from './db'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { UserRole } from '@prisma/client'

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth()
  return {
    db,
    session,
    user: session?.user ?? null,
    headers: opts.headers,
  }
}

type Context = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createCallerFactory = t.createCallerFactory
export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.user,
    },
  })
})

export const protectedProcedure = t.procedure.use(isAuthenticated)

const isFounder = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  if (ctx.user.role !== 'FOUNDER') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Founder access required' })
  }
  return next({ ctx: { ...ctx, session: ctx.session, user: ctx.user } })
})

export const founderProcedure = t.procedure.use(isFounder)

const isQSOrFounder = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
  if (!['QS', 'FOUNDER'].includes(ctx.user.role)) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'QS or Founder access required' })
  }
  return next({ ctx: { ...ctx, session: ctx.session, user: ctx.user } })
})

export const qsOrFounderProcedure = t.procedure.use(isQSOrFounder)

const isAdminOrFounder = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })
  if (!['ADMIN', 'FOUNDER'].includes(ctx.user.role)) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin or Founder access required' })
  }
  return next({ ctx: { ...ctx, session: ctx.session, user: ctx.user } })
})

export const adminOrFounderProcedure = t.procedure.use(isAdminOrFounder)

export { UserRole }
