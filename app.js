var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// 使用mysql存储session
var dbConfig = require('./databaseConfig');
var MySQLStore = require('express-mysql-session')(session);
var options = {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  checkExpirationInterval: (1000*60*60*24)*21, //清除过期会话的时间
  expiration: (1000*60*60*24)*20, // 会话的最大时间
  createDatabaseTable: true
};
var sessionStore = new MySQLStore(options);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置session
app.use(session({
    secret: 'xiaohaibao_cookie_secret', 
    name: 'sid',
    store: sessionStore, // 使用mysql存储session
    resave: true, // 每次请求访问，都重新保存session
    saveUninitialized: false
}));

// 登录拦截
// app.use(function(req, res, next){
//   // 不做拦截控制的path
//   var paths = ['/user/wxlogin'];
//   if(!req.session.user && paths.indexOf(req.path)<0){
//     res.json({checkLogin:false});
//   }else{
//     next();
//   }
// });

// 加载路由控制
var index = require('./routes/index');
var user = require('./routes/user');
app.use('/', index);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 小程序的appID
// global.appInfo = {
//     appId : 'wxebb04b7d21890f11',
//     appSecret : 'a2eec08d2acfdf0cccd6f32fce6f6265'
// }


// 导入models
let sequelize = require('./models/sequelize');
let ActivityType = require('./models/activityType');
let User = require('./models/user')
let Activity = require('./models/activity');
sequelize.sync();
// sequelize.sync({force:true});

// User.findOrCreate({
//     where: {username: 'zhang'}, 
//     defaults: {password: '123456'}
// }).spread(function(user, created) {
//     console.log(user.get({plain: true}));
//     console.log(created);
// });



module.exports = app;
