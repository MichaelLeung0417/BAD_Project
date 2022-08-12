import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("pets")) {
    await knex.raw(
      "ALTER TABLE users ADD CONSTRAINT username_unique UNIQUE(username);"
    );
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("pets")) {
    await knex.raw(
      "ALTER TABLE users DROP CONSTRAINT username_unique UNIQUE(username);"
    );
  }
}
