import { nanoid } from "nanoid";
import { db } from "../db/db.js";

const shortUrl = async (req, res) => {
  const userId = res.locals.data;
  const { url } = res.locals.body;

  try {
    const shorted = nanoid();
    await db.query(
      `INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3);`,
      [userId, shorted, url]
    );
    const urlId = (
      await db.query(`SELECT urls.id FROM urls WHERE "shortUrl" = $1;`, [
        shorted,
      ])
    ).rows[0].id;
    await db.query(`INSERT INTO visits ("urlId") VALUES ($1);`, [urlId]);
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

const deleteUrl = async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.data;

  const url = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);

  const urlIdIsValid = url.rowCount > 0;
  if (!urlIdIsValid) {
    return res.status(404).send({ error: "This short url doesn't exists." });
  }

  if (url.rows[0].userId !== userId) {
    return res
      .status(401)
      .send({ error: "You dont't have the permission to delete this url." });
  }

  try {
    await db.query(`DELETE FROM visits WHERE "urlId" = $1;`, [id]);
    await db.query(`DELETE FROM urls WHERE id = $1;`, [id]);
    return res.status(204).send({ message: "Url deleted." });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export { shortUrl, getUrlById, deleteUrl };
