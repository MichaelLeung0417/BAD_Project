import { hashPassword } from "../utilities/hash";
import { Knex } from "knex";

export class UserService {
  constructor(private knex: Knex) {}

  // GET USER INFO BY USERNAME

  async getAllUser(username: string) {
    let result = await this.knex.raw(
      `select id, username, "hashPassword" from users where users.username = ?`,
      [username]
    );

    return result.rows;
  }

  // REGISTER USER
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

  // GET USERINFO BY ID

  async getUserNameById(userId: number) {
    const userName = await this.knex
      .select("username")
      .from("users")
      .where("id", userId);
    return userName?.[0]?.["username"]; // add null safe
  }
}
