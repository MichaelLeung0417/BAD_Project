import { Client } from "pg";
import { hashPassword } from "../utilities/hash";
import { User } from "../model/models";

export class UserService {
  constructor(private client: Client) {}

  async getAllUser(username: string): Promise<User | undefined> {
    return (
      await this.client.query<User>(
        `select id, username, password from users where users.username = $1`,
        [username]
      )
    ).rows[0];
  }

  async insertUser(username: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password);
    return (
      await this.client.query(
        `INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *`,
        [username, hashedPassword]
      )
    ).rows[0];
  }
}
