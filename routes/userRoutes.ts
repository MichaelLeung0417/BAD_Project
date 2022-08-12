import express from "express";
import { UserController } from "../controllers/userController";

export function createUserRoutes(userController: UserController) {
  const userRoutes = express.Router();
  userRoutes.post("/login", userController.login);
  userRoutes.post("/register", userController.register);
  userRoutes.post("/logout", userController.logout);

  return userRoutes;
}
