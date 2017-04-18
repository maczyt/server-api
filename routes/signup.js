var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var checkNotLogin = require('../middleware/check').checkNotLogin;
router.post('/', checkNotLogin, function (req, res, next) {
  var user = {
    mobile: req.body.mobile,
    password: req.body.pw
  };
  UserModel.create(user)
    .then(function (result) {
      user = result;
      delete user.password;
      if (user.password) user.password = '';
      req.session.user = user || {};
      res.status(200).send(user)
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
});

module.exports = router;