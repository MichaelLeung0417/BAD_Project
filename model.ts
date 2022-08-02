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
  playerSocre: number;
  juvenilleSprite: number;
  adultSprite: number;
  timeEllapsed: string;
  totalScore: number;
  juvenille: boolean;
  adult: boolean;
}
