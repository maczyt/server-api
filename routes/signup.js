var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var checkNotLogin = require('../middleware/check').checkNotLogin;
router.get('/', function (req, res, next) {
  res.render('signup')
});
router.post('/', checkNotLogin, function (req, res, next) {
  var user = {
    mobile: req.body.mobile,
    password: req.body.password
  };
  UserModel.create(user)
    .then(function (result) {
      user = result;
      delete user.password;
      req.session.user = user || {};
      res.redirect('/')
    })
    .catch(function (err) {
      return res.redirect('/signup')
    });
});

module.exports = router;