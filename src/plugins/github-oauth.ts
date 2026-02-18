import fp from 'fastify-plugin'
import oauthPlugin from '@fastify/oauth2'

export default fp(async (fastify) => {
  fastify.register(oauthPlugin, {
    name: 'githubOAuth2',
    credentials: {
      client: {
        id: process.env.GITHUB_CLIENT_ID!,
        secret: process.env.GITHUB_CLIENT_SECRET!
      },
      auth: oauthPlugin.GITHUB_CONFIGURATION
    },
    startRedirectPath:'/auth/github',
    callbackUri: 'http://127.0.0.1:5000/auth/github/callback'
  })
})
