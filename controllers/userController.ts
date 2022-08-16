import { UserService } from "../services/userService";
import express from "express";
import { checkPassword } from "../utilities/hash";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: express.Request, res: express.Response) => {
    try {
      let username = req.body.username;
      let password = req.body.password;

      let userQuery = await this.userService.getAllUser(username);
      console.log(userQuery);

      if (await checkPassword(password, userQuery[0].hashPassword)) {
        req.session["isUser"] = true;
        req.session["user"] = userQuery[0].id;
        res.redirect("/bag.html");
        console.log(`${username} logged in`);
        return;
      }
      console.log(`${username} failed to login`);
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
      let username: string = req.body.username.trim();
      let password: string = req.body.password.trim();

      let userQuery = await this.userService.getAllUser(username);

      if (userQuery !== undefined) {
        res.redirect("/?error=重覆username");
        return;
      }
      try {
        await this.userService.insertUser(username, password);
        res.redirect("/");
      } catch (err) {
        console.error(err);
        res.status(500).send("this");
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
