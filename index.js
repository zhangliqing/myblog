/*
* @Author: zhangliqing
* @Date:   2017-05-29 17:20:50
* @Last Modified by:   zhangliqing
* @Last Modified time: 2017-05-29 17:20:50
*/

var path=require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var pkg = require('./package');

var app=express();

app.set('views',path.join(__dirname,'views'));// 设置模板目录
app.set('view engine','ejs');// 设置模板引擎为 ejs

app.use(express.static(path.join(__dirname,'public')));// 设置静态文件目录

app.use(session({// session 中间件
  name:config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret:config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave:true,// 强制更新 session
  saveUninitialized:false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie:{
    maxAge:config.session.maxAge// 设置过期时间，过期后 cookie 中的 session id 自动删除
  },
  store:new MongoStore({// 将 session 存储到 mongodb
    url:config.mongodb  // mongodb的地址
  })
}));

app.use(flash())// flash 中间件，用来显示通知。flash 中间件应该放到 session 中间件之后加载，因为 flash 是基于 session 的。

app.locals.blog={// 在app.locals中设置模板全局常量
  title:pkg.name,
  description:pkg.description
};

app.use(function (req,res,next) {// 在res.locals中添加模板必需的三个变量
  res.locals.user=req.session.user;
  res.locals.success=req.flash('success').toString();
  res.locals.error=req.flash('error').toString();
})



routes(app);

app.listen(config.port,function () {
  console.log(`${pkg.name} listening on port ${config.port}`);
})