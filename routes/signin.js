/**
 * Created by zhangliqing on 2017/5/29.
 */
var express=require('express');
var router=express.Router();
var checkNotLogin=require('../middlewares/check').checkNotLogin;

router.get('/',checkNotLogin,function (req,res,next) {// GET /signin 登录页
  res.send(req.flash());
});
router.post('/',checkNotLogin,function (req,res,next) {// POST /signin 用户登录
  res.send(req.flash());
});
module.exports=router;
