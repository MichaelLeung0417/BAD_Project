import { PetService } from "../services/petService";
import express from "express";

export class PetController {
  constructor(private petService: PetService) {}

  addPet = async (req: express.Request, res: express.Response) => {
    const petName: string = req.body.petname;
    const userId: number = req.session["userId"];

    this.petService.addPet(petName, userId);

    res.json();
  };

  showAllPets = async (req: express.Request, res: express.Response) => {
    const userId: number = req.body.userID;

    const allPetInfo = this.petService.getAllPets(userId);

    res.json(allPetInfo);
  };

  getPetInfo = async (req: express.Request, res: express.Response) => {};
}
