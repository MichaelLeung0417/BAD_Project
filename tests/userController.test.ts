import Knex from "knex";
// import { UserController } from "../controllers/userController";
import { UserService } from "../services/userService";
const knexfile = require("../knexfile");
const knex = Knex(knexfile["test"]);

describe("check register", () => {
  let userService: UserService = new UserService(knex);
  //   let userController: UserController = new UserController(userService);

  it("should register a new user", () => {
    let username = "123";
    let password = "123";

    let userQuery = userService.getAllUser(username);

    if (userQuery !== undefined) {
      return;
    } else {
      userService.insertUser(username, password);
    }
  });
});
