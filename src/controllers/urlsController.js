import { nanoid } from "nanoid";
import { urlsRepository } from "../common/urlsRepository.js";
import { db } from "../db/db.js";

const shortUrl = async (req, res) => {
  const userId = res.locals.data;
  const { url } = res.locals.body;

  try {
    const shorted = nanoid();
    await urlsRepository.insertNewUrl(userId, shorted, url);
    return res.status(201).send({ shortUrl: shorted });
  } catch (error) {
    return res.status(422).send(error.detail);
  }
};

const getUrlById = async (req, res) => {
  const { id } = req.params;

  try {
    const urlIsValid = await urlsRepository.getUrlById(id);
    console.log(urlIsValid);
    if (urlIsValid.rowCount === 0) {
      return res
        .status(404)
        .send({ error: "This shorten url doesn't exists." });
    }
    const url = urlIsValid.rows[0];
    return res.status(200).send({
      id: url.id,
      shortUrl: url.shortUrl,
      url: url.url,
    });
  } catch (error) {
    return res.status(404).send(error);
  }
};

const deleteUrl = async (req, res) => {
  const { id } = req.params;
  const userId = res.locals.data;

  const url = await urlsRepository.getUrlById(id);

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
    await urlsRepository.deleteUrl(id);
    return res.status(204).send({ message: "Url deleted." });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export { shortUrl, getUrlById, deleteUrl };
