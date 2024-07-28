import { Knex } from "knex";

const TABLE_NAME = "orders";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid("id").defaultTo(knex.raw("gen_random_uuid()")).primary();

    table.uuid("customer_id").notNullable().references("id").inTable("users");

    table
      .uuid("farm_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("farms")
      .onDelete("CASCADE");

    table.timestamp("order_date").notNullable().defaultTo(knex.raw("now()"));

    table.string("order_status", 50).notNullable().defaultTo("pending");

    table.decimal("total_price").nullable();
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
