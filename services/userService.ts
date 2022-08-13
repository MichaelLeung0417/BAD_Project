import { Client } from "pg";
import { hashedPassword } from "../utilities/hash";
import { User } from "../model/models";

export class UserService {
  constructor(private client: Client) {}

  async getAllUser(username: string): Promise<User | undefined> {
    return (
      await this.client.query<User>(
        `select id, username from users where users.username = $1`,
        [username]
      )
    ).rows[0];
  }

  async insertUser(username: string, password: string): Promise<User> {
    const hashPassword = await hashedPassword(password);
    return (
      await this.client.query(
        `INSERT INTO users (username, hashPassword, created_at, updated_at) VALUES ($1,$2,NOW(),NOW()) RETURNING *`,
        [username, hashPassword]
      )
    ).rows[0];
  }
}
