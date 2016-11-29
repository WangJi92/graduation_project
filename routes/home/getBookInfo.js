var mysql = require('mysql');
var send = require('../lib/util').send;
var $conf = require('../../dbConfig');

function getBookInfo(req, res) {
	var connection = mysql.createConnection($conf),
			o = {};
		connection.connect();
		connection.query(
			'select * from (books left join book_type on books.tid = book_type.tid) join users on books.uid = users.uid where bid=?',
			[req.query.bid],
			function(err, rows, fields) {
				if (err) {
					throw err;
					o = send(false, '连接错误，请重试');
				} else if (rows.length == 0) {
					o = send(false, '没有数据哦！')
				} else {
					o = send(true, '成功', {book: rows[0]});
				}
				res.send(o);
			}
		)

} 

module.exports = getBookInfo;