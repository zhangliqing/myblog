/**
 * Created by zhangliqing on 2017/5/29.
 */
var express=require('express');
var router=express.Router();
var checkLogin=require('../middlewares/check').checkLogin;

router.get('/',checkLogin,function (req,res,next) {//GET /posts 所有用户或者特定用户的文章页
  res.send(req.flash());
});
router.post('/',checkLogin,function (req,res,next) {// POST /posts 发表一篇文章
  res.send(req.flash());
});
router.get('/create',checkLogin,function (req,res,next) {//GET /posts/create 发表文章页
  res.send(req.flash());
});
router.get('/:postId',checkLogin,function (req,res,next) {//GET /posts/:postId 单独一篇的文章页
  res.send(req.flash());
});
router.get('/:postId/edit',checkLogin,function (req,res,next) {//GET /posts/:postId/edit 更新文章页
  res.send(req.flash());
});
router.post('/:postId/edit',checkLogin,function (req,res,next) {//POST /posts/:postId/edit 更新一篇文章
  res.send(req.flash());
});
router.get('/:postId/remove',checkLogin,function (req,res,next) {// GET /posts/:postId/remove 删除一篇文章
  res.send(req.flash());
});
router.post('/:postId/comment',checkLogin,function (req,res,next) {// POST /posts/:postId/comment 创建一条留言
  res.send(req.flash());
});
router.get('/:postId/comment/:commentId/remove',checkLogin,function (req,res,next) {// GET /posts/:postId/comment/:commentId/remove 删除一条留言
  res.send(req.flash());
});

module.exports=router;