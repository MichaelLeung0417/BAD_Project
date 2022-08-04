import express from "express";
import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

export const isLogin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.session["isUser"]) {
    next();
  } else {
    res.redirect("/");
  }
};
