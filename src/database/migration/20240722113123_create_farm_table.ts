import { Knex } from "knex";

const TABLE_NAME = "farms";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();

    table.string("farm_name", 100).notNullable();

    table
      .uuid("user_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("farm_address", 100).notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table
      .uuid("created_by")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users");

    table.timestamp("updated_at").nullable();

    table
      .uuid("updated_by")
      .unsigned()
      .references("id")
      .inTable("users")
      .nullable();
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
