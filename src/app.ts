import fastify from 'fastify'
import { studioRoutes } from './routes/studiosRoutes'

export const app = fastify()

app.register(studioRoutes, {
  prefix: 'studios',
})
