const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'PRODUCTOVERVIEW',
});

dbConnection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('connected to the database!');
  }
});

module.exports.dbConnection = dbConnection;
