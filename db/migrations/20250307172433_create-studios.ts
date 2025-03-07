import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('studios', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
  })

  await knex.schema.createTable('games', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.uuid('studio_id').references('id').inTable('studios') // chave estrangeira
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('games')
  await knex.schema.dropTable('studios')
}
