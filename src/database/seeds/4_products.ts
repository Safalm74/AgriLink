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
          quantity_unit: "KG",
          description: "description 1",
          image_url: "00895b62-80d3-4722-b980-8aacd7a146b0",
          category: "category 1",
        },
      ]);
    });
}
