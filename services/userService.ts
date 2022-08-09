import { Knex } from "knex";

export class UserService {
  constructor(private knex: Knex) {}

  async register() {
    await this.knex();
  }

  login() {}

  logout() {}
}
