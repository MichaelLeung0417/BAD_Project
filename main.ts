import express from "express";
import expressSession from "express-session";
import { client, isLogin } from "./utilities/middlewares";
import { createUserRoutes } from "./routes/userRoutes";
import { createPetRoutes } from "./routes/petRoutes";
import { PetController } from "./controllers/petController";
import { PetService } from "./services/petService";
import { UserController } from "./controllers/userController";
import { UserService } from "./services/userService";
import Knex from "knex";
import dotenv from "dotenv";
import { Server as SocketIO } from "socket.io";
import http from "http";

dotenv.config();

client.connect();
const main = express();

const server = new http.Server(main);

const io = new SocketIO(server);

io.on("connection", async function (socket) {
  console.log(`${socket.id}: Sever connect to client`);
  const req = socket.request as express.Request;

  if (!req.session["isUser"] || req.session["playing-user"] == null) {
    socket.disconnect();
    return;
  }
});

const knexConfigs = require("./knexfile");
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

// function for user
const userService = new UserService(knex);
const userController = new UserController(userService);
main.use(createUserRoutes(userController));

// function for pet
const petService = new PetService(knex);
const petController = new PetController(petService);
main.use(createPetRoutes(petController));

main.use(isLogin, express.static("private"));

const PORT = 8000;
main.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
