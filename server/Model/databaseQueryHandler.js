const db = require('../../db').dbConnection;

const databaseQueryHandler = {
  getProductsList: (req, callback) => {
    const upper = req.query.page * req.query.count;
    const lower = upper - req.query.count + 1;
    const reqParams = Object.keys(req.query).length === 0 ? [1, 5] : [lower, upper];
    db.query('SELECT * FROM products WHERE id >= ? AND id <= ?', reqParams, (err, data) => {
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
    db.query('SELECT * FROM products where id = ?', reqParams, (productErr, productData) => {
      if (productErr) {
        callback(productErr, null);
      } else {
        const mergedData = productData;
        db.query('SELECT * FROM features WHERE product_id = ? ', reqParams, (featuresErr, featuresData) => {
          mergedData[0].features = featuresData;
          if (featuresErr) {
            callback(featuresErr, null);
          } else {
            callback(null, productData);
          }
        });
      }
    });
  },

  getProductStyles: (req, callback) => {
    const reqParams = [req.params.product_id];
    const mergedData = { product_id: reqParams[0], results: [] };
    db.query('SELECT * FROM styles WHERE product_id = ?', reqParams, (stylesErr, stylesData) => {
      if (stylesErr) {
        callback(stylesErr, null);
      } else {
        mergedData.results.push(stylesData);
        // db.query('SELECT * FROM SKUs WHERE')
        console.log(mergedData);
        callback(null, mergedData);
      }
    });
  },
};

module.exports.databaseQueryHandler = databaseQueryHandler;
