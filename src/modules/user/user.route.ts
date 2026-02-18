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

        return {
            user: {
                id: user?.id,
                username: user?.username,
                avatar: user?.avatar
            },
        }
    })

}
