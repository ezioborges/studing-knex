import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

export async function studioRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const studios = await knex('studios').select()

    return { studios }
  })

  app.get('/:id', async (req) => {
    const createStudioParamsSchema = z.object({
      id: z.string()
    })
    const { id } = createStudioParamsSchema.parse(req.params)
    
    const user = await knex('studios').where('id', id).select()

    return user 
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

    return res.status(201).send()
  })

  app.get('/games', async () => {
    const games = await knex('games').select()

    return { games }
  })

  app.post('/:id/games', async (req, res) => {
    const createStudioParamsSchema = z.object({
      id: z.string()
    })

    const createGameBodySchema = z.object({
      title: z.string()
    })

    const { id } = createStudioParamsSchema.parse(req.params)
    const { title } = createGameBodySchema.parse(req.body)
    
    await knex('games').insert({
      id: randomUUID(),
      title,
      studio_id: id,
    })
    
    return res.status(201).send()
  })
}
