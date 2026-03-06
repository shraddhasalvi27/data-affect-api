import { FastifyReply, FastifyRequest } from "fastify";
import { RepoService } from "./repo.service";

export async function getAllRepos(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.user as { userId: string }
    const repos = await RepoService.getReposByUserId(userId)
    return { repos }
}
