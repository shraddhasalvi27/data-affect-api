import { FastifyReply, FastifyRequest } from "fastify";
import { GithubService } from "../github/github.service";
import { UserService } from "../user/user.service";

export async function getAllCommits(
    request: FastifyRequest<{
        Params: { owner: string; repo: string };
        Querystring: { page?: string; perPage?: string };
    }>,
    reply: FastifyReply
) {
    const { userId } = request.user as { userId: string };
    const user = await UserService.getUserById(userId);
    if (!user) return reply.status(401).send({ error: "Unauthorized" });

    const { owner, repo } = request.params;
    const { page, perPage } = request.query;

    const commits = await GithubService.getCommits(
        user.githubAccessToken,
        owner,
        repo,
        page,
        perPage
    );

    return reply.send({ commits });
}

export async function getAllCommitFiles(
    request: FastifyRequest<{
        Params: { owner: string; repo: string; sha: string };
    }>,
    reply: FastifyReply
) {
    const { userId } = request.user as { userId: string };
    const user = await UserService.getUserById(userId);
    if (!user) return reply.status(401).send({ error: "Unauthorized" });

    const { owner, repo, sha } = request.params;

    const files = await GithubService.getCommitFiles(
        user.githubAccessToken,
        owner,
        repo,
        sha
    );

    return reply.send({ files });
}

export async function getFileContent(
    request: FastifyRequest<{
        Params: { owner: string; repo: string };
        Querystring: { path: string; ref: string };
    }>,
    reply: FastifyReply
) {
    const { userId } = request.user as { userId: string };
    const user = await UserService.getUserById(userId);
    if (!user) return reply.status(401).send({ error: "Unauthorized" });

    const { owner, repo } = request.params;
    const { path, ref } = request.query;

    const content = await GithubService.getFileContent(
        user.githubAccessToken,
        path,
        ref,
        owner,
        repo
    );

    return reply.send({ content });
}