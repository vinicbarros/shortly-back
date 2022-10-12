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
    const getUrlById = (
      await db.query(`SELECT urls.id FROM urls WHERE "shortUrl" = $1;`, [
        shorted,
      ])
    ).rows[0].id;
    await db.query(`INSERT INTO visits ("urlId") VALUES ($1);`, [getUrlById]);
    return res.status(201).send({ shortUrl: shorted });
  } catch (error) {
    return res.status(422).send(error.detail);
  }
};

const getUrlById = async (req, res) => {
  const { id } = req.params;

  try {
    const urlIsValid = await db.query(
      `SELECT id, "shortUrl", url FROM urls WHERE id = $1;`,
      [id]
    );
    if (!(urlIsValid.rowCount > 0)) {
      return res
        .status(404)
        .send({ error: "This shorten url doesn't exists." });
    }

    return res.status(200).send(urlIsValid.rows[0]);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export { shortUrl, getUrlById };
