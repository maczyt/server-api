module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/signup')
  });
  app.use('/signup', require('./signup'))
};