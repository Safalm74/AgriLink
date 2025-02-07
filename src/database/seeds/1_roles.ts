import { Knex } from "knex";

const TABLE_NAME = "roles";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`TRUNCATE TABLE ${TABLE_NAME} RESTART IDENTITY CASCADE`);

  return knex(TABLE_NAME).then(() => {
    return knex(TABLE_NAME).insert([
      {
        role: "admin",
      },
      {
        role: "customer",
      },
      {
        role: "farmer",
      },
    ]);
  });
}
