import Knex from "knex";
import { UserService } from "../services/userService";
const knexfile = require("../knexfile");
const knex = Knex(knexfile["test"]);
let userService = new UserService(knex);

beforeEach(() => {
  userService = new UserService(knex);
});

it("should get data from users", async () => {
  const usersData = await userService.getAllUser("1");
  expect(usersData.length).toBe(0);
});

it("should insert data into db", async () => {
  await userService.insertUser("630", "password");
  let expected = await knex.select("*").from("users").where({
    username: "630",
  });
  expect(expected.length).toBe(1);
});
