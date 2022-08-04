export interface User {
  id: number;
  username: string;
  password: string;
}

export interface Pet {
  id: number;
  foodScore: number;
  talkScore: number;
  brightnessScore: number;
  cleanScore: number;
  playerScore: number;
  juvenileSprite: number;
  adultSprite: number;
  timeElapsed: string;
  totalScore: number;
  juvenile: boolean;
  adult: boolean;
}
