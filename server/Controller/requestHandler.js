const { databaseQueryHandler } = require('../Model');

const requestHandler = {
  getProductsList: (req, res) => {
    databaseQueryHandler.getProductsList(req, (err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.send(data);
      }
    });
  },
  getRelatedProducts: (req, res) => {
    databaseQueryHandler.getRelatedProducts(req, (err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.send(data);
      }
    });
  },
  getProductInformation: (req, res) => {
    databaseQueryHandler.getProductInformation(req, (err, data) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.send(data);
      }
    });
  },
};

module.exports.requestHandler = requestHandler;
