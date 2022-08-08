import { Knex } from "knex";

export class PetService {
  constructor(private knex: Knex) {}

  async getAllPet() {
    await this.getAllPet();
  }

  async addPet() {
    await this.knex();
  }
}
