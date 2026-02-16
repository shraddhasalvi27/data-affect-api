import { prisma } from "../../plugins/prisma"

export class RepoService {
  static async saveRepos(repos: any[], userId: string) {
    return Promise.all(
      repos.map((repo) =>
        prisma.repo.upsert({
          where: { githubId: repo.id },
          update: {
            name: repo.name,
            fullName: repo.full_name,
            htmlUrl: repo.html_url,
            defaultBranch: repo.default_branch,
            isPrivate: repo.private,
          },
          create: {
            githubId: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            htmlUrl: repo.html_url,
            defaultBranch: repo.default_branch,
            isPrivate: repo.private,
            ownerId: userId,   // ✅ FIXED
          },
        })
      )
    )
  }
}
