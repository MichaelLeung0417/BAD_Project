import express from "express";

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
