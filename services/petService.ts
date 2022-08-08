import { Knex } from "knex";

export class PetService {
  constructor(private knex: Knex) {}

  async addPet() {
    await this.knex();
  }
}
