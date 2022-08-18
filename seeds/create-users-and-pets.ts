import { Knex } from "knex";
import { hashPassword } from "../utilities/hash";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("user_pet").del();
  await knex("users").del();
  await knex("pets").del();

  // Inserts seed entries

  let user_id: Array<{ id: number }>;

  user_id = await knex
    .insert([
      {
        username: "olevia",
        hashPassword: await hashPassword("olevia"),
      },
      {
        username: "michael",
        hashPassword: "michael",
      },
      {
        username: "fung",
        hashPassword: "fung",
      },
    ])
    .into("users")
    .returning("id");

  let pet_ids = await knex
    .insert([
      {
        // BABY PET
        foodScore: 3,
        talkScore: 4,
        brightnessScore: 6,
        cleanScore: 10,
        playScore: 8,
        juvenileSprite: null,
        adultSprite: null,
        timeElapsed: 600, //10 mins
        totalScore: null,
        isJuvenile: false,
        isAdult: false,
        petName: "bobo",
        isHungry: false,
        isGaming: false,
      },
      {
        // juvenile

        foodScore: 10,
        talkScore: 5,
        brightnessScore: 2,
        cleanScore: 6,
        playScore: 7,
        juvenileSprite: null,
        adultSprite: null,
        timeElapsed: 1800, //30 mins
        totalScore: null,
        isJuvenile: false,
        isAdult: false,
        petName: "daudau",
        isHungry: false,
        isGaming: false,
      },
      {
        // adult
        foodScore: 10,
        talkScore: 9,
        brightnessScore: 7,
        cleanScore: 5,
        playScore: 4,
        juvenileSprite: null,
        adultSprite: null,
        timeElapsed: 3600, //10 mins
        totalScore: null,
        isJuvenile: false,
        isAdult: false,
        petName: "tommy",
        isHungry: false,
        isGaming: false,
      },
    ])
    .into("pets")
    .returning("id");

  // PUT into user_pet
  // return await knex
  //   .insert([
  //     {
  //       user_id: 7,
  //       pet_id: 7,
  //     },
  //     {
  //       user_id: 8,
  //       pet_id: 8,
  //     },
  //     {
  //       user_id: 9,
  //       pet_id: 9,
  //     },
  //   ])
  //   .into("user_pet");

  // for (let obj of user_id) {
  for (let i = 0; i < user_id.length; i++) {
    // for (let id in obj) {
    await knex.raw("INSERT INTO user_pet (user_id, pet_id) VALUES (?,?)", [
      user_id[i].id,
      pet_ids[i].id,
    ]);
    // }
  }
}
