import { Knex } from "knex";

const TABLE_NAME = "permissions";

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
        permissions: "user:post",
      },
      {
        permissions: "user:get",
      },
      {
        permissions: "user:put",
      },
      {
        permissions: "user:delete",
      },
      {
        permissions: "product:post",
      },
      {
        permissions: "product:get",
      },
      {
        permissions: "product:put",
      },
      {
        permissions: "product:delete",
      },
      {
        permissions: "farm:post",
      },
      {
        permissions: "farm:get",
      },
      {
        permissions: "farm:put",
      },
      {
        permissions: "farm:delete",
      },
      {
        permissions: "cart:post",
      },
      {
        permissions: "cart:get",
      },
      {
        permissions: "cart:put",
      },
      {
        permissions: "cart:delete",
      },
      {
        permissions: "orderItems:post",
      },
      {
        permissions: "orderItems:get",
      },
      {
        permissions: "orderItems:put",
      },
      {
        permissions: "orderItems:delete",
      },
      {
        permissions: "order:post",
      },
      {
        permissions: "order:get",
      },
      {
        permissions: "order:put",
      },
      {
        permissions: "order:delete",
      },
    ]);
  });
}
