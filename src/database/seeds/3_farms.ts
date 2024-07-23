import { Knex } from "knex";

const TABLE_NAME = "farms";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  const farmer_role_id = await knex.raw(
    `SELECT id FROM roles WHERE role='farmer'`
  );
  const farmers = await knex.raw(
    `SELECT id FROM users WHERE role_id='${farmer_role_id.rows[0].id}'`
  );
  console.log(farmer_role_id, farmers);
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          user_id: farmers.rows[0].id,
          farm_name: `farm name ${farmers.rows[0].id}`,
          farm_address: `farm address ${farmers.rows[0].id}`,
        },
      ]);
    });
}
