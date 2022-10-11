import { signUpSchema } from "../schemas/signUpSchema.js";
import { db } from "../db/db.js";
import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";

const signIn = async (req, res) => {
  const { email, password } = req.body;
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

export { signIn, signUp };
