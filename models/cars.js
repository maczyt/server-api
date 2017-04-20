var Cars = require('../lib/mongo').carsModel;
module.exports = {
  find: function () {
    return Cars.find({})
  }
};