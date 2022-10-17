//DATABASE_URL=postgres://paljabqqjaslmr:4baf676483ac6b5b7c9a768b937051108036843b195e94a0934e04bcce1f22fb@ec2-44-195-100-240.compute-1.amazonaws.com:5432/d3giekdhsvualc
import { db } from "../../db/db.js";

const getUserByEmail = async (email) => {
  return await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
};

const sendToken = async (token) => {
  return await db.query(`INSERT INTO sessions (token) VALUES ($1);`, [token]);
};

const insertNewUser = async (name, email, password) => {
  return await db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
    [name, email, password]
  );
};

const userRepository = {
  getUserByEmail,
  sendToken,
  insertNewUser,
};

export { userRepository };
