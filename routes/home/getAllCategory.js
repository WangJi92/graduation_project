var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function getAllCategory(req, res) {
	var connection = mysql.createConnection($conf),
			o = {};
		connection.connect();
		connection.query(
			'select * from book_type',
			[req.query.bid],
			function(err, rows, fields) {
				if (err) {
					throw err;
					o = send(false, '连接错误，请重试');
				} else if (rows.length == 0) {
					o = send(false, '没有数据哦！')
				} else {
					o = send(true, '成功', {categories: rows});
				}
				res.send(o);
			}
		)

} 

module.exports = getAllCategory;