import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
export default fp(async (fastify: FastifyInstance, opts: any) => {
  const prisma = new PrismaClient();

  // Connect to the database when the server starts
  await prisma.$connect();

  // Decorate the Fastify instance with the prisma client
  fastify.decorate('prisma', prisma);
   fastify.log.info("Prisma plugin loaded & DB connected");
  
   // Close the database connection when the server stops
  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect();
  });
});

// Augment the Fastify request and instance types with the prisma property
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
