import { FastifyReply, FastifyRequest } from 'fastify'
import { GithubService } from '../github/github.service'
import { UserService } from '../user/user.service'
import { RepoService } from '../repo/repo.service'
export async function githubCallback(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // 1️⃣ Get token from GitHub
  const tokenResponse =
    await request.server.githubOAuth2
      .getAccessTokenFromAuthorizationCodeFlow(request)

  const accessToken = tokenResponse.token.access_token
  // 2️⃣ Fetch GitHub user info
  const githubUser = await GithubService.getUser(accessToken)

  // 3️⃣ Save user in DB
  const user = await UserService.upsertGithubUser(githubUser, accessToken)

  // 4️⃣ Fetch public repos
  const githubRepos = await GithubService.getPublicRepos(accessToken)
  // Save repo List in DB
  const repos = await RepoService.saveRepos(githubRepos, user.id)
  const appToken = await reply.jwtSign({
    userId: user.id
  })
  // 5️⃣ Send safe response
  // return reply.send({
  //   user: {
  //     id: user.id,
  //     username: user.username,
  //     avatar: githubUser.avatar_url,
  //   },
  //   repos: repos.map((repo) => ({
  //     id: repo.id,
  //     name: repo.name,
  //     url: repo.htmlUrl,
  //     defaultBranch: repo.defaultBranch,
  //     isPrivate: repo.isPrivate,
  //   }))

  // })
  reply
    .setCookie('token', appToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true in production
      path: '/'
    })
    .redirect('http://127.0.0.1:3000/')
}

