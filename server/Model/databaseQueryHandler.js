const db = require('../../db').dbConnection;

const databaseQueryHandler = {
  getProductsList: (req, callback) => {
    console.log(req.query);
    
    db.query('SELECT * FROM products WHERE id < 10', (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },
};

module.exports.databaseQueryHandler = databaseQueryHandler;
