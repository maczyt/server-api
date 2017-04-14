var path = require('path');
var express = require('express');
var routes = require('./routes');
var bodyParser = require('body-parser');
var config = require('./config/production');
var pkg = require('./package.json');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = pkg.name;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// 路由
routes(app);

app.listen(config.port);
