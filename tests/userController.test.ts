import { UserService } from "../services/userService";
import { Request, Response } from "express";

export class UserController {
  constructor(private userService: UserService) {}

  getAllUser = async (req: Request, res: Response) => {
    const data = await this.userService.getAllUser("1");
    // res.json(data);
    console.log (data)
  };
}
