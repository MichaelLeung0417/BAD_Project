import express from "express";
import expressSession from "express-session";
import { client, isLogin } from "./middlewares";
import { userRoutes } from "./userRoutes";
import { petRouter } from "./routes/petRoutes";

client.connect();
const main = express();

main.use(
  expressSession({
    secret: "very long secret",
    resave: true,
    saveUninitialized: true,
  })
);

main.use(express.urlencoded());
main.use(express.json());

main.use(express.static("public"));
main.use(isLogin, express.static("private"));

main.use(userRoutes);
main.use(petRouter);

main.listen(8000, () => {
  console.log(`Listening on port 8000`);
});
