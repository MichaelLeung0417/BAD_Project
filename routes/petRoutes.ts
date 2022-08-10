import express from "express";
import { PetController } from "../controllers/petController";

export function createPetRoutes(petController: PetController) {
  const petRouter = express.Router();
  petRouter.post("/addPet", petController.addPet);
  petRouter.post("/showAllPets", petController.showAllPets);
  petRouter.post("/getPetInfo", petController.getPetInfo);
  petRouter.patch("/changeStats", petController.changeStats);
  petRouter.post("/startTime");

  petRouter.post("");

  return petRouter;
}
