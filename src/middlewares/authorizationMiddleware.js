import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { db } from "../db/db.js";
dotenv.config();

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = (
      await db.query(`SELECT * FROM users WHERE id = $1;`, [data.userId])
    ).rows[0];
    res.locals.data = data.userId;
    res.locals.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Invalid token authorization." });
  }
};

export { auth };
