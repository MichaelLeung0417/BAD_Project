import { UserService } from "../services/userService";
import express from "express";
import { checkPassword } from "../utilities/hash";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: express.Request, res: express.Response) => {
    try {
      let username: string = await req.body.username;
      let password: string = await req.body.password;

      let userQuery = await this.userService.getAllUser(username);

      if (await checkPassword(password, userQuery[0].hashPassword)) {
        req.session["isUser"] = true;
        req.session["user"] = userQuery[0].id;
        res.json("login success");
        console.log(`User:${username} ID:${req.session["user"]} has logged in`);
        return;
      }
      res.json("帳號或密碼錯誤！");
    } catch (err) {
      console.error(err);
      res.redirect("/");
      return;
    }

    setTimeout(() => {
      res.redirect("/");
    }, 2000);
  };

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

  logout = async (req: express.Request, res: express.Response) => {
    req.session["isUser"] = false;
    delete req.session["user"];
    res.redirect("/");
  };
}
