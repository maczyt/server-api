var express = require('express');
var router = express.Router();
var TopClient = require('../config/vertify/topClient').TopClient;
var VertifyModel = require('../models/vertifys');

function getVertify() {
  var res = [];
  for (var i = 0; i < 6; i ++) {
    res.push(Math.floor(Math.random() * 10));
  }
  return res.join('');
}

var client = new TopClient({
  'appkey': '23758773',
  'appsecret': 'a2b95c88639a59bfc997dfed02cfae0b',
  'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

router.post('/', function (req, res) {
  var mobile = req.body.mobile;
  var vertify = getVertify();
  VertifyModel.findOne(mobile)
    .then(r => {
      if (r) {
        return res.send({status: true, msg: '该手机号已注册'})
      } else {
        client.execute('alibaba.aliqin.fc.sms.num.send', {
          'extend' : '' ,
          'sms_type' : 'normal' ,
          'sms_free_sign_name' : '宇涛汽车租赁平台' ,
          'sms_param' : `{name:'${vertify}'}` ,
          'rec_num' :  mobile,
          'sms_template_code' : "SMS_62430389"
        }, function (error, response) {
          if (!error) {
            VertifyModel.findOneAndUpdate(mobile, vertify)
              .then(r => {
                if (!r) {
                  VertifyModel.create({mobile: mobile, vertify: vertify})
                    .then(r => {
                      return res.send(r.vertify)
                    })
                    .catch(err => {
                      return res.send(err);
                    });
                } else return res.send(r.vertify);
              });
          }
          else res.status(500).send(error);
        });
      }
    });
});

module.exports = router;