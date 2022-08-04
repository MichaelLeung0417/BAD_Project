import express from "express";
import { PetService } from "../services/petService";
import { PetController } from "../controllers/petController";

export const petRouter = express.Router(petController: PetController);

petRouter.use("/addPet", petController.addPet);
petRouter.use("/displayPet", petController.displayPet);
petRouter.use("/getPetInfo", petController.getPetInfo);
