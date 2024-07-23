import { Knex } from "knex";

const TABLE_NAME = "products";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  const farm_id = (await knex.raw(`SELECT id FROM farms LIMIT 1`)).rows[0].id;
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          farm_id: farm_id,
          product_name: "product name 1",
          price: 1,
          quantity: 1,
          description: "description 1",
          image_url: "image url 1",
          category: "category 1",
        },
      ]);
    });
}
