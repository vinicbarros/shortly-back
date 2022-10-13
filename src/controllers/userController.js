import { db } from "../db/db.js";

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

    await db.query(`INSERT INTO visits ("urlId") VALUES ($1);`, [url.id]);

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
      SELECT urls.id, urls."shortUrl", urls."url", 
      COUNT(visits.id) FROM urls
      LEFT JOIN visits ON urls.id = visits."urlId"
      JOIN users ON urls."userId" = users.id
      WHERE users.id = $1
      GROUP BY urls.id, urls."shortUrl", urls."url";
      `,
      [user.id]
    );
    const visitCounter = (
      await db.query(
        `
        SELECT COALESCE(COUNT(visits.id), 0) AS "visitCount" 
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

const getRanking = async (req, res) => {
  try {
    const ranking = (
      await db.query(
        `
        SELECT users.id, users.name, COUNT(DISTINCT j1.id) AS "linksCount",
        COUNT(j2.id) AS "visitCount"
        FROM users
        LEFT JOIN urls AS j1 ON users.id = j1."userId"
        LEFT JOIN visits AS j2 ON j1.id = j2."urlId"
        GROUP BY users.id, users.name
        ORDER BY "visitCount" DESC, "linksCount" DESC  LIMIT 10;
      `
      )
    ).rows;
    return res.status(200).send(ranking);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export { openUrl, myShortsUrl, getRanking };
