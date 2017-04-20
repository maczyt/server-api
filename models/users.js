var User = require('../lib/mongo').userModel;

module.exports = {
  create: function (user) {
    return User.create(user)
  },
  findOne: function (user) {
    return User.findOne(user)
  }
};