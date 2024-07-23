import { Knex } from 'knex';

const TABLE_NAME = 'roles';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> { 
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid('id').defaultTo(knex.raw('gen_random_uuid()')).primary();
    table.string('role').notNullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}