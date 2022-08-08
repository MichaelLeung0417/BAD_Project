import { PetService } from "../services/petService";

export class PetController {
  constructor(private petService: PetService) {}

  addPet = async () => {
    this.petService;
  };

  displayPet() {}

  getPetInfo() {}
}
