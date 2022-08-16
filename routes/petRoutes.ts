import express from "express";
import { PetController } from "../controllers/petController";

export function createPetRoutes(petController: PetController) {
  const petRouter = express.Router();
  petRouter.post("/addPet", petController.addPet);
  petRouter.post("/showAllPets", petController.showAllPets);
  petRouter.post("/getPetInfo", petController.getPetInfo);
  petRouter.post("/changeStats", petController.changeStats);
  petRouter.get("/play/:id", petController.play);
  petRouter.get("/stopGame/:id", petController.stopGame);
  petRouter.post("/speechTest", petController.speechTest);
  petRouter.post("/eatUpdate", petController.eat);
  petRouter.post("/cleanUpdate", petController.clean);
  petRouter.post("/playWithPet", petController.playWithPet);
  return petRouter;
}
