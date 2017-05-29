/*
* @Author: zhangliqing
* @Date:   2017-05-29 19:31:12
* @Last Modified by:   zhangliqing
* @Last Modified time: 2017-05-29 19:36:21
*/

'use strict';
module.exports={
	port:3000,
	session:{
		secret:'myblog',
		key:'myblog',
		maxAge:2592000000
	},
	mongodb:'mongodb://localhost:27017/myblog'
};