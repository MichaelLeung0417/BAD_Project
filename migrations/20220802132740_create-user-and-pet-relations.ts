import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable("user_pet");
  if (!hasTable) {
    await knex.schema.createTable("user_pet", (table) => {
      table.increments();
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("users.id");
      table.integer("pet_id").unsigned();
      table.foreign("pet_id").references("pets.id");
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("user_pet");
}
