const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function request(sql, data) {
  let connexion;
  try {
    connexion = await pool.getConnection();
    const rows = await connexion.query(sql, data);
    if (rows.meta !== undefined) delete rows.meta;
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (connexion) connexion.release(); //release to db
  }
}

module.exports.request = request;
