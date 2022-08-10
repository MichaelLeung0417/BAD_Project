import { UserService } from "../services/userService";
import express from "express";
import { checkPassword } from "../utilities/hash";

export class UserController {
  constructor(private userService: UserService) {}

  async login(req: express.Request, res: express.Response) {
    try {
      let username = req.body.username;
      let password = req.body.password;

      let userQuery = this.userService.getAllUser(username);

      if (await checkPassword(password, userQuery[0].password)) {
        req.session["isUser"] = true;
        req.session["user"] = userQuery[0];
        res.redirect("/mainPage.html");
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
  }

  async register(req: express.Request, res: express.Response) {
    try {
      let username = req.body.username.trim();
      let password = req.body.password.trim();

      let userQuery = this.userService.getAllUser(username);

      if (userQuery !== undefined) {
        res.redirect("/?error=重覆username");
        return;
      }

      try {
        this.userService.insertUser(username, password);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

  logout(req: express.Request, res: express.Response) {
    req.session["isUser"] = false;
    delete req.session["user"];
    res.redirect("/");
  }
}
