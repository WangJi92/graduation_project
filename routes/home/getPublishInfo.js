var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function getPublishInfo(req, res) {
	var connection = mysql.createConnection($conf),
			o = {};
		connection.connect();
		connection.query(
			'select * from users where uid=?',
			[+req.query.uid],
			function(err, rows, fields) {
				if (err) {
					throw err;
					o = send(false, '连接错误，请重试');
					res.send(o);
				} else if (rows.length == 0) {
					o = send(false, '没有数据哦！');
					res.send(o);
				} else {
					o = send(true, '成功', {user: rows[0]});
					connection.query(
						'select * from (books left join book_type on books.tid = book_type.tid) where uid=? order by deposit_status asc, modify_time desc',
						[+req.query.uid],
						function(err, rows, fields) {
							if (err) {
								throw err;
								o = send(false, '连接错误，请重试');
							} else if (rows.length == 0) {
								o = send(false, '没有数据哦！')
							} else {
								o.publishes = rows;
							}
							res.send(o);
						}
					)
				}
			}
		)
} 

module.exports = getPublishInfo;