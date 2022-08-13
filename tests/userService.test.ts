import Knex from "knex";
import { UserService } from "../services/userService";
const knexfile = require("../knexfile");
const knex = Knex(knexfile["test"]);

describe("userService", () => {
  let userService: UserService = new UserService(knex);

  it("should get data from users", async () => {
    const usersData = await userService.getAllUser("1");

    console.log(usersData);
  });

  it("should insert data into db", async () => {
    const result = await userService.insertUser("testing", "123");

    console.log(result);
  });
});
