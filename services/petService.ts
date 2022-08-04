import { Knex } from "knex";
import { Pet } from "../model";

export class PetService {
  constructor(private knex: Knex) {}
}
