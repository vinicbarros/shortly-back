import { Router } from "express";
import { deleteUrl, shortUrl } from "../controllers/urlsController.js";
import { myShortsUrl } from "../controllers/userController.js";
import { auth } from "../middlewares/authorizationMiddleware.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";
import { urlSchema } from "../schemas/urlSchema.js";

const userRouter = Router();

userRouter.get("/users/me", auth, myShortsUrl);
userRouter.post("/urls/shorten", auth, schemaMiddleware(urlSchema), shortUrl);
userRouter.delete("/urls/:id", auth, deleteUrl);

export { userRouter };
