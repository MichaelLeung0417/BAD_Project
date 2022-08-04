import express from "express";
import { client } from "./middlewares";
import { hashPassword, checkPassword } from "./hash";

export const userRoutes = express.Router();
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/logout", logout);

async function register(req: express.Request, res: express.Response) {
  try {
    let username = req.body.username.trim();
    let password = req.body.password.trim();

    let result = await client.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    if (result.rows.length > 0) {
      res.redirect("/?error=重覆username");
      return;
    }

    try {
      await client.query(
        "INSERT INTO users(username, password, created_at, updated_at) VALUES($1, $2, NOW(), NOW())",
        [username, await hashPassword(password)]
      );
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

async function login(req: express.Request, res: express.Response) {
  try {
    let username = req.body.username.trim();
    let password = req.body.password.trim();

    let result = await client.query("SELECT * FROM users where username=$1", [
      username,
    ]);

    if (await checkPassword(password, result.rows[0].password)) {
      req.session["isUser"] = true;
      req.session["user"] = result.rows[0];
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

function logout(req: express.Request, res: express.Response) {
  req.session["isUser"] = false;
  delete req.session["user"];
  res.redirect("/");
}