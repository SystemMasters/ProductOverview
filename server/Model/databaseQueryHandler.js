/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
const db = require('../../db').dbConnection;

const databaseQueryHandler = {
  getProductsList: (req, callback) => {
    const upper = req.query.page * req.query.count;
    const lower = upper - req.query.count + 1;
    const reqParams = Object.keys(req.query).length === 0 ? [1, 5] : [lower, upper];
    const query = 'SELECT * FROM Products WHERE id >= ? AND id <= ?';
    // ------------------- error first callback -------------------------
    // db.query(query, reqParams, (err, data) => {
    //   if (err) {
    //     callback(err, null);
    //   } else {
    //     callback(null, data);
    //   }
    // });
    // ------------------- promises ------------------------------------
    db.promise().query(query, reqParams)
      .then((data) => callback(null, data[0]))
      .catch((err) => callback(err, null));
  },

  getRelatedProducts: (req, callback) => {
    const reqParams = [req.params.product_id];
    const query = 'SELECT relateditem_id FROM RelatedItems WHERE product_id = ?';
    // ------------------- error first callback -------------------------
    // db.query(query, reqParams, (err, data) => {
    //   const sortedData = data.map((entry) => entry.relateditem_id);
    //   if (err) {
    //     callback(err, null);
    //   } else if (sortedData.length === 0) {
    //     callback(400, null);
    //   } else {
    //     callback(null, sortedData);
    //   }
    // });
    // ------------------- promises ------------------------------------
    db.promise().query(query, reqParams)
      .then((data) => {
        const sortedData = data[0].map((entry) => entry.relateditem_id);
        callback(null, sortedData);
      })
      .catch((err) => callback(err, null));
  },

  getProductInformation: (req, callback) => {
    const reqParams = [req.params.product_id];
    const productQuery = 'SELECT * FROM Products WHERE id = ?';
    const featuresQuery = 'SELECT feature, value FROM Features WHERE product_id = ?';
    // ------------------- error first callback -------------------------
    // db.query(productQuery, reqParams, (productErr, productData) => {
    //   if (productErr) {
    //     callback(productErr, null);
    //   } else {
    //     const mergedData = productData[0];
    //     db.query(featuresQuery, reqParams, (featuresErr, featuresData) => {
    //       console.log(mergedData);
    //       mergedData.features = featuresData;
    //       if (featuresErr) {
    //         callback(featuresErr, null);
    //       } else {
    //         callback(null, mergedData);
    //       }
    //     });
    //   }
    // });
    // ------------------- promises ------------------------------------
    db.promise().query(productQuery, reqParams)
      .then((productData) => db.promise().query(featuresQuery, reqParams)
        .then((featuresData) => {
          const mergedData = productData[0][0];
          [featuresData] = featuresData;
          mergedData.features = featuresData;
          callback(null, mergedData);
        })
        .catch((err) => callback(err, null)));
  },

  getProductStyles: (req, callback) => {
    const reqParams = [req.params.product_id];
    // const stylesId = [style.styles_id];
    const stylesQuery = 'SELECT * FROM Styles WHERE product_id = ?';
    const photosQuery = 'SELECT thumbnail_url, url FROM Photos WHERE styles_id = ?';
    const skusQuery = 'SELECT id, quantity, size FROM SKUs WHERE styles_id = ?';
    const mergedData = { product_id: reqParams[0], results: [] };
    db.promise().query(stylesQuery, reqParams)
      // .then((stylesData) => {
      //   console.log(stylesData);
      //   const stylesId = [stylesData[0][0].styles_id];
      //   console.log(stylesId);
      // })
      .then((stylesData) => stylesData[0].forEach((style) => {
        style.photos = [];
        style.skus = {};
        db.promise().query(photosQuery, [style.styles_id])
          .then((photosData) => db.promise().query(skusQuery, [style.styles_id])
            .then((skusData) => {
              const photo = photosData[0];
              style.photos = photo;
              skusData[0].forEach((sku) => { style.skus[sku.id] = { quantity: sku.quantity, size: sku.size }; });
              mergedData.results.push(style);
              if (mergedData.results.length === stylesData[0].length) {
                callback(null, mergedData);
              }
            }));
      })
        .catch((err) => callback(err, null)));
  //       mergedData.results = stylesData;
  //       mergedData.results.map((style) => {
  //         const stylesId = [style.styles_id];
  //         db.query('SELECT quantity, size FROM SKUs WHERE styles_id = ?', stylesId, (SKUsErr, SKUData) => {
  //           style.skus = SKUData;
  //           console.log(style);
  //           // mergedData.results.map((style) => {
  //           //   // delete style.product_id;
  //           //   style['default?'] === 1 ? style['default?'] = true : style['default?'] = false;
  //           // });
  //         });
  //       });
  //     }
  //     callback(null, mergedData);
  //   });
  },
};

module.exports.databaseQueryHandler = databaseQueryHandler;
