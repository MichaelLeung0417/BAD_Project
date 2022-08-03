import { Knex } from "knex";
import Chance from "chance";
var chance = new Chance();

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries

  await knex("users").del();

  for (let i = 0; i < 10; i++) {
    const placeholder = chance.first();
    const [{ id }]: Array<{ id: number }> = await knex
      .insert({
        username: placeholder,
        hashPassword: placeholder,
      })
      .into("users")
      .returning("id");
  }
}
