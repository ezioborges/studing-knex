import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

export async function studioRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const studios = await knex('studios').select()

    return { studios }
  })

  app.post('/', async (req, res) => {
    const createStudioBodySchema = z.object({
      name: z.string(),
    })

    const { name } = createStudioBodySchema.parse(req.body)

    await knex('studios').insert({
      id: randomUUID(),
      name,
    })

    return res.status(201).send
  })
}
