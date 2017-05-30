/**
 * Created by zhangliqing on 2017/5/30.
 */
var marked=require('marked');
var Comment=require('../lib/mongo').Comment;

Comment.plugin('contentToHtml',{
  afterFind:function (comments) {
    return comments.map(function (comment) {
      comment.content=marked(comment.content);
      return comment;
    });
  }
});

module.exports={
  create:function (comment) {// 创建一个留言
    return Comment.create(comment).exec();
  },
  delCommentById:function (commentId,author) { // 通过用户 id 和留言 id 删除一个留言
    return Comment.remove({author:author,_id:commentId}).exec();
  },
  delCommentByPostId:function (postId) {  // 通过文章 id 删除该文章下所有留言
    return Comment.remove({postId:postId}).exec;
  },
  getComments:function (postId) { // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
    return Comment
      .find({postId:postId})
      .populate({path:'author',model:'User'})
      .sort({_id:1})
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },
  getCommentsCount:function (postId) { // 通过文章 id 获取该文章下留言数
    return Comment.count({postId:postId}).exec();
  }
};