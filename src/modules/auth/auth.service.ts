import axios from 'axios'

export async function handleGithubLogin(
  accessToken: string,
  fastify: any
) {
  const { data: githubUser } = await axios.get(
    'https://api.github.com/user',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  const user = await fastify.db.user.upsert({
    where: { githubId: githubUser.id },
    update: {
      avatar: githubUser.avatar_url,
      username: githubUser.login,
      githubAccessToken: accessToken,
    },
    create: {
      githubId: githubUser.id,
      username: githubUser.login,
      avatar: githubUser.avatar_url,
      email: githubUser.email ?? null,
      githubAccessToken: accessToken,
    }
  })

  const jwt = fastify.jwt.sign({
    userId: user.id,
    githubId: user.githubId
  })

  return jwt
}
