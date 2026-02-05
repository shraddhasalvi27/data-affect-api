import { FastifyRequest, FastifyReply } from 'fastify'
import { handleGithubLogin } from './auth.service'

export async function githubCallback(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const token =
    await request.server.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(
      request
    )

  const jwt = await handleGithubLogin(
    token.token.access_token,
    request.server
  )

  return reply.send({ token: jwt })
}
