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
    private totalScore: number,

    private juvenileSprite: number,
    private adultSprite: number,
    private timeElapsed: number,
    private isJuvenile: boolean,

    private isGaming: boolean,

    private isAdult: boolean,

    private isHungry: boolean,
    private satisfied: boolean,
    private doody: boolean
  ) {}

  private weight: number = 50;
  private _hungerTimer: NodeJS.Timer;

  feed() {
    clearTimeout(this._hungerTimer);

    this._hungerTimer = setTimeout(() => {
      this.weight -= 1;
    }, 30000);

    this.weight += 5;

    return this.weight;
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
    let timesleft = 4;
    let downloadTimer = setInterval(() => {
      if (timesleft <= 0) {
        clearInterval(downloadTimer);
      }
      timesleft -= 1;
      return (this.isHungry = true);
    }, 13000); // check every 13mins
  }

  evolveTimer() {
    let timesleft = 1;
    let downloadTimer = setInterval(() => {
      if (timesleft <= 0) {
        clearInterval(downloadTimer);
      }
      timesleft -= 1;
      if (this.isJuvenile == true) {
        return (this.isAdult = true);
      } else {
        return (this.isAdult = false);
      }
    }, 30000); // every 30 mins
  }

  displayGameState() {
    return this.isGaming;
  }

  eat() {
    return (this.isHungry = false);
  }

  turnOn() {
    return (this.isGaming = true);
  }

  stopGame() {
    return (this.isGaming = false);
  }

  foodScoreModify(): number {
    if (this.satisfied) {
      return this.foodScore + 5;
    } else {
      return this.foodScore;
    }
  }

  talkScoreModify(): number {
    if (this.satisfied) {
      return this.talkScore + 5;
    } else {
      return this.talkScore;
    }
  }

  brightnessScoreModify(): number {
    if (this.satisfied) {
      return this.brightnessScore + 5;
    } else {
      return this.brightnessScore;
    }
  }

  cleanScoreModify(): number {
    if (this.satisfied) {
      return this.cleanScore + 5;
    } else {
      return this.cleanScore;
    }
  }

  totalScoreModify(): number {
    return (this.talkScore =
      this.foodScore + this.talkScore + this.brightnessScore + this.cleanScore);
  }

  petsInfo() {
    return {
      id: this.id,

      foodScore: this.foodScore,
      talkScore: this.talkScore,
      brightnessScore: this.brightnessScore,
      cleanScore: this.cleanScore,
      playerScore: this.playerScore,
      totalScore: this.totalScore,

      juvenileSprite: this.juvenileSprite,
      adultSprite: this.adultSprite,
      isGaming: this.isGaming,
      isAdult: this.isAdult,

      isHungry: this.isHungry,
      doody: this.doody,
      satisfied: this.satisfied,
    };
  }
}
