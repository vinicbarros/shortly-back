import { Router } from "express";
import { getUrlById } from "../controllers/urlsController.js";
import { getRanking, openUrl } from "../controllers/userController.js";

const urlRouters = Router();

urlRouters.get("/urls/:id", getUrlById);
urlRouters.get("/urls/open/:shortUrl", openUrl);
urlRouters.get("/ranking", getRanking);

export { urlRouters };
