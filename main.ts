import express from "express";
// import knexSetup from "./utilities/knex";
import Knex from "knex";
import expressSession from "express-session";
import { client, isLogin } from "./middlewares";
import { createUserRoutes } from "./routes/userRoutes";
import { createPetRoutes } from "./routes/petRoutes";
import { UserService } from "./services/userService";
import { PetController } from "./controllers/petController";
import { PetService } from "./services/petService";
import { UserController } from "./controllers/userController";

client.connect();
const main = express();

// for debug use
const knexConfigs = require("../knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

main.use(
  expressSession({
    secret: "very long secret",
    resave: true,
    saveUninitialized: true,
  })
);

main.use(express.urlencoded());
main.use(express.json());

main.use(express.static("public"));

const userService = new UserService(knex);
const userController = new UserController(userService);
main.use(createUserRoutes(userController));

const petService = new PetService(knex);
const petController = new PetController(petService);
main.use(createPetRoutes(petController));

main.use(isLogin, express.static("private"));

const PORT = 8000;
main.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
