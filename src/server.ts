import Fastify from 'fastify'
import "dotenv/config"
import fastifyAutoload from '@fastify/autoload'
import path from "path"
const fastify = Fastify({
  logger: true
})
const baseDir = path.join(process.cwd(), "src");
fastify.get('/', async (request, reply) => {
  return { message: 'Fastify + TypeScript 🚀' }
})
// fastify.register(require('@fastify/cookie'))
fastify.register(fastifyAutoload, { dir: path.join(baseDir, "plugins"), encapsulate: false });
fastify.register(fastifyAutoload, {
  dir: path.join(baseDir, "modules"),
  encapsulate: false
})
fastify.register(require('@fastify/cors'), {
  origin: "http://127.0.0.1:3000",
  credentials: true
})

const start = async () => {
  try {
    const PORT = Number(process.env.PORT)
    await fastify.listen({ port: PORT, host: "127.0.0.1" })
    console.log(`server listening on ${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
