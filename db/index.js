const mysql = require('mysql2');
const { dbInfo } = require('../config');

const dbConnection = mysql.createConnection(dbInfo);

dbConnection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('connected to the database!');
  }
});

module.exports.dbConnection = dbConnection;
