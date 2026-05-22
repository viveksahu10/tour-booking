const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool(process.env.MYSQL_PUBLIC_URL);

module.exports = pool.promise();