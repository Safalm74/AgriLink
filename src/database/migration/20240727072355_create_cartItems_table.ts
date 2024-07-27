import { Knex } from "knex";

const TABLE_NAME = "cart_items";

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
      .uuid("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");

    table
      .uuid("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.decimal("quantity").notNullable();
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
