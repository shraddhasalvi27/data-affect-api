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

  // 🔹 Get user by ID (for /users/me)
  static async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId
      }
    })
  }

  // 🔹 Optional: Safe profile (exclude sensitive fields)
  static async getSafeUserById(userId: string) {
    return prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        username: true,
        avatar: true
      }
    })
  }

}
