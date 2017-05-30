/**
 * Created by zhangliqing on 2017/5/30.
 */
/*Model 类的实例用于：
  ①对数据库（collection 级）的增删改查，如: User.find()
  ②定义 Model 级的插件。
*/

var User=require('../lib/mongo').User;

module.exports={
  create:function (user) {//注册一个用户
    return User.create(user).exec();
  },
  getUserByName:function (name) {
    return User
      .findOne({name:name})
      .addCreatedAt()//这是一个自定义插件
      .exec();
  }
};