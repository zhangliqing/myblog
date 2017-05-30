/**
 * Created by zhangliqing on 2017/5/29.
 */
var express = require('express');
var router = express.Router();
var fs=require('fs');
var path=require('path');
var sha1=require('sha1');

var UserModel=require('../models/users')
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/', checkNotLogin, function(req, res, next) {// GET /signup 注册页
  res.render('signup');
});

router.post('/', checkNotLogin, function(req, res, next) {// POST /signup 用户注册
  var name=req.fields.name;
  var gender=req.fields.gender;
  var bio=req.fields.bio;
  var password=req.fields.password;
  var repassword=req.fields.repassword;
  var avatar=req.files.avatar.path.split(path.sep).pop();//

  try{//存入数据库之前的检查
    if(!(name.length>=1 && name.length<=10)){
      throw new Error('名字请限制在 1-10 个字符');
    }
    if(['m','f','x'].indexOf(gender)===-1){
      throw new Error('性别只能是 m、f 或 x');
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符');
    }
    if (!req.files.avatar.name) {
      throw new Error('缺少头像');
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符');
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致');
    }
  }catch (e){
    fs.unlink(req.files.avatar.path);//若有抛出错误，则表示注册失败，异步删除上传的头像
    req.flash('error',e.message);
    return res.redirect('/signup');
  }

  password=sha1(password);//存入数据库之前将明文密码加密

  var user={
    name:name,
    password:password,
    gender:gender,
    bio:bio,
    avatar:avatar
  };
  UserModel.create(user)//存入数据库
    .then(function (result) {//如果成功，则将用户信息存入req.session
      user=result.ops[0];
      delete user.password;
      req.session.user=user;
      req.flash('success','注册成功');
      res.redirect('/posts');
    })
    .catch(function (e) {//失败处理
      fs.unlink(req.files.avatar.path);
      if(e.message.match('E11000 duplicate key')){
        req.flash('error','用户名已被占用');
        return res.redirect('/signup');
      }
      next(e);
    });
});

module.exports = router;