import { Knex } from "knex";
// import { Pet } from "../model/models";

const GAME_PARAMS = {
  MIN_CLEAN_TIME: 5000,
  WEIGHT_LOSS_TIME: 10000,
};

export class PetService {
  constructor(private knex: Knex) {}

  async getPetWeight(petId: number) {
    let results = await this.knex
      .select("last_feed_time", "weight")
      .from("pet")
      .where("id", petId);

    if (results.length == 0) {
      throw new Error("No pet found"); // todo: custom error class
    }

    const weight =
      results[0].weight -
      (Date.now() - results[0].last_feed_time) / GAME_PARAMS.WEIGHT_LOSS_TIME;
    if (weight <= 0) {
      throw new Error("Pet died");
    } else {
      return weight;
    }
  }

  async isPetClean(petId: number) {
    let results = await this.knex
      .select("last_clean_time")
      .from("pet")
      .where("id", petId);

    if (results.length == 0) {
      throw new Error("No pet found"); // todo: custom error class
    }

    if (Date.now() - results[0].last_clean_time > GAME_PARAMS.MIN_CLEAN_TIME) {
      return false;
    } else {
      return true;
    }
  }

  async cleanPet(petId: number) {
    await this.knex
      .update({
        last_clean_time: Date.now(),
      })
      .where("id", petId)
      .into("pet");
  }

  // DISPLAY ALL INFO OF ALL PETS OF USER
  async getAllPets(userId: number) {
    // JOIN? Select 1+n

    // let petResults = await this.knex
    //     .select('*')
    //     .from("pets")
    //     .join('user_pet', 'pet.id', 'user_pet.pet_id')
    //     .where('user_pet.user_id', userId)

    let results = await this.knex
      .select("*")
      .from("user_pet")
      .where("user_id", userId);

    if (results.length == 0) {
      const noPets = "noPets";

      return noPets;
    }

    const listOfPetInfo: Array<object> = [];
    for (let pet in results) {
      const petId = results[pet].pet_id;
      const petInfo = await this.knex
        .select("petName", "id")
        .from("pets")
        .where("id", petId);
      listOfPetInfo.push(petInfo[0]);
    }

    return listOfPetInfo;
  }

  // DISPLAY ALL INFO OF A SINGLE PET

  async getPetInfo(petId: number) {
    const info = await this.knex.select("*").from("pets").where("id", petId);

    return info[0];
  }

  // ADD A PET

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
        isGaming: false,
        isHungry: false,
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

  // STATS MODIFICATION

  async changeStats(
    changeRequest:
      | "foodScore"
      | "talkScore"
      | "brightnessScore"
      | "cleanScore"
      | "playScore",
    changeMagnitude: number,
    petId: number
  ) {
    switch (changeRequest) {
      case "foodScore":
        await this.knex.raw(
          'UPDATE pets SET "foodScore"= "foodScore"+? WHERE id=?',
          [changeMagnitude, petId]
        );
        break;
      case "talkScore":
        await this.knex.raw(
          'update pets set "talkScore"= "talkScore"+? WHERE id=?',
          [changeMagnitude, petId]
        );
        break;
      case "brightnessScore":
        await this.knex.raw(
          'update pets set "brightnessScore"= "brightnessScore"+? WHERE id=?',
          [changeMagnitude, petId]
        );
        break;
      case "cleanScore":
        await this.knex.raw(
          'update pets set "cleanScore"= "cleanScore"+? WHERE id=?',
          [changeMagnitude, petId]
        );
        break;
      case "playScore":
        await this.knex.raw(
          'update pets set "playScore"= "playScore"+? WHERE id=?',
          [changeMagnitude, petId]
        );
        break;
    }
  }
}
