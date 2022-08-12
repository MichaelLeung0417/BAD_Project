import { hungry, notSatisfied, doody } from "../utilities/petFunctions";

export class User {
  id: number;
  username: string;
  password: string;
}

export class Pet {
  constructor(
    private id: number,
    private foodScore: number,
    private talkScore: number,
    private brightnessScore: number,
    private cleanScore: number,
    private playerScore: number,
    private juvenileSprite: number,
    private adultSprite: number,
    private timeElapsed: number,
    private totalScore: number,
    private isJuvenile: boolean,
    private isAdult: boolean,
    private isHungry: boolean,
    private isGaming: boolean
  ) {}

  returnState() {
    return this;
  }

  addToGeneralTime() {
    while (this.timeElapsed < 3600) {
      setInterval(() => {
        this.timeElapsed += 1;
      }, 1); // every second
    }

    return this.timeElapsed;
  }

  hungerTimer() {
    setInterval(() => {
      hungry();
      this.satisfactionTimer();
    }, 720); // every 12 mins
  }

  evolveTimer() {
    setInterval(() => {
      if (this.isJuvenile == true) {
        this.isAdult = true;
        return this.isAdult;
      }
      this.isJuvenile = true;
      return this.isJuvenile;
    }, 1800); // every 30 mins
  }

  satisfactionTimer() {
    while (this.isHungry == true) {
      setTimeout(() => {
        notSatisfied();
      }, 15); // 15 seconds
    }
  }

  eat() {
    this.isHungry = false;
    return;
  }

  doodyTimer() {
    setInterval(() => doody(), 5); // 5 seconds
  }

  turnOn() {
    this.isGaming = true;
  }

  stopGame() {
    this.isGaming = false;
  }
}
