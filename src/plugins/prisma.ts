// src/plugins/prisma.ts
import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

// Use fastify-plugin to make the Prisma client globally available
export default fp(async (fastify: FastifyInstance, opts: any) => {
  const prisma = new PrismaClient();

  // Connect to the database when the server starts
  await prisma.$connect();

  // Decorate the Fastify instance with the prisma client
  fastify.decorate('prisma', prisma);

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
  // Optional: augment the Fastify request type if you want to access prisma via req.prisma
  // interface FastifyRequest {
  //   prisma: PrismaClient;
  // }
}
