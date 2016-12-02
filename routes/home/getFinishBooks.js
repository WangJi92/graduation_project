var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function getFinishBooks(req, res) {
	var connection = mysql.createConnection($conf),
			o = {};

		connection.connect();
		connection.query(
			'select bid,bname,uname from (books left join users on books.uid = users.uid) where deposit_status=1 order by modify_time desc limit 0,20',
			[req.query.bid],
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

module.exports = getFinishBooks;