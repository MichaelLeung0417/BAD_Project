import { PetService } from "../services/petService";
import express from "express";
import { Pet } from "../model/models";
import { form } from "../utilities/middlewares";

export class PetController {
  constructor(private petService: PetService) {}

  // ADD PET
  addPet = async (req: express.Request, res: express.Response) => {
    const petName: string = req.body.petname;
    const userId: number = req.session["users"];
    console.log("add pet userID is: ", userId);

    const thisPetId = await this.petService.addPet(petName, userId);
    req.session["pet"] = thisPetId;

    res.redirect(`/app.html`);
  };

  // SHOW ALL PETS
  showAllPets = async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.session["user"]);

    const allPetInfo = await this.petService.getAllPets(userId);

    res.json({ allPetInfo: allPetInfo });
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
    const petId = Number(req.session["pet"]);
    res.json("finished playing with pet");
    await this.petService.changeStats("playScore", 5, petId);
  };

  eat = async (req: express.Request, res: express.Response) => {
    const petId = Number(req.session["pet"]);
    res.json("finished meal");
    await this.petService.changeStats("foodScore", 5, petId);
  };

  clean = async (req: express.Request, res: express.Response) => {
    const petId = Number(req.session["pet"]);
    res.json("finished cleaning");
    await this.petService.changeStats("cleanScore", 5, petId);
  };

  speech = async (req: express.Request, res: express.Response) => {
    const petId = Number(req.session["pet"]);
    res.json("finished talking");
    await this.petService.changeStats("talkScore", 5, petId);
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

  // RECEIVE FRUIT IMAGES
  receiveFruit = async (req: express.Request, res: express.Response) => {
    form.parse(req, async (err, fields, files) => {
      console.log(files["file"]["newFilename"]);

      res.json({ filename: files["file"]["newFilename"] });
    });
  };

  // KID SPRITE CALCULATOR

  calculateKid = async (req: express.Request, res: express.Response) => {
    const foodScore = req.body.foodScore;
    const talkScore = req.body.talkScore;
    const cleanScore = req.body.cleanScore;
    const playScore = req.body.playScore;
    let kidSprite;

    if (foodScore < 5) {
      if (talkScore < 5) {
        kidSprite = "kid1";
      } else {
        kidSprite = "kid2";
      }
    } else {
      if (cleanScore < 5) {
        kidSprite = "kid3";
      } else {
        if (playScore < 5) {
          kidSprite = "kid4";
        } else {
          kidSprite = "kid5";
        }
      }
    }
    res.json({ kidSprite: kidSprite });
  };

  // ADULT SPRITE CALCULATOR

  calculateAldult = async (req: express.Request, res: express.Response) => {
    const foodScore = req.body.foodScore;
    const talkScore = req.body.talkScore;
    const cleanScore = req.body.cleanScore;
    const playScore = req.body.playScore;
    let aldultSprite;

    if (foodScore < 5) {
      if (talkScore < 5) {
        aldultSprite = "aldult1";
      } else {
        aldultSprite = "aldult2";
      }
    } else {
      if (cleanScore < 5) {
        aldultSprite = "aldult3";
      } else {
        if (playScore < 5) {
          aldultSprite = "aldult4";
        } else {
          aldultSprite = "aldult5";
        }
      }
    }
    res.json({ aldultSprite: aldultSprite });
  };
}
