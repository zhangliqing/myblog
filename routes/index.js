/*
* @Author: zhangliqing
* @Date:   2017-05-29 17:20:50
* @Last Modified by:   zhangliqing
* @Last Modified time: 2017-05-29 17:20:50
*/

module.exports=function (app) {
  app.get('/',function (req,res) {
    res.redirect('/posts');
  });
  app.use('/signup',require('./signup'));
  app.use('/signin',require('./signin'));
  app.use('/signout',require('./signout'));
  app.use('/posts',require('./posts'));
};