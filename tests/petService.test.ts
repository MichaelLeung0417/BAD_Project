import Knex from "knex";
const knexfile = require("../knexfile");
const knex = Knex(knexfile["test"]);
import { PetService } from "../services/petService";

describe("petService", () => {
  let petService: PetService = new PetService(knex);

  it("should retrieve pet data from db", async () => {});

  // PASSED
  it("should add new pet to database", async () => {
    const petId = await petService.addPet("gogo", 1);
    console.log(petId);

    const results = await knex.select("*").from("pets").where("id", petId);
    const results2 = await knex.select("*").from("user_pet").where({
      pet_id: petId,
      user_id: 1,
    });
    expect(results.length).toBe(1);
    expect(results2.length).toBe(1);
  });

  // PASSED
  it("should retrieve a list of pets", async () => {
    const results = await petService.getAllPets(1);
    expect(results.length).toBeGreaterThan(0);
  });

  // PASSED
  it("should change stats", async () => {
    await petService.changeStats("foodScore", 1, 30);
    const foodScore = await knex
      .select("foodScore")
      .from("pets")
      .where("id", 30);

    console.log(foodScore);
  });
});
