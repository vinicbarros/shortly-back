import { urlsRepository } from "../common/urlsRepository.js";

const openUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const checkUrl = await urlsRepository.checkUrlByShortUrl(shortUrl);
    if (checkUrl.rowCount < 1) {
      return res.status(404).send({ error: "This short url doesn't exists." });
    }

    const url = checkUrl.rows[0];

    await urlsRepository.insertNewVisit(url.id);

    const redirect = url.url;
    return res.redirect(redirect);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

const myShortsUrl = async (req, res) => {
  const { user } = res.locals;

  try {
    const shortenedUrls = await urlsRepository.getUserShortenedUrls(user.id);
    const visitCounter = (await urlsRepository.getUserVisitCount(user.id))
      .rows[0];
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

const getRanking = async (req, res) => {
  try {
    const ranking = (await urlsRepository.getRanking()).rows;
    return res.status(200).send(ranking);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export { openUrl, myShortsUrl, getRanking };
