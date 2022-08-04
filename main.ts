import express from "express";
// import knexSetup from "./utilities/knex";
import Knex from "knex";
import expressSession from "express-session";
import { client, isLogin } from "./middlewares";
import { userRoutes } from "./userRoutes";
import { createPetRoutes } from "./routes/petRoutes";
import { PetController } from "./controllers/petController";
import { PetService } from "./services/petService";

client.connect();
const main = express();

// for debug use
const knexConfigs = require("../knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);
//

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

main.use(userRoutes);
const petService = new PetService(knex);
const petController = new PetController(petService);
main.use(createPetRoutes(petController));

main.use(isLogin, express.static("private"));

const PORT = 8000;
main.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
