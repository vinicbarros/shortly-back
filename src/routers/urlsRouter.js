import { Router } from "express";
import { shortUrl } from "../controllers/urlsController.js";
import { auth } from "../middlewares/authorizationMiddleware.js";

const urlRouters = Router();

urlRouters.post("/urls/shorten", auth, shortUrl);

export { urlRouters };
