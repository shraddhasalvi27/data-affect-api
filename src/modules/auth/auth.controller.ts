import { FastifyReply, FastifyRequest } from 'fastify'

export async function githubCallback(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const token =
    await request.server.githubOAuth2
      .getAccessTokenFromAuthorizationCodeFlow(request)

  return reply.send(token)
}
