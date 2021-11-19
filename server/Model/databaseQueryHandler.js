const db = require('../../db').dbConnection;

const databaseQueryHandler = {
  getProductsList: (req, callback) => {
    db.query('SELECT * FROM products WHERE id < 10', (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  },

  getRelatedProducts: (req, callback) => {
    const reqParams = [req.params.product_id];
    db.query('SELECT relateditem_id FROM RelatedItems WHERE product_id = ?', reqParams, (err, data) => {
      const sortedData = data.map((entry) => entry.relateditem_id);
      if (err) {
        callback(err, null);
      } else if (sortedData.length === 0) {
        callback(400, null);
      } else {
        callback(null, sortedData);
      }
    });
  },

  getProductInformation: (req, callback) => {
    const reqParams = [req.params.product_id];
    db.query('SELECT * FROM products where id = ?', reqParams, (err, productData) => {
      if (err) {
        callback(err, null);
      } else {
        const mergedData = productData;
        db.query('SELECT * FROM features WHERE product_id = ? ', reqParams, (err, featuresData) => {
          mergedData[0].features = featuresData;
          if (err) {
            callback(err, null);
          } else {
            callback(null, productData);
          }
        });
      }
    });
  },
};

module.exports.databaseQueryHandler = databaseQueryHandler;
