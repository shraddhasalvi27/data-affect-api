import { FastifyInstance } from "fastify";
import { getAllCommits, getAllCommitFiles, getFileContent } from "./commits.controller";
export default async function commitRoutes(fastify: FastifyInstance) {
    fastify.get('/repo/commit', {
        preHandler: async (request, reply) => {
            await request.jwtVerify()
        }
    }, getAllCommits)
    fastify.get('/repo/commit/files', {
        preHandler: async (request, reply) => {
            await request.jwtVerify()
        }
    }, getAllCommitFiles)
    fastify.get('/repo/commit/content', {
        preHandler: async (request, reply) => {
            await request.jwtVerify()
        }
    }, getFileContent)

}