import { Router } from "express";
import { loginRouter } from "./loginRouter.js";
import { urlRouters } from "./urlsRouter.js";
import { userRouter } from "./usersRouter.js";

const indexRouter = Router();

indexRouter.use(loginRouter);
indexRouter.use(userRouter);
indexRouter.use(urlRouters);

export { indexRouter };
