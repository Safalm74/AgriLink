import { Knex } from "knex";

const TABLE_NAME = "roles_and_permissions";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();

    table
      .uuid("role_id")
      .notNullable()
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE");

    table
      .bigInteger("permission_id")
      .notNullable()
      .references("id")
      .inTable("permissions")
      .onDelete("CASCADE");
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
