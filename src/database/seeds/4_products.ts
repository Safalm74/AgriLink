import { Knex } from "knex";
import fs from "fs";
import minioClient from "../../miniofile";
import config from "../../config";
import { v4 as uuid } from "uuid";

const logoImageSrc = __dirname + "../../../assets/img/logo.png";

const TABLE_NAME = "products";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function seed(knex: Knex): Promise<void> {
  const farm_id = (await knex.raw(`SELECT id FROM farms LIMIT 1`)).rows[0].id;
  const logoImage = await fs.readFileSync(logoImageSrc);
  const imageUUID = uuid();

  minioClient.putObject(config.minio.MINIO_BUCKET_NAME, imageUUID, logoImage);

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
          image_url: imageUUID,
          category: "category 1",
        },
      ]);
    });
}
