import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("pets").del();

  // Inserts seed entries

  // let user_id; //: Array<{ user_id: number }>;
  // let pet_id; //: Array<{ pet_id: number }>;

  await knex
    .insert([
      {
        username: "olevia",
        hashPassword: "olevia",
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

  await knex
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
      },
    ])
    .into("pets")
    .returning("id");

  // PUT into user_pet
  return await knex
    .insert([
      {
        user_id: 1,
        pet_id: 1,
      },
      {
        user_id: 2,
        pet_id: 2,
      },
      {
        user_id: 3,
        pet_id: 3,
      },
    ])
    .into("user_pet");
}
