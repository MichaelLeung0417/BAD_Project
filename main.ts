import express from "express";
import knexSetup from "./utilities/knex";
import expressSession from "express-session";
import { client, isLogin } from "./utilities/middlewares";
import { createUserRoutes } from "./routes/userRoutes";
import { createPetRoutes } from "./routes/petRoutes";
import { PetController } from "./controllers/petController";
import { PetService } from "./services/petService";
import { UserController } from "./controllers/userController";
import { UserService } from "./services/userService";

client.connect();
const main = express();

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

// function for user
const userService = new UserService(knexSetup());
const userController = new UserController(userService);
main.use(createUserRoutes(userController));

// function for pet
const petService = new PetService(knexSetup());
const petController = new PetController(petService);
main.use(createPetRoutes(petController));

main.use(isLogin, express.static("private"));

const PORT = 8000;
main.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
