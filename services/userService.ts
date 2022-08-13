import { hashPassword } from "../utilities/hash";
import { User } from "../model/models";
import { Knex } from "knex";

export class UserService {
  constructor(private knex: Knex) {}

  async getAllUser(username: string): Promise<User | undefined> {
    return await this.knex.raw<User>(
      `select id, username, hashPassword from users where users.username = ?`,
      [username]
    );
  }

  async insertUser(username: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password);
    return await this.knex.raw(
      `INSERT INTO users (username, "hashPassword", created_at, updated_at) VALUES (?,?,NOW(),NOW()) RETURNING *`,
      [username, hashedPassword]
    );
  }
}
