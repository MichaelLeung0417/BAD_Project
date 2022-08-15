import { hashPassword } from "../utilities/hash";
import { Knex } from "knex";

export class UserService {
  constructor(private knex: Knex) {}

  async getAllUser(username: string) {
    let result = await this.knex.raw(
      `select id, username, "hashPassword" from users where users.username = ?`,
      [username]
    );

    return result.rows;
  }

  async insertUser(username: string, password: string) {
    const hashedPassword = await hashPassword(password);
    return await this.knex
      .insert({
        username: username,
        hashPassword: hashedPassword,
      })
      .into("users")
      .returning("*");
  }
}
