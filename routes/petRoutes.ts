import express from "express";
import { PetController } from "../controllers/petController";

export const petRouter = express.Router();

petRouter.use("/addPet", petController.addPet);
petRouter.use("/displayPet", petController.displayPet);
petRouter.use("/getPetInfo", petController.getPetInfo);
