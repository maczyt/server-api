var express = require('express');
var router = express.Router();

var carsModel = require('../models/cars');

router.post('/', function (req, res) {
  var json = req.body; // 选车条件
  carsModel.find({})
    .then(r => {
      if (r) {
        res.json(r);
      } else {
        res.json([]);
      }
    })
});

module.exports = router;