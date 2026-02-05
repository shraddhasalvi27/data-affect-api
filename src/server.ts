import Fastify from 'fastify'
import "dotenv/config"
import githubOAuthPlugin from './plugins/github-oauth'
import jwtPlugin from './plugins/jwt'
import {authRoutes} from './modules/auth/auth.route'
const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request,reply) => {
  return { message: 'Fastify + TypeScript 🚀' }
})

 fastify.register(githubOAuthPlugin)
fastify.register(jwtPlugin)
fastify.register(authRoutes)
const start = async () => {
  try {
    const PORT = Number(process.env.PORT) || 4000
    await fastify.listen({port:PORT})
    console.log(`server listening on ${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
