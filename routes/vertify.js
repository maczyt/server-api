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
  VertifyModel.findOneAndUpdate(mobile, vertify)
    .then(r => {
      if (!r) {
        VertifyModel.create({mobile: mobile, vertify: vertify})
          .then(r => {
            res.send(r.vertify)
          })
          .catch(err => {
            res.send(err);
          });
      } else res.send(r.vertify);
    })

  /*client.execute('alibaba.aliqin.fc.sms.num.send', {
    'extend' : '' ,
    'sms_type' : 'normal' ,
    'sms_free_sign_name' : '宇涛汽车租赁平台' ,
    'sms_param' : `{name:'${vertify}'}` ,
    'rec_num' :  mobile,
    'sms_template_code' : "SMS_62430389"
  }, function (error, response) {
    if (!error) {
      VertifyModel.create({mobile: mobile, vertify: vertify})
        .catch(err => {
          res.send(err);
        });
      res.status(200).send('OK');
    }
    else res.status(500).send(error);
  })*/

});

module.exports = router;