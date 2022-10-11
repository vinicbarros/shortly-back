import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);

export { userRouter };
