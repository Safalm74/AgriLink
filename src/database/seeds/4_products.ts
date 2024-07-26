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
          image_url: "ac216329-aed0-4d34-8da2-60556d7ece40",
          category: "category 1",
        },
      ]);
    });
}
