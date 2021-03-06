var config = require('../config/production');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect(config.mongodb);
var db = mongoose.connection;
var userSchema = new Schema({
  mobile: String,
  password: String
});
var vertifySchema = new Schema({
  mobile: String,
  vertify: String
});
var carsSchema = new Schema({
  name: String,
  money: Number,
  src: String,
  detail: Object
});

exports.userModel = db.model('User', userSchema);
exports.vertifyModel = db.model('Vertify', vertifySchema);
exports.carsModel = db.model('Cars', carsSchema);