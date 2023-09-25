const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-portfolio',
  password: 'Mg100761#',
});

module.exports = pool.promise();
