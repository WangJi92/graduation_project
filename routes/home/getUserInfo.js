var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function getUserInfon(req, res) {
	var user = req.session.user
	var o = {}
	if (user) {
		o = send(true, '成功', {uid: user.uid, uname: user.uname});
	} else {
		o = send(false, '未登录')
	}
	res.send(o)
} 

module.exports = getUserInfon;