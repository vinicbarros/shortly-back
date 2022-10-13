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

const getRanking = async (req, res) => {
  try {
    const ranking = (
      await db.query(
        `
        SELECT "userId", name,
        COUNT ("urlId") AS "linksCount",
        SUM ("viewCount") AS "visitCount"
        FROM
        (
          SELECT
          users.id AS "userId", users.name, urls.id AS "urlId",
          COUNT(urls.id) AS "viewCount"
          FROM users
          LEFT JOIN urls ON users.id = urls."userId"
          LEFT JOIN visits on urls.id = visits."urlId"
          GROUP BY users.id, urls. id
        ) AS t1 
        GROUP BY t1.name, t1."userId"
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
