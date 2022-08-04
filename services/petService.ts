import { Knex } from "knex";
import { Pet } from "../model/model";

export class PetService {
  constructor(private knex: Knex) {}
}
