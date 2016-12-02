var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function getCategoryBooks(req, res) {
	var tid = req.query.category;
	var connection = mysql.createConnection($conf),
			o = {};

		connection.connect();
		connection.query(
			'select bid,bname,cover_img,degree from books where tid=? order by heat desc, modify_time desc limit 0,12',
			[tid],
			function(err, rows, fields) {
				if (err) {
					throw err;
					o = send(false, '连接错误，请重试');
				} else if (rows.length == 0) {
					o = send(false, '没有数据哦！')
				} else {
					o = send(true, '成功', {books: rows});
				}
				res.send(o);
			}
		)

} 

module.exports = getCategoryBooks;