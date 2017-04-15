var config = require('../config/production');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(config.mongodb);
var db = mongoose.connection;
var userSchema = new Schema({
  mobile: String,
  password: String
});

exports.userModel = db.model('User', userSchema);