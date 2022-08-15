import express from "express";
import { Client } from "pg";
import fs from "fs";
import formidable from "formidable";
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

// FORMS

const uploadDir = "uploads";
fs.mkdirSync("uploads", { recursive: true });

export const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 20 * 1024 * 1024 ** 2,
  // filter: (part) => part.mimetype?.startsWith("image/") || false,
});
