const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '34.126.84.78',
  user: 'root',
  password: 'chaocarhub12345',
  database: 'chaocarhub',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;