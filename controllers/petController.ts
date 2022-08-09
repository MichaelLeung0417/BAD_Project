import { PetService } from "../services/petService";
import express from "express";

export class PetController {
  constructor(private petService: PetService) {}

  addPet = async (req: express.Request, res: express.Response) => {
    let petName: string = req.body.petname;
    let userId: number = req.session["userId"];

    this.petService.addPet(petName, userId);

    res.json();
  };

  showAllPets() {}

  getPetInfo() {}
}
