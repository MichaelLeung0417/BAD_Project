import { PetService } from "../services/petService";
import express from "express";
import { Pet } from "../model/models";

export class PetController {
  constructor(private petService: PetService) {}

  addPet = async (req: express.Request, res: express.Response) => {
    const petName: string = req.body.petname;
    const userId: number = req.session["users"];

    this.petService.addPet(petName, userId);

    res.json();
  };

  showAllPets = async (req: express.Request, res: express.Response) => {
    const userId: number = req.body.userId;

    const allPetInfo = await this.petService.getAllPets(userId);

    res.json(allPetInfo);
  };

  getPetInfo = async (req: express.Request, res: express.Response) => {
    const petId: number = req.body.petId;

    const petInfo = await this.petService.getPetInfo(petId);

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
    let state = new Pet(
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
      info.isGaming,
      info.satisfied,
      info.doody
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

  playWithPet = async (req: express.Request, res: express.Response) => {
    const petId = Number(req.query.id);
    res.json("finished playing with pet");
    await this.petService.changeStats("playScore", 5, petId);
  };

  eat = async (req: express.Request, res: express.Response) => {
    const petId = Number(req.query.id);
    res.json("finished meal");
    await this.petService.changeStats("foodScore", 5, petId);
  };

  clean = async (req: express.Request, res: express.Response) => {
    const petId = Number(req.query.id);
    res.json("finished cleaning");
    await this.petService.changeStats("cleanScore", 5, petId);
  };

  // SPEECH
  speechTest = async (req: express.Request, res: express.Response) => {
    console.log("this ran");
    try {
      const content = req.body.content;

      const spawner = require("child_process").spawn;

      const data_to_pass_in = content;

      console.log("Data sent to python script");

      const python_process = spawner("python", [
        "./python.py",
        JSON.stringify(data_to_pass_in),
      ]);

      let response = "";

      python_process.stdout.on("data", async (data: any) => {
        response = await JSON.parse(data.toString());
        res.json({ youSaid: response });
      });
    } catch (err) {
      throw err;
    }

    // res.json(`got it, you said ${response}`);
  };
}
