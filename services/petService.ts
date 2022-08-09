import { Knex } from "knex";

export class PetService {
  constructor(private knex: Knex) {}

  async getAllPets(userId: number) {
    let results = await this.knex
      .select("*")
      .from("user_pet")
      .where("user_id", userId);

    const listOfPetInfo: Array<object> = [];

    for (let pet in results) {
      const petId = results[pet].pet_id;
      const petInfo = await this.knex
        .select("*")
        .from("pets")
        .where("id", petId);
      listOfPetInfo.push(petInfo[0]);
    }

    return listOfPetInfo;
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
