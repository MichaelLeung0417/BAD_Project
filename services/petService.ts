import { Knex } from "knex";

export class PetService {
  constructor(private knex: Knex) {}

  async getAllPet() {
    const allPets = await this.knex.select("*").from("user_pet").where("id", 1);

    return allPets;
  }

  async addPet(petName: string, userId: number) {
    let petId: number = await this.knex
      .insert({
        foodScore: 0,
        talkScore: 0,
        brightnessScore: 0,
        cleanScore: 0,
        playScore: 0,
        juvenileSprite: null,
        adultSprite: null,
        timeElapsed: 0, //10 mins
        totalScore: null,
        isJuvenile: false,
        isAdult: false,
        petName: petName,
      })
      .into("pets")
      .returning("id");

    await this.knex
      .insert({
        user_id: userId,
        pet_id: petId[0].id,
      })
      .into("user_pet");

    return petId[0]["id"];
  }
}
