import { db } from "../db/db.js";

const checkUrlByShortUrl = async (shortUrl) => {
  return await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [
    shortUrl,
  ]);
};

const insertNewVisit = async (urlId) => {
  return await db.query(`INSERT INTO visits ("urlId") VALUES ($1);`, [urlId]);
};

const getUserShortenedUrls = async (userId) => {
  return await db.query(
    `
        SELECT urls.id, urls."shortUrl", urls."url", 
        COUNT(visits.id) AS "visitCount" FROM urls
        LEFT JOIN visits ON urls.id = visits."urlId"
        JOIN users ON urls."userId" = users.id
        WHERE users.id = $1
        GROUP BY urls.id, urls."shortUrl", urls."url";
        `,
    [userId]
  );
};

const getUserVisitCount = async (userId) => {
  return await db.query(
    `
        SELECT COALESCE(COUNT(visits.id), 0) AS "visitCount" 
        FROM visits
        JOIN urls AS j1 ON visits."urlId" = j1.id
        JOIN users AS j2 ON j1."userId" = j2.id
        WHERE j2.id = $1;
      `,
    [userId]
  );
};

const getRanking = async () => {
  return await db.query(
    `
        SELECT users.id, users.name, COUNT(DISTINCT j1.id) AS "linksCount",
        COUNT(j2.id) AS "visitCount"
        FROM users
        LEFT JOIN urls AS j1 ON users.id = j1."userId"
        LEFT JOIN visits AS j2 ON j1.id = j2."urlId"
        GROUP BY users.id, users.name
        ORDER BY "visitCount" DESC, "linksCount" DESC  LIMIT 10;
      `
  );
};

const insertNewUrl = async (userId, shortUrl, url) => {
  return await db.query(
    `INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3);`,
    [userId, shortUrl, url]
  );
};

const getUrlById = async (urlId) => {
  return await db.query(`SELECT * FROM urls WHERE id = $1;`, [urlId]);
};

const deleteUrl = async (urlId) => {
  await db.query(`DELETE FROM visits WHERE "urlId" = $1;`, [urlId]);
  await db.query(`DELETE FROM urls WHERE id = $1;`, [urlId]);
};

const urlsRepository = {
  checkUrlByShortUrl,
  insertNewVisit,
  getUserShortenedUrls,
  getUserVisitCount,
  getRanking,
  insertNewUrl,
  getUrlById,
  deleteUrl,
};

export { urlsRepository };
