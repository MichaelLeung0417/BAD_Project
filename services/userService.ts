import { Knex } from "knex";
import { hashPassword } from "../utilities/hash";
import { User } from "../model/models";

export class UserService {
  constructor(private knex: Knex) {}

  async getAllUser(username: string): Promise<User | undefined> {
    return await this.knex.raw<User>(
      `select id, username, hashedPassword from users where users.username = ?`,
      [username]
    );
  }

  async insertUser(username: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password);
    return await this.knex.raw(
      `INSERT INTO users (username, hashedPassword) VALUES (?,?) RETURNING *`,
      [username, hashedPassword]
    );
  }
}
