var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');
var VerifyModel = require('../models/vertifys');
var checkNotLogin = require('../middleware/check').checkNotLogin;
router.post('/', checkNotLogin, function (req, res, next) {
  var mobile = req.body.mobile,
      pw = req.body.pw,
      pw2 = req.body.pw2,
      vertify = req.body.yzm;
  if (pw !== pw2) {
    return res.send({
      status: false,
      msg: '两次密码不一致'
    })
  }
  VerifyModel.findOne(mobile)
    .then(r => {
      if (r.vertify === vertify) {
        var user = {
          mobile: mobile,
          password: pw
        };

        UserModel.create(user)
          .then(function (result) {
            user = result;
            delete user.password;
            if (user.password) user.password = '';
            req.session.user = user || {};
            res.status(200).send({
              status: true,
              msg: '注册成功',
              user: user
            })
          })
          .catch(function (err) {
            res.status(400).send({
              status: false,
              msg: err.message
            });
          });
      } else {
        res.send({
          status: false,
          msg: '验证码不正确'
        })
      }
    })
    .catch(err => {
      res.status(400).send({
        status: false,
        msg: '您未生成验证码'
      })
    });
});

module.exports = router;