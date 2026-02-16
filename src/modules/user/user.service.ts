import  {prisma}  from "../../plugins/prisma"

export class UserService {
  static async upsertGithubUser(githubUser: any , accessToken:string) {
    return prisma.user.upsert({
      where: {
        githubId: githubUser.id,
      },
      update: {
        username: githubUser.login,
        avatar: githubUser.avatar_url,
        // profileUrl: githubUser.html_url,
        githubAccessToken: accessToken,
      },
      create: {
        githubId: githubUser.id,
        username: githubUser.login,
        avatar: githubUser.avatar_url,
        githubAccessToken: accessToken,
        // profileUrl: githubUser.html_url,
      },
    })
  }
}
