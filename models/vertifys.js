var Vertifys = require('../lib/mongo').vertifyModel;

module.exports = {
  create: function (vertify) {
    return Vertifys.create(vertify);
  },
  findOne: function (mobile) {
    return Vertifys.findOne({ mobile: mobile });
  },
  findOneAndUpdate: function (mobile, vertify) {
    return Vertifys.findOneAndUpdate({ mobile: mobile }, { $set: {vertify: vertify} });
  }
};