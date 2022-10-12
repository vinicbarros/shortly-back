import { Router } from "express";
import { getUrlById, shortUrl } from "../controllers/urlsController.js";
import { auth } from "../middlewares/authorizationMiddleware.js";

const urlRouters = Router();

urlRouters.post("/urls/shorten", auth, shortUrl);
urlRouters.get("/urls/:id", getUrlById);

export { urlRouters };
