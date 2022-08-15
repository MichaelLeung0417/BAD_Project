import { hashPassword } from "../utilities/hash";
import { User } from "../model/models";
import { Knex } from "knex";

export class UserService {
  constructor(private knex: Knex) {}

  async getAllUser(username: string): Promise<User | undefined> {
    return await this.knex.raw<User>(
      `select id, username from users where users.username = ?`,
      [username]
    );
  }

  async insertUser(username: string, password: string) {
    const hashedPassword = await hashPassword(password);
    await this.knex
      .insert({
        username: username,
        hashPassword: hashedPassword,
      })
      .into("users")
      .returning("*");
  }
}
