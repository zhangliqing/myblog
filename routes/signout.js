/**
 * Created by zhangliqing on 2017/5/29.
 */
var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, function(req, res, next) {
  res.send(req.flash());
});

module.exports = router;