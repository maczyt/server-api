var api = require('../config/api.json');
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('home', { api: api })
  });
  app.use('/vertify', require('./vertify'));
  app.use('/signup', require('./signup'));
};