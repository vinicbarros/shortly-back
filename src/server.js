import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { indexRouter } from "./routers/indexRouter.js";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
