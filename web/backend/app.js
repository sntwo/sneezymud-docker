const express = require('express');
//var cookieParser = require('cookie-parser');
var cors = require("cors");

const mariadb = require('mariadb');
const pool = mariadb.createPool({host: 'db', user: 'sneezy', password: 'password', database: 'sneezy', connectionLimit: 50});

const app = express();
const port = 3001

app.use(cors());
//app.use(cookieParser());

app.get('/testAPI', (req, res) => {
  //res.send('API is working properly');
  console.log("getting zones...");
  const query = `
      SELECT * FROM zone;
    `;
  dbQuery(query,res);
});

async function dbQuery(query,res) {
  let conn;
  try {
    conn = await pool.getConnection();
    const data = await conn.query(query);
    res.send(data);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

app.listen(port, () => console.log(`Web-backend listening on port ${port}!`))
