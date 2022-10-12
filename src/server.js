import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routers/usersRouter.js";
import { urlRouters } from "./routers/urlsRouter.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(userRouter);
app.use(urlRouters);

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
