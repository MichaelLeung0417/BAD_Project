import { UserService } from "../services/userService";
import express from "express";
import { checkPassword } from "../utilities/hash";

export class UserController {
  constructor(private userService: UserService) {}

  // LOGIN

  login = async (req: express.Request, res: express.Response) => {
    try {
      let username: string = await req.body.username.trim();
      let password: string = await req.body.password.trim();

      let userQuery = await this.userService.getAllUser(username);

      if (userQuery.length === 0 || userQuery === undefined) {
        res.json("帳號或密碼錯誤！");
        return;
      }

      if (await checkPassword(password, userQuery[0].hashPassword)) {
        req.session["isUser"] = true;
        req.session["user"] = userQuery[0].id;
        res.json("login success");
        console.log(`User:${username} ID:${req.session["user"]} has logged in`);
        return;
      }
      res.json("你中左大裝，我地唔知你錯咩");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
  };

  // REGISTER

  register = async (req: express.Request, res: express.Response) => {
    try {
      let username: string = await req.body.username.trim();
      let password: string = await req.body.password.trim();

      let userQuery = await this.userService.getAllUser(username);

      if (userQuery.length > 0) {
        res.json("重覆username");
        return;
      }
      try {
        await this.userService.insertUser(username, password);
        res.json("成功注冊！");
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  };

  // LOGOUT

  logout = async (req: express.Request, res: express.Response) => {
    req.session["isUser"] = false;
    delete req.session["user"];
    res.redirect("/");
  };

  // GET USERNAME

  getUsername = async (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.session["user"]);

    const username = await this.userService.getUserNameById(userId);
    res.json({ username: username });
  };
}
