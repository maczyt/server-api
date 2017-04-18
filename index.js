var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config/production');
var pkg = require('./package.json');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = pkg.name;
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// session 中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

// 路由
routes(app);

app.listen(config.port);
