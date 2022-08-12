import { PetService } from "../services/petService";
import express from "express";
import { Pet } from "../model/models";

export class PetController {
  constructor(
    private petService: PetService,
    private isGaming: boolean = false
  ) {}

  addPet = async (req: express.Request, res: express.Response) => {
    const petName: string = req.body.petname;
    const userId: number = req.session["userId"];

    this.petService.addPet(petName, userId);

    res.json();
  };

  showAllPets = async (req: express.Request, res: express.Response) => {
    const userId: number = req.body.userId;

    const allPetInfo = this.petService.getAllPets(userId);

    res.json(allPetInfo);
  };

  getPetInfo = async (req: express.Request, res: express.Response) => {
    const petId: number = req.body.petId;

    const petInfo = this.petService.getPetInfo(petId);

    res.json(petInfo);
  };

  changeStats = async (req: express.Request, res: express.Response) => {
    const changeRequest:
      | "foodScore"
      | "talkScore"
      | "brightnessScore"
      | "cleanScore"
      | "playScore" = req.body.changeRequest;
    const changeMagnitude: number = req.body.changeMagnitude;
    const petId: number = req.body.petId;

    this.petService.changeStats(changeRequest, changeMagnitude, petId);

    res.json();
  };

  // START GAME

  play = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id);
    const info = await this.petService.getPetInfo(id);

    // init state
    const state = new Pet(
      info.id,
      info.talkScore,
      info.brightnessScore,
      info.cleanScore,
      info.playScore,
      info.juvenileSprite,
      info.adultSprite,
      info.timeElapsed,
      info.totalScore,
      info.isJuvenile,
      info.isAdult,
      info.petName,
      info.isHungry,
      info.isGaming
    );

    // play
    res.json({});

    const gamingState = state.displayGameState();

    state.turnOn();
    while (gamingState == true) {
      state.addToGeneralTime();
      state.hungerTimer();
      state.evolveTimer();
    }
  };

  // TURN OFF GAME

  stopGame = async (req: express.Request, res: express.Response) => {};
}
