import { Knex } from "knex";
import bcrypt from "bcrypt";
const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`TRUNCATE TABLE ${TABLE_NAME} RESTART IDENTITY CASCADE`);
  const admin_role = await knex.raw(`SELECT id FROM roles WHERE role='admin'`);
  const farmer_role = await knex.raw(
    `SELECT id FROM roles WHERE role='farmer'`
  );
  const customer_role = await knex.raw(
    `SELECT id FROM roles WHERE role='customer'`
  );

  return knex(TABLE_NAME).then(() => {
    return knex(TABLE_NAME).insert([
      {
        first_name: "admin",
        last_name: "admin",
        email: "admin@admin.com",
        password: bcrypt.hashSync("admin", 10),
        phone: "0123456789",
        address: "admin",
        role_id: admin_role.rows[0].id,
      },
      {
        first_name: "farmer",
        last_name: "farmer",
        email: "farmer@farmer.com",
        password: bcrypt.hashSync("farmer", 10),
        phone: "0123456789",
        address: "farmer",
        role_id: farmer_role.rows[0].id,
      },
      {
        first_name: "customer",
        last_name: "customer",
        email: "customer@customer.com",
        password: bcrypt.hashSync("customer", 10),
        phone: "0123456789",
        address: "customer",
        role_id: customer_role.rows[0].id,
      },
    ]);
  });
}
