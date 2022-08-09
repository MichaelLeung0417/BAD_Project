import { UserService } from "../services/userService";
import { Request, Response } from "express";

export class UserController {
  constructor(private userService: UserService) {}

  getAllUser = async (req: Request, res: Response) => {
    const data = await this.userService.getAllUser();
    res.json(data);
  };
}

describe("userController", () => {
  it("should add user data", () => {});

  it("should login user", () => {});

  it("should logout user", () => {});
});

//   searchPokemonByCode = async (req: Request, res: Response) => {
//     // get code from params
//     // validation on code. If fail, error resp
//     // call service searchPokemonByCode
//     // res.json(result)

//     try {
//       const code = parseInt(req.params.code, 10);
//       if (isNaN(code)) {
//         res.status(400).json({ message: "invalid pokemon code" });
//         return;
//       }

//       const pokemon = await this.service.searchPokemonByCode(code);
//       res.json({ pokemon });
//     } catch (err) {
//       logger.error(err.message);
//       res.status(500).json({ message: "interval server error" });
//     }
//   };
// }
