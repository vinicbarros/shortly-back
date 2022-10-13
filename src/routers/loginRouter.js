import { Router } from "express";
import { signIn, signUp } from "../controllers/loginController.js";
import { signUpSchema } from "../schemas/signUpSchema.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { schemaMiddleware } from "../middlewares/schemaMiddleware.js";

const loginRouter = Router();

loginRouter.post("/signup", schemaMiddleware(signUpSchema), signUp);
loginRouter.post("/signin", schemaMiddleware(signInSchema), signIn);

export { loginRouter };
