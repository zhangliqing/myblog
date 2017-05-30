/**
 * Created by zhangliqing on 2017/5/29.
 */
var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', function(req, res, next) {
  req.session.user=null;
  req.flash('success','退出成功');
  res.redirect('/posts');
});

module.exports = router;