/**
 * Created by zhangliqing on 2017/5/29.
 */
var express=require('express');
var router=express.Router();
var sha1=require('sha1')

var UserModel=require('../models/users');
var checkNotLogin=require('../middlewares/check').checkNotLogin;

router.get('/',checkNotLogin,function (req,res,next) {// GET /signin 登录页
  res.render('signin');
});
router.post('/',checkNotLogin,function (req,res,next) {// POST /signin 用户登录
  var name=req.fields.name;
  var password=req.fields.password;

  UserModel.getUserByName(name)
    .then(function (user) {
      if(!user){
        req.flash('error','用户不存在');
        return res.redirect('back');
      }
      if(sha1(password)!==user.password){
        req.flash('error', '用户名或密码错误');
        return res.redirect('back');
      }
      req.flash('success','登录成功');
      delete user.password;
      req.session.user=user;
      res.redirect('/posts');
    })
    .catch(next)
});
module.exports=router;
