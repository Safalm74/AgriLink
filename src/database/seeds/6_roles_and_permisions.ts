import { Knex } from "knex";
import { permission } from "process";

const TABLE_NAME = "roles_and_permissions";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`TRUNCATE TABLE ${TABLE_NAME} RESTART IDENTITY CASCADE`);
  const admin_role = (await knex.raw(`SELECT id FROM roles WHERE role='admin'`))
    .rows[0].id;
  const farmer_role = (
    await knex.raw(`SELECT id FROM roles WHERE role='farmer'`)
  ).rows[0].id;
  const customer_role = (
    await knex.raw(`SELECT id FROM roles WHERE role='customer'`)
  ).rows[0].id;

  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          role_id: admin_role, //user permissions
          permission_id: 1,
        },
        {
          role_id: admin_role,
          permission_id: 2,
        },
        {
          role_id: admin_role,
          permission_id: 3,
        },
        {
          role_id: admin_role,
          permission_id: 4,
        },
        {
          role_id: farmer_role,
          permission_id: 1,
        },
        {
          role_id: farmer_role,
          permission_id: 2,
        },
        {
          role_id: farmer_role,
          permission_id: 3,
        },
        {
          role_id: customer_role,
          permission_id: 1,
        },
        {
          role_id: customer_role,
          permission_id: 2,
        },
        {
          role_id: customer_role,
          permission_id: 3,
        },

        {
          role_id: admin_role, //product permissions
          permission_id: 6,
        },
        {
          role_id: admin_role,
          permission_id: 8,
        },
        {
          role_id: farmer_role,
          permission_id: 5,
        },
        {
          role_id: farmer_role,
          permission_id: 6,
        },
        {
          role_id: farmer_role,
          permission_id: 7,
        },
        {
          role_id: farmer_role,
          permission_id: 8,
        },
        {
          role_id: customer_role,
          permission_id: 6,
        },
        {
          role_id: admin_role, //farm permissions
          permission_id: 10,
        },
        {
          role_id: admin_role,
          permission_id: 12,
        },
        {
          role_id: farmer_role,
          permission_id: 9,
        },
        {
          role_id: farmer_role,
          permission_id: 10,
        },
        {
          role_id: farmer_role,
          permission_id: 11,
        },
        {
          role_id: farmer_role,
          permission_id: 12,
        },
        {
          role_id: customer_role,
          permission_id: 10,
        },
        {
          role_id: admin_role, //cart permissions
          permission_id: 13,
        },
        {
          role_id: admin_role,
          permission_id: 14,
        },
        {
          role_id: admin_role,
          permission_id: 15,
        },
        {
          role_id: admin_role,
          permission_id: 16,
        },
        {
          role_id: farmer_role,
          permission_id: 13,
        },
        {
          role_id: farmer_role,
          permission_id: 14,
        },
        {
          role_id: farmer_role,
          permission_id: 15,
        },
        {
          role_id: farmer_role,
          permission_id: 16,
        },
        {
          role_id: customer_role,
          permission_id: 13,
        },
        {
          role_id: customer_role,
          permission_id: 14,
        },
        {
          role_id: customer_role,
          permission_id: 15,
        },
        {
          role_id: customer_role,
          permission_id: 16,
        },
        {
          role_id: admin_role, //order-items permissions
          permission_id: 18,
        },
        {
          role_id: farmer_role,
          permission_id: 18,
        },
        {
          role_id: customer_role,
          permission_id: 18,
        },
        {
          role_id: admin_role, //order permissions
          permission_id: 21,
        },
        {
          role_id: admin_role,
          permission_id: 22,
        },
        {
          role_id: admin_role,
          permission_id: 23,
        },
        {
          role_id: farmer_role,
          permission_id: 21,
        },
        {
          role_id: farmer_role,
          permission_id: 22,
        },
        {
          role_id: farmer_role,
          permission_id: 23,
        },
        {
          role_id: customer_role,
          permission_id: 21,
        },
        {
          role_id: customer_role,
          permission_id: 22,
        },
        {
          role_id: customer_role,
          permission_id: 23,
        },
      ]);
    });
}
