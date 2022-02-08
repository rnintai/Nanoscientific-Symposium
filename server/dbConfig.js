const fs = require('fs');

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


const asiaConnection = mysql.createConnection({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:"asia"
})

asiaConnection.connect();


const koreaConnection = mysql.createConnection({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:"korea"
})

koreaConnection.connect();

module.exports.asiaConnection = asiaConnection
module.exports.koreaConnection = koreaConnection