import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable("pets");
  if (!hasTable) {
    await knex.schema.createTable("pets", (table) => {
      table.increments();
      table.integer("foodScore");
      table.integer("talkScore");
      table.integer("brightnessScore");
      table.integer("cleanScore");
      table.integer("playScore");
      table.integer("juvenileSprite");
      table.integer("adultSprite");
      table.integer("timeElapsed"); //shoould be counted in minutes
      table.integer("totalScore");
      table.boolean("isJuvenile");
      table.boolean("isAdult");
      table.timestamps(false, true); //should be true, true
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("pets");
}
