import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("pets")) {
    await knex.schema.alterTable("pets", (table) => {
      table.boolean("isGaming");
      table.boolean("isHungry");
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasTable("pets")) {
    await knex.schema.alterTable("pets", (table) => {
      table.dropColumn("isGaming");
      table.dropColumn("isHungry");
    });
  }
}
