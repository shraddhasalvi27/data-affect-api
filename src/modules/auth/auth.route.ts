import { FastifyInstance } from 'fastify'
import { githubCallback } from './auth.controller'

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/auth/github/callback', githubCallback)
}
