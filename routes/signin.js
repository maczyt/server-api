var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');

router.post('/', function (req, res) {
  var mobile = req.body.mobile,
      pw = req.body.password;
  var user = { mobile: mobile, password: pw };
  UserModel.findOne(user)
    .then(r => {
      if (r) {
       res.send({
         status: true,
         msg: '登录成功',
         user: r
       })
      } else {
        res.send({
          status: false,
          msg: '账号密码不正确'
        })
      }
    })
});

module.exports = router;