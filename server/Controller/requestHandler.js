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
};

module.exports.requestHandler = requestHandler;
