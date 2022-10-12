import { signUpSchema } from "../schemas/signUpSchema.js";
import { signInSchema } from "../schemas/signInSchema.js";
import { db } from "../db/db.js";
import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const validate = signInSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (validate.error) {
    const error = validate.error.details.map((detail) => detail.message);
    return res.status(422).send(error);
  }

  try {
    const userIsValid = await db.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    );
    if (userIsValid.rowCount == 0) {
      return res.status(401).send({ error: "Invalid email or password." });
    }

    const user = userIsValid.rows[0];
    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      return res.status(401).send({ error: "Invalid email or password." });
    }

    const data = { userId: user.id };
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 7200 });

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(422).send(error);
  }
};

const signUp = async (req, res) => {
  let { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(422)
      .send({ error: "Please make sure your password match." });
  }

  const validate = signUpSchema.validate(
    { name, email, password, confirmPassword },
    { abortEarly: false }
  );

  if (validate.error) {
    const error = validate.error.details.map((detail) => detail.message);
    return res.status(422).send(error);
  }

  name = stripHtml(name).result.trim();
  email = stripHtml(email).result.trim();
  password = stripHtml(password).result.trim();
  confirmPassword = stripHtml(confirmPassword).result.trim();

  const passwordHash = bcrypt.hashSync(password, 12);

  try {
    const emailInUse =
      (await db.query(`SELECT * FROM users WHERE email = $1;`, [email]))
        .rowCount > 0;

    if (emailInUse) {
      return res.status(409).send({ error: "This email is already in use." });
    }

    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
      [name, email, passwordHash]
    );
    res.status(201).send({ message: "Account created." });
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

const openUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const checkUrl = await db.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1;`,
      [shortUrl]
    );
    if (checkUrl.rowCount < 1) {
      return res.status(404).send({ error: "This short url doesn't exists." });
    }

    const url = checkUrl.rows[0];

    await db.query(
      `UPDATE visits SET "visitCount" = "visitCount" + 1 WHERE "urlId" = $1;`,
      [url.id]
    );

    const redirect = url.url;
    return res.redirect(redirect);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const myShortsUrl = async (req, res) => {
  const { user } = res.locals;

  try {
    const shortenedUrls = await db.query(
      `
      SELECT urls.id, urls."shortUrl", urls.url, j1."visitCount" FROM urls
      JOIN visits AS j1 ON urls.id = j1."urlId"
      JOIN users AS j2 ON urls."userId" = j2.id
      WHERE j2.id = $1;
      `,
      [user.id]
    );
    const visitCounter = (
      await db.query(
        `
        SELECT COALESCE(SUM(visits."visitCount"),0) AS "visitCount" 
        FROM visits
        JOIN urls AS j1 ON visits."urlId" = j1.id
        JOIN users AS j2 ON j1."userId" = j2.id
        WHERE j2.id = $1;
      `,
        [user.id]
      )
    ).rows[0];
    return res.status(200).send({
      id: user.id,
      name: user.name,
      visitCount: visitCounter.visitCount,
      shortenedUrls: shortenedUrls.rows,
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export { signIn, signUp, openUrl, myShortsUrl };
