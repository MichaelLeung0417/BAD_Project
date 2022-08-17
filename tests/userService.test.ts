import Knex from "knex";
import { UserService } from "../services/userService";
const knexfile = require("../knexfile");
const knex = Knex(knexfile["test"]);
let userService = new UserService(knex);

beforeEach(() => {
  userService = new UserService(knex);
});

it("should get data from users", async () => {
  const usersData = await userService.getAllUser("fung");
  console.log("usersData is: ", usersData);
});

it("should insert data into db", async () => {
  await userService.insertUser("630", "password");
  let expected = await knex.select("*").from("users").where({
    username: "630",
  });
  console.log(expected);
});

it("should get username by Id", async () => {
  const userName = await userService.getUserNameById(1);
  console.log(userName);
});
