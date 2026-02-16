import { PrismaClient } from '@prisma/client'
import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'

export const prisma = new PrismaClient()

export default fp(async (fastify: FastifyInstance) => {
  await prisma.$connect()

  fastify.decorate('prisma', prisma)
  fastify.log.info('Prisma plugin loaded & DB connected')

  fastify.addHook('onClose', async () => {
    await prisma.$disconnect()
  })
})
