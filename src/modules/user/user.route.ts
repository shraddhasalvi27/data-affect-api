import { FastifyInstance } from 'fastify'
import { UserService } from './user.service'
export default async function authRoutes(fastify: FastifyInstance) {
    fastify.get('/user-info', {
        preHandler: async (request, reply) => {
            await request.jwtVerify()
        }
    }, async (request, reply) => {

        const { userId } = request.user as { userId: string }

        const user = await UserService.getUserById(userId)
        console.log(user);
        return {
            user: {
                id: user?.id,
                username: user?.username,
                avatar: user?.avatar
            },
        }
    })

    fastify.post('/logout', async (request, reply) => {
        reply.clearCookie('token', {
            path: '/',
        })

        return { success: true }
    })
}
