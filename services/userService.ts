import { Knex } from "knex";
import { User } from "../model/model";

export class UserService {
  constructor(private knex: Knex) {}
}
