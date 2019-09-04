const express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var cors = require("cors");
const session = require('express-session');

const mariadb = require('mariadb');
const pool = mariadb.createPool({host: 'db', user: 'sneezy', password: 'password', database: 'sneezy', connectionLimit: 50});

const app = express();
const port = 3001

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routesArray = ['/login']
app.use(routesArray, session(
  { secret: 'replace-me', 
  cookie: { maxAge: 60000, secure: false, domain: "localhost", httpOnly: false}, 
  resave: false, 
  saveUninitialized: false 
}));

app.use( (req, res, next) => {
  //console.log('req.session', req.session);
  next()
});

app.get('/testAPI', (req, res) => {
  //res.send('API is working properly');
  console.log("getting zones...");
  const query = `
      SELECT * FROM zone;
    `;
  queryDB(query,[], (data) => { res.send(data)}) ;
});			

app.post('/login', (req, res) => {
  login(req,res);
});	

app.get('/logout', (req, res) => {
  req.session.loggedIn = false;
  req.session.blocks = [];
})

app.get('/zone/:id', (req, res) => {
  console.log("asked backend for ", req.params.id);
  const query = `
      SELECT * FROM zone WHERE zone_nr = ?; 
    `;
  queryDB(query,[req.params.id], (data) => { 
    res.send(data[0])
  });
});

app.get('/mob/:id', (req, res) => {
  console.log("asked backend for ", req.params.id);
  const query = `
      SELECT m.short_desc, m.vnum, m.level, r.response
      FROM mob m
      LEFT OUTER JOIN mobresponses r ON m.vnum = r.vnum
      WHERE m.vnum = ?;
    `;
  queryDB(query,[req.params.id], (data) => { 
    res.send(data[0])
  });
});

app.get('/mobs/:id', (req, res) => {
  console.log("asked backend for ", req.params.id);
  const query = `
      SELECT m.short_desc, m.vnum, m.level, z.bottom, z.top, r.response
      FROM mob m
      INNER JOIN zone z ON m.vnum BETWEEN z.bottom AND z.top
      LEFT OUTER JOIN mobresponses r ON m.vnum = r.vnum
      WHERE z.zone_nr = ?;
    `;
  queryDB(query,[req.params.id], (data) => { 
    res.send(data)
  });
});

app.get('/objs/:id', (req, res) => {
  console.log("asked backend for ", req.params.id);
  const query = `
      SELECT o.short_desc, o.vnum, o.type, o.val1, z.bottom, z.top
      FROM obj o
      INNER JOIN zone z ON o.vnum BETWEEN z.bottom AND z.top
      WHERE z.zone_nr = ?;
    `;
  queryDB(query,[req.params.id], (data) => { 
    res.send(data)
  });
});

// The authorization strategy here is to give the client a cookie which 
// is used to reference server side data.  This data is held in memory so this
// is not a very scalable system; ideally we would make a new table in the db 
// to hold this.

// Also, prevent login attemps on the same name from ocurring less than 10 seconds
// aparat to limit brute force attacks.  Same in memory flaw as above.
let loginAttempts = {};

async function login(req, res) {
  console.log(loginAttempts);
  console.log('current date: ' , Date.now());
  
  
  if (loginAttempts[req.body.username]) {
    let td = Date.now() - loginAttempts[req.body.username];
    console.log('last attempt: ', td);
    if (td < 10000) {
      console.log("too many tries / nexts try in ", (loginAttempts[req.body.username] + 10000 - Date.now()), " seconds");
      res.status(403).json({status:"Wait a few seconds then try again"});
      return;
    } 
  }
    
  loginAttempts[req.body.username] = Date.now();
  
  // Sneezy uses crypt(3) which isn't available in JS.  Detour through python land . . .
  var spawn = require("child_process").spawn; 
  var process = spawn('python',["./sneezycrypt.py", req.body.username, req.body.password]); 
  process.stdout.on('data', async function(data) { 
      const hash = data.toString().trim();
      const query = 'SELECT * FROM account WHERE name = ? AND passwd = ?'
      queryDB(query,[req.body.username, hash], (data) => {
        if (data[0]) {
          req.session.username = req.body.username;
          let blockinfo = getBlocks(res, req);
        } else {
          res.status(401).json({status:"Bad username / password"})
        }
      });
  });

}

function getBlocks(res, req){
  const query = `
    select w.blockastart, w.blockaend, w.blockbstart, w.blockbend
    from account a
    inner join player p on p.account_id = a.account_id
    inner join wizdata w on w.player_id = p.id
    where a.name = ?
  `
  queryDB(query, [req.body.username], (data) => {
    //console.log(data);
    req.session.blocks = data[0];
    res.status(200).json({
      'authUser': {
        'name':req.body.username,
        'loggedIn':true,
        'blocks':data[0]
      }
    })
  });
}

async function queryDB(query, queryargs, callBack) {
  let conn;
  try {
    conn = await pool.getConnection();
    const data = await conn.query(query, queryargs);
    callBack(data);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}



app.listen(port, () => console.log(`Web-backend listening on port ${port}!`))
