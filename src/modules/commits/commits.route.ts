import { FastifyInstance } from "fastify";
import { getAllCommits, getSingleCommitFiles, getSingleFileContent } from "./commits.controller";
export default async function commitRoutes(fastify: FastifyInstance) {
    fastify.get('/repo/:owner/:repo/commit', {
        preHandler: async (request, reply) => {
            await request.jwtVerify()
        }
    }, getAllCommits)
    fastify.get('/repo/:owner/:repo/:sha/commit/files', {
        preHandler: async (request, reply) => {
            await request.jwtVerify()
        }
    }, getSingleCommitFiles)
    fastify.get('/repo/:owner/:repo/commit/content/{path}?ref={ref}', {
        preHandler: async (request, reply) => {
            await request.jwtVerify()
        }
    }, getSingleFileContent)

}