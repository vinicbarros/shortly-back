import { Router } from "express";
import { getUrlById, shortUrl } from "../controllers/urlsController.js";
import { myShortsUrl, openUrl } from "../controllers/userController.js";
import { auth } from "../middlewares/authorizationMiddleware.js";

const urlRouters = Router();

urlRouters.post("/urls/shorten", auth, shortUrl);
urlRouters.get("/urls/:id", getUrlById);
urlRouters.get("/urls/open/:shortUrl", openUrl);
urlRouters.get("/users/me", auth, myShortsUrl);

export { urlRouters };
