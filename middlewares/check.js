/**
 * Created by zhangliqing on 2017/5/29.
 */
module.exports={
  checkLogin:function (req,res,next) {
    if (!req.session.user){
      req.flash('error','未登录');
      return res.redirect('/sigin');
    }
    next();
  },
  checkNotLogin:function (req,res,next) {
    if(req.session.user){
      req.flash('error','已登录');
      return res.redirect('back');
    }
    next();
  }

};