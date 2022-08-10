import { UserService } from "../services/userService";
import { Request, Response } from "express";

export class UserController {
  constructor(private userService: UserService) {}

  register = async (req: Request, res: Response) => {
    const data = await jest.fn();
    res.json(data);
  };
}
