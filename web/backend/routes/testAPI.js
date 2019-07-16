var express = require('express');
var router = express.Router();
const mariadb = require('mariadb');
const pool = mariadb.createPool({host: 'db', user: 'sneezy', password: 'password', database: 'sneezy', connectionLimit: 5});


router.get('/', function(req, res, next) {
    //res.send('API is working properly');
    console.log("getting zones...");
    getZones(res);
});


async function getZones(res) {
    let conn;
    try {
      conn = await pool.getConnection();
      const query = `
        SELECT * FROM zone;
      `;
      const data = await conn.query(query);
      //console.log(rows); //[ {val: 1}, meta: ... ]
      //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
      //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
      //console.log("Sneezy DB contains " + zc + " zones.");
        res.send(data);
    } catch (err) {
        console.log(err);
      throw err;
    } finally {
      if (conn) return conn.end();
    }
}

module.exports = router;