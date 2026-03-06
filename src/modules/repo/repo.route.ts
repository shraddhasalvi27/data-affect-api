import { FastifyInstance } from "fastify";
import { getAllRepos } from "./repo.controller";

export default async function repoRoutes(fastify: FastifyInstance) {
    fastify.get('/repos', {
        preHandler: async (request, reply) => {
            await request.jwtVerify()
        }
    }, getAllRepos)
}