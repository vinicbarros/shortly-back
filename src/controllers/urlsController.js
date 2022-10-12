import { nanoid } from "nanoid";
import { urlSchema } from "../schemas/urlSchema.js";
import { db } from "../db/db.js";

const shortUrl = async (req, res) => {
  const userId = res.locals.data;
  const { url } = req.body;

  const validate = urlSchema.validate({ url }, { abortEarly: false });

  if (validate.error) {
    const error = validate.error.details.map((detail) => detail.message);
    return res.status(422).send(error);
  }

  try {
    const shorted = nanoid();
    await db.query(
      `INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3);`,
      [userId, shorted, url]
    );
    return res.status(201).send({ shortUrl: shorted });
  } catch (error) {
    return res.status(422).send(error.detail);
  }
};

export { shortUrl };
