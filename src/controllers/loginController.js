import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userRepository } from "../common/repositories/loginRepository.js";
dotenv.config();

const signIn = async (req, res) => {
  const { email, password } = res.locals.body;

  try {
    const userIsValid = await userRepository.getUserByEmail(email);
    if (userIsValid.rowCount == 0) {
      return res.status(401).send({ error: "Invalid email or password." });
    }

    const user = userIsValid.rows[0];
    const passwordValid = bcrypt.compareSync(password, user.password);

    if (!passwordValid) {
      return res.status(401).send({ error: "Invalid email or password." });
    }

    const data = { userId: user.id };
    const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: 7200 });

    await userRepository.sendToken(token);

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(422).send(error);
  }
};

const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = res.locals.body;

  if (password !== confirmPassword) {
    return res
      .status(422)
      .send({ error: "Please make sure your password match." });
  }

  const passwordHash = bcrypt.hashSync(password, 12);

  try {
    const emailInUse =
      (await userRepository.getUserByEmail(email)).rowCount > 0;

    if (emailInUse) {
      return res.status(409).send({ error: "This email is already in use." });
    }

    await userRepository.insertNewUser(name, email, passwordHash);

    res.status(201).send({ message: "Account created." });
  } catch (error) {
    return res.status(422).send(error.message);
  }
};

export { signIn, signUp };
