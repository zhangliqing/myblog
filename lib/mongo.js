/**
 * Created by zhangliqing on 2017/5/29.
 */
/*
* Mongolass 类的实例用于：
* ①创建与断开数据库的连接
* ②定义 Schema
* ③生成 Model 实例
* ④加载全局插件
* ⑤对数据库（db 级）的操作，如: mongolass.listCollections()。
* */
var config=require('config-lite')(__dirname);

var Mongolass=require('mongolass');
var mongolass=new Mongolass();

var moment=require('moment')
var objectIdToTimestamp=require('objectid-to-timestamp')

mongolass.connect(config.mongodb);

mongolass.plugin('addCreatedAt',{//24 位长的 ObjectId 前 4 个字节是精确到秒的时间戳,所以可以根据id生成创建时间created_at
  afterFind:function (results) {
    results.forEach(function (item) {
      item.created_at=moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
    });
    return results;
  },
  afterFindOne:function (result) {
    if(result){
      result.created_at=moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
    }
    return result;
  }
})

exports.User=mongolass.model('User',{
  name:{type:'string'},
  password:{type:'string'},
  avatar:{type:'string'},
  gender:{type:'string',enum:['m','f','x']},
  bio:{type:'string'}
});
exports.User.index({name:1},{unique:true}).exec();// 根据用户名找到用户，用户名全局唯一

exports.Post=mongolass.model('Post',{
  author:{type:Mongolass.Types.ObjectId},
  title: { type: 'string' },
  content: { type: 'string' },
  pv: { type: 'number' }//点击量
})
exports.Post.index({author:1,_id:-1}).exec();// 按创建时间降序查看用户的文章列表

exports.Comment=mongolass.model('Comment',{
  author:{type:Mongolass.Types.ObjectId},
  content:{type:'string'},
  postId:{type:Mongolass.Types.ObjectId}
})
exports.Comment.index({postId:1,_id:1}).exec()// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({author:1,_id:1}).exec()// 通过用户 id 和留言 id 删除一个留言