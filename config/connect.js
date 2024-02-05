const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'joep123!',
    database: 'company_db'
  },
  console.log(
    `
    ,-------------------------------.
    |                               |
    |  WELCOME TO EMPLOYEE MANAGER  |
    |                               |
    '-------------------------------'
    `)
);

module.exports = db;